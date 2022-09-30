# `RawObjectDataProcessor`

## Quick example

Check does `dataSample1`'s value and `dataSample2`'s value satisfy to type `ValidData`:

```typescript
const dataSample1: unknown = {
  foo: 5,
  bar: "beekeeper",
  baz: true,
  quux: {
    alpha: 5,
    bravo: "PLATINUM"
  }
};

const dataSample2: unknown = {
  foo: -4,
  bar: "abc",
  quux: {
    alpha: 2,
    bravo: "BRONZE"
  }
};

type ValidData = {
  foo: number;
  bar: string;
  baz: boolean;
  quux: {
    alpha: number;
    bravo: "PLATINUM" | "GOLD" | "SILVER";
  };
}
```

Herewith:

* `foo` must be the non-negative integer (0, 1, 2, etc.)
* `bar` must be the string with `5` characters as minimum
* `quux.alpha` must be the integer with minimal value `3`
* `quux.bravo` must be the string with value among `"PLATINUM"`, `"GOLD"`, `"SILVER"`


### Solution with `RawObjectDataProcessor`

Define above requirements with `RawObjectDataProcessor.ObjectDataSpecification`:

```typescript
const validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
  nameForLogging: "Example",
  subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
  properties: {
    foo: {
      type: Number,
      required: true,
      numbersSet: RawObjectDataProcessor.NumbersSets.nonNegativeInteger
    },
    bar: {
      type: String,
      required: true,
      minimalCharactersCount: 5
    },
    baz: {
      type: Boolean,
      required: true
    },
    quux: {
      type: Object,
      required: true,
      properties: {
        alpha: {
          type: Number,
          required: true,
          numbersSet: RawObjectDataProcessor.NumbersSets.anyInteger,
          minimalValue: 3
        },
        bravo: {
          type: String,
          required: true,
          minimalCharactersCount: 5,
          allowedAlternatives: [ "PLATINUM", "GOLD", "SILVER" ]
        }
      }
    }
  }
}
```

Execute the data processing:

```typescript
const dataSample1ProcessingResult: RawObjectDataProcessor.ProcessingResult<ValidData> = RawObjectDataProcessor.
    process(dataSample1, validDataSpecification);
```

Check is processed data valid, and if no log all errors:

```typescript
if (dataSample1ProcessingResult.rawDataIsInvalid) {
  Logger.logError({
    errorType: InvalidExternalDataError.NAME,
    title: InvalidExternalDataError.DEFAULT_TITLE,
    description: "The dataSample1 is invalid:\n" +
        `${RawObjectDataProcessor.formatValidationErrorsList(dataSample1ProcessingResult.validationErrorsMessages)}`,
    occurrenceLocation: "upper scope"
  });
} else {
  Logger.logSuccess({
    title: "Processing done",
    description: "The dataSample1 is valid."
  });
}
```

To access the processed data (`dataSample1ProcessingResult.processedData`) and use it, you need to make sure is
`dataSample1ProcessingResult.rawDataIsInvalid` property falsy first:

```typescript
if (dataSample1ProcessingResult.rawDataIsInvalid) {
  // throw error or create the message and exit from current function/method 
}

// Now you can assess your data
console.log(dataSample1ProcessingResult.processedData)
```

### Output

For the `dataSample1` we'll get:

```
[ Success ] Processing done
The dataSample1 is valid.
```

For the `dataSample2`, we'll get:

```
[ Error ] Invalid external data
The dataSample2 is invalid:

=== Error No. 1 ==========
Expected and actual numbers set mismatch

●　Property / element: 'Example.foo'
This numeric value is in not member of 'non-negative integer' set as required.

●　Property / element specification:
{
  "type": "number",
  "required": true,
  "numbersSet": "NON_NEGATIVE_INTEGER"
}
●　Actual value: -4

=== Error No. 2 ==========
Minimal characters count fall short

●　Property / element: 'Example.bar'
This string value has 3 characters while required minimal characters count is 5.

●　Property / element specification:
{
  "type": "string",
  "required": true,
  "minimalCharactersCount": 5
}
●　Actual value: abc

=== Error No. 3 ==========
Required property is missing

●　Property / element: 'Example.baz'
This property has been marked as 'required' while actual value is 'undefined'.

●　Property / element specification:
{
  "type": "boolean",
  "required": true
}
●　Actual value: undefined

=== Error No. 4 ==========
Minimal value fall short

●　Property / element: 'Example.quux.alpha'
This value is smaller than required minimal value 3.

●　Property / element specification:
{
  "type": "number",
  "required": true,
  "numbersSet": "ANY_INTEGER",
  "minimalValue": 3
}
●　Actual value: 2

=== Error No. 5 ==========
Disallowed value alternative

●　Property / element: 'Example.quux.bravo'
This value is not among allowed alternatives.

●　Property / element specification:
{
  "type": "string",
  "required": true,
  "minimalCharactersCount": 5,
  "allowedAlternatives": [
    "PLATINUM",
    "GOLD",
    "SILVER"
  ]
}
●　Actual value: BRONZE

Error type: InvalidExternalDataError
Occurrence location: upper scope
```

[📄 Full code listing](Examples/RawObjectDataProcessor-Quick.example.ts)


## Problem overview

The processing of **unknown at advance external data** is one of the programming essentials.
The **external data** could be:

* The data from file
* The data from HTTP request
* Raw data from the database
* The query parameters from URI

and so on. 


Initially, this external data has `unknown` or, what's even worse, `any` type.
But in below example we are believing that data retrieved from server is matching with `User` type: 

```typescript

type User = { 
  ID: string; 
  familyName: string; 
  givenName: string; 
};

fetch("http://example.com/users/1").
    then((response: Response): void => response.json()).
    then((data: unknown) => {
      
      const user: User = data as User;
      
      const fullName: string = `${user.givenName} ${user.familyName}`;
      console.log(fullName);
    });
```

From the viewpoint of reality, **it will not be match with expected almost in each project**, especially when 
the client and server application parts are separated. It will be tens, hundreds and ever thousands
fixed errors before retrieving data be fully match with expected. 

For the retrieving of the data from the file case, the invalid data probability is extremely high
when the config file (`.json`, `.yaml`, .etc.) is being filling by user.

So it's required to validate the external data, and only when confirm that it is valid, assign the specific type
like `User` in the example below and use it.


### Native approaches

The **Type guards** is a native TypeScript conception. The **Type guard** is a function returning boolean value, but 
returning value annotation is a little unusual:

```typescript
type User = { 
  ID: string; 
  familyName: string; 
  givenName: string; 
};

function isUser(rawData: unknown): rawData is User {
  return typeof rawData === "object" &&
      rawData !== null &&
      typeof((rawData as { ID: unknown; }).ID ) === "string" &&
      typeof((rawData as { familyName: unknown; }).familyName) === "string" &&
      typeof((rawData as { givenName: unknown; }).givenName) === "string";
} 
```

The native TypeScript approaches including type guards well described in 
[The unknown Type in TypeScript](https://mariusschulz.com/blog/the-unknown-type-in-typescript), the
front end engineer [Marius Schulz](https://mariusschulz.com/about) 's article.
Here is important that:

**Type guards actually does not to guarantee what the value has specified type - this is just an asking to TypeScript 
to believe that it is such as.**

For example, the below type guard is doing the checks completely unrelated with `User` type:

```typescript
type User = { 
  ID: string; 
  familyName: string; 
  givenName: string; 
};

function isUser(rawData: unknown): rawData is User {
  return isArbitraryObject(rawData) &&
      typeof((rawData as { title: unknown }).title) === "string" &&
      typeof((rawData as { price: unknown }).price) === "number";
}

const potentialUser: unknown = { title: "Shampoo", price: 1000 };

if (isUser(potentialUser)) { // it will be truthy for "potentialUser"
  console.log(potentialUser.familyName); // Of course, "undefined"
}
```

Why so poor? The TypeScript is being compiling to JavaScript, but neither `type`s nor `interface`s exists on JavaScript.
The validation is being executed when TypeScript already has been compiled to JavaScript, so no way to refer on `User` 
type's properties names/values/types (to be more precise, TypeScript does not provide the concept such as saving the accessible 
metadata of `type`s and `interface`s on compiled JavaScript). This is a **first problem**.

But there are at least two more problems:

* **Second problem** Ever type guard as `isUser` returned `false`, we will not know which property is invalid. Unlike
  `User` with only three properties (`ID`, `familyName`, `givenName`) the object type from real project could have a couple
  tens of properties and also nested ones.
* **Third problem** Type guard returns `false` on first falsy condition. But there could be a multiple properties
  not satisfying to type guard's condition. To debug it quickly, we need to know all violations, not just first one.


### `RawObjectDataProcessor` solution

Conceptually `RawObjectProcessor` is a huge configurable type guard with logging a lot of additional functionality. 
Therefore, it is the time to clearly state that **`RawObjectProcessor` does not solve the first problem**:

```typescript
type User = { 
  ID: string; 
  familyName: string; 
  givenName: string; 
};

const rawData: unknown = { ID: 1, familyName: "John", title: "Shampoo" };

/* It just casts the raw data to `User` when it obeys the specified validation rules, but this validation rules could
*    have a mistake or simply be unrelated with `User`. */
const processingResult: RawObjectDataProcessor.ProcessingResult<User> = RawObjectDataProcessor.process(rawData, {
  nameForLogging: "User",
  subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
  properties: {
    ID: {
      required: true,
      type: String
    },
    familyName: {
      required: true,
      type: String
    },
    givenName: {
      required: true,
      type: String
    }
  }
});

if (processingResult.rawDataIsInvalid) {
  Logger.logError({
    errorType: InvalidExternalDataError.NAME,
    title: InvalidExternalDataError.DEFAULT_TITLE,
    description: "The raw data is invalid:\n" +
        `${RawObjectDataProcessor.formatValidationErrorsList(processingResult.validationErrorsMessages)}`,
    occurrenceLocation: "upper scope"
  });
}
```

But `RawObjectProcessor` solves the **second problem** and **third problem**. In the case of below example,
the errored log will be:

```
[ Error ] Invalid external data
The raw data is invalid:

=== Error No. 1 ==========
Expected and actual value types mismatch

●　Property / element: 'User.ID'
This value must have type 'string' while actually it's type is: 'number'.

●　Property / element specification:
{
  "required": true,
  "type": "string"
}
●　Actual value: 1

=== Error No. 2 ==========
Required property is missing

●　Property / element: 'User.givenName'
This property has been marked as 'required' while actual value is 'undefined'.

●　Property / element specification:
{
  "required": true,
  "type": "string"
}
●　Actual value: undefined

Error type: InvalidExternalDataError
Occurrence location: upper scope
```

But `RawObjectDataProcessor` is not just a validator; it has some additional functionality, for example:

* Pre-validation and post-validation modifications of the properties
* Renaming of object keys
* Substitution of default values

And much more - here what is below documentation about. 


## Theoretical minimum
### Object-type data classification

As it follows from the utility name, **RawObjectDataProcessor** works with native JavaScript objects
(`typeof rawData === "object"`). But the **object** has a lot of usages, subsequently, subtypes.

**RawObjectDataProcessor** works with below three partial cases of `object`.

#### Fixed key and value pairs object

**Fixed key and value pairs object** means that object has *fixed* scheme.
Type `User` in example below is of such subtype.

```typescript
type User = { 
  ID: string; 
  familyName: string; 
  givenName: string; 
};
```

#### Associative array

Unlike **fixed key and value pairs object**, the keys and values in associative array are *unknown at advance*.

Before **ES2015** (AKA **ES6**), the simple object could be used as associative array. 
In TypeScript, it could be designated as **indexed type**:

```typescript
type Users = { [ID: string]: User | undefined };
```

The `Map` became available from `ES2015`. It could be used as associative array, but here is important that
besides string and numbers other data types also could be used as a key.

Anyway, the associative array usage of plain object is still present and will be present.
One of the reasons is `JSON` data being converting to non-`Map` native object.


#### Indexed array

In the indexed arrays (`Array.isArray(rawData) === true`), elements are being identified by numbers (counting form `0`) 
called **indexes**. But `Array` is also an `object` (same as `Map`, `Set` etc.).


### Properties, names, values

It's important to distinct the **properties** and their **names** (**keys**) and **values**.

* The **property** has **name** (as known as **key**) and **value**.
* The **key and value pair** also called **entry**. 
* The **indexed array** could be represented as the object with numeric keys and values of any type, but from the 
  indexed array keys called **indexes** and values called **elements**.
* The **value** could be a part of object's entry or the element of an array, but it also could exist on its own,
  without object context.


## Disclaimer

Currently `RawObjectDataProcessor.ProcessingResult.processedData` is the object/array *built from zero* based on raw data,
the first argument of `process()` method. In means that if the raw data has some function properties, or getters/setters
or some properties has not been declared in second parameter, these properties will be lost. 

For instance, in below example the method `incrementBar` **will not** present on `processingResult.processedData`: 

```typescript
const rawData: unknown = {
  foo: "ALPHA",
  bar: 1,
  incrementBar(): void {
    this.bar++; 
  }
};

type ValidData = {
  foo: string;
  bar: number;
  incrementBar(): void;
};


const processingResult: RawObjectDataProcessor.ProcessingResult<ValidData> = RawObjectDataProcessor.
    process(rawData, {
    nameForLogging: "Example",
    subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
    properties: {
      foo: {
        type: Number,
        required: true,
        numbersSet: RawObjectDataProcessor.NumbersSets.nonNegativeInteger
      },
      bar: {
        type: String,
        required: true,
        minimalCharactersCount: 5
      },
    } 
  });

if (processingResult.rawDataIsInvalid) {
  // ...
  return;
}


console.log(processingResult.processedData.incrementBar) // -> undefined
```

For the retrieving of the data on frontend side via AJAX or retrieving the data from the file, basically this limitation
does not cause trouble. However, there are some cases when all properties must be kept.

The adding of data processing without creating of new object **is on plans**. However, according to preliminary estimates,
the volume of the code can increase by 2 times, so the priority of this task will depend on demand. 


## Getting started

The minimal code consists from:

1. The type declaration of desired value. Yor are free to use `type` or `interface` depending on your guidelines.
2. The calling of `RawObjectDataProcessor.process()` with assigment of the returnable value to variable of type
   `RawObjectDataProcessor.ProcessingResult`. 
3. The handling of invalid data

The `RawObjectDataProcessor.ProcessingResult` is a generic and it's single parameter is the type of expected data which
must be declared on step 1.

```typescript
/* Step 1 */
type Sample = { foo: string };

/* Step 2 */
const dataProcessingResult: RawObjectDataProcessor.ProcessingResult<Sample> = RawObjectDataProcessor.
    process(
      { foo: "ALPHA" }, 
      {
        nameForLogging: "Example",
        subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
        properties: {
          foo: {
            type: String,
            required: true
          }
        }
      }
    );

/* Step 3 */
if (dataProcessingResult.rawDataIsInvalid) {
  Logger.logError({
    errorType: InvalidExternalDataError.NAME,
    title: InvalidExternalDataError.DEFAULT_TITLE,
    description: "The sample data is invalid:\n" +
        `${RawObjectDataProcessor.formatValidationErrorsList(dataProcessingResult.validationErrorsMessages)}`,
    occurrenceLocation: "upper scope"
  });
  
  return;
}
```

Once step 3 will done, you can access to processed data via `dataProcessingResult.processedData`.

Use <kbd>prod</kbd> **live template** available with 
[IntelliJ IDEA official plugin](https://plugins.jetbrains.com/plugin/17638-yamato-daiwa-es-extensions) to
instantly input the initial code.

Normally, the parameters of `RawObjectDataProcessor.process` are being extracted to dedicated variables:

```typescript
const rawData: unknown = { foo: "ALPHA" };

const validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
  nameForLogging: "Example",
  subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
  properties: {
    foo: {
      type: String,
      required: true
    }
  }
};

const dataProcessingResult: RawObjectDataProcessor.ProcessingResult<Sample> = RawObjectDataProcessor.
    process(rawData, validDataSpecification)
```

In the real project, the `rawData`'s value will be taken from the external data source live HTTP request/response or the file.


## Values validation

This section if focusing on the values by **themselves**, are they the elements of array or the values of the objects.
Although the **fixed key and value pairs type object** case is good for examples, the knowledge of this section could
be used for elements of **indexed arrays** and values of **associative arrays**.  


### Type check

The type check is required for each object property or array element.

Currently, the `RawObjectDataProcessor` can check below values' types:

* **Numbers**: designated as `Number` or `RawObjectDataProcessor.ValuesTypesIDs.number`
* **Strings**: designated as `String` or `RawObjectDataProcessor.ValuesTypesIDs.string`
* **Boolean**: designated as `Boolean` or `RawObjectDataProcessor.ValuesTypesIDs.boolean`
* **Object (nested)**: designated as `Object` or `RawObjectDataProcessor.ValuesTypesIDs.fixedKeyAndValuePairsObject`
* **Indexed array of uniform elements**: designated as `Array` or `RawObjectDataProcessor.ValuesTypesIDs.associativeArrayOfUniformTypeValues`
* **Associative array of uniform elements**: designated as `Map`, but this notation is conditional because the value 
  *actually not* the instance of `Map`, just a plain object, so it is recommended to use 
  `RawObjectDataProcessor.ValuesTypesIDs.associativeArrayOfUniformTypeValues`.

Also, it's possible to allow to have two or more types (`RawObjectDataProcessor.ValuesTypesIDs.oneOf`).

For each property or array element specification, set `type` with one above values:   

```typescript
const validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
  nameForLogging: "Example",
  subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
  properties: {
    foo: {
      type: Number,
      required: true,
      numbersSet: RawObjectDataProcessor.NumbersSets.nonNegativeInteger,
      minimalValue: 8
    },
    bar: {
      type: String,
      required: true,
      minimalCharactersCount: 5
    },
    baz: {
      type: Boolean,
      required: true
    },
    quux: {
      type: Object,
      required: true,
      properties: {
        alpha: {
          type: Number,
          required: true,
          numbersSet: RawObjectDataProcessor.NumbersSets.anyInteger,
          minimalValue: -2
        },
        bravo: {
          type: String,
          required: true,
          minimalCharactersCount: 5,
          allowedAlternatives: [ "PLATINUM", "GOLD", "SILVER" ]
        }
      }
    },
    bat: {
      type: Array,
      required: true,
      element: {
        type: String,
        minimalCharactersCount: 1
      }
    },
    xyzzy: {
      type: RawObjectDataProcessor.ValuesTypesIDs.associativeArrayOfUniformTypeValues,
      required: true,
      value: {
        type: String
      }
    },
    plugh: {
      type: RawObjectDataProcessor.ValuesTypesIDs.oneOf,
      required: true,
      alternatives: [
        {
          type: Number,
          numbersSet: RawObjectDataProcessor.NumbersSets.decimalFractionOfAnySign
        },
        {
          type: String,
          minimalCharactersCount: 1
        }
      ]
    }
  }
}
```

#### Numeric values validation

If the value has been specified as `Number`/`RawObjectDataProcessor.ValuesTypesIDs.number`, below options are available.

##### **numbersSet** - The number set check

Because this option is very important, it is required (must be specified).

```typescript
const validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
  nameForLogging: "Example",
  subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
  properties: {
    foo: {
      type: Number,
      required: true,
      numbersSet: RawObjectDataProcessor.NumbersSets.nonNegativeInteger
    }
  }
};
```

Available number sets are:

<dl>
  
  <dt>RawObjectDataProcessor.NumbersSets.naturalNumber</dt>
  <dd>1, 2, 3 and so on towards infinity.</dd>

  <dt>RawObjectDataProcessor.NumbersSets.nonNegativeInteger</dt>
  <dd>All naturals numbers and also 0 which is the positive number according to Math.</dd>

  <dt>RawObjectDataProcessor.NumbersSets.negativeInteger</dt>
  <dd>-1, -2, -3 and so on towards minus infinity.</dd>

  <dt>RawObjectDataProcessor.NumbersSets.negativeIntegerOrZero</dt>
  <dd>Negative integers and also 0</dd>

  <dt>RawObjectDataProcessor.NumbersSets.anyInteger</dt>
  <dd>All natural numbers, negative integers and also 0</dd>

  <dt>RawObjectDataProcessor.NumbersSets.positiveDecimalFraction</dt>
  <dd>The fraction of "[integerPart].[decimalPart]" type, e. g. "3.62", herewith greater than 0.</dd>

  <dt>RawObjectDataProcessor.NumbersSets.negativeDecimalFraction</dt>
  <dd>The fraction of `-[integerPart.[decimalPart]`, e. g. `-4.62`, herewith less than 0.</dd>

  <dt>RawObjectDataProcessor.NumbersSets.decimalFractionOfAnySign</dt>
  <dd>Any of positive or negative decimal fraction</dd>

  <dt>RawObjectDataProcessor.NumbersSets.anyRealNumber</dt>
  <dd>The integer or decimal fraction of any sign</dd>
</dl>


##### **minimalValue**/**maximalValue** - The minimal and maximal value check

```typescript
const validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
  nameForLogging: "Example",
  subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
  properties: {
    foo: {
      type: Number,
      required: true,
      numbersSet: RawObjectDataProcessor.NumbersSets.nonNegativeInteger,
      minimalValue: 3,
      maximalValue: 10
    }
  }
};
```

##### **allowedAlternatives** - Allowed values check

If you want to allow just specific discrete numeric values (e. g. `3`, `5` and `7`), specify it via `allowedAlternatives`:

```typescript
const validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
  nameForLogging: "Example",
  subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
  properties: {
    foo: {
      type: Number,
      required: true,
      numbersSet: RawObjectDataProcessor.NumbersSets.nonNegativeInteger,
      allowedAlternatives: [ 3, 5, 7 ]
    }
  }
};
```


#### String values validation

If the value has been specified as `String`/`RawObjectDataProcessor.ValuesTypesIDs.string`, below options are available.

##### **allowedAlternatives** - Allowed values check

If the value must be the member of specific enumeration, this option is what you need.

```typescript
const validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
  nameForLogging: "Example",
  subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
  properties: {
    foo: {
      type: String,
      required: true,
      allowedAlternatives: [ "BRONZE", "SILVER", "GOLD" ]
    }
  }
};
```

##### **minimalCharactersCount**/**maximalCharactersCount** - The minimal and maximal count of characters check

```typescript
const validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
  nameForLogging: "Example",
  subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
  properties: {
    foo: {
      type: String,
      required: true,
      minimalCharactersCount: 1,
      maximalCharactersCount: 127
    }
  }
};
```


#### **fixedCharactersCount** - exact characters count check

```typescript
const validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
  nameForLogging: "Example",
  subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
  properties: {
    ID: {
      type: String,
      required: true,
      fixedCharactersCount: 32
    }
  }
};
```

### **validValueRegularExpression** - check via regular expression

```typescript
const validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
  nameForLogging: "Example",
  subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
  properties: {
    ID: {
      type: String,
      required: true,
      validValueRegularExpression: /^prefix-.+$/u
    }
  }
};
```

#### Boolean values validation

If the value has been specified as `Boolean`/`RawObjectDataProcessor.ValuesTypesIDs.boolean`, below options are available.

##### **trueOnly**/**falseOnly** - allow only true of only false

Intended to be used in the cases like:

* The value must be either `true` or `undefined` (is this case, `required: false` option also must be specified)
* The value must be either `false` or `null` (in this case `required: true;`, `nullable: true` option also must be specified)
* The value must be either string or `false` (in this case, `RawObjectDataProcessor.ValuesTypesIDs.oneOf` is required instead of
  `Boolean`/`RawObjectDataProcessor.ValuesTypesIDs.boolean`). 


#### Nested objects validation

If the value has been specified as `Object`/`RawObjectDataProcessor.ValuesTypesIDs.fixedKeyAndValuePairsObject`, it's 
required to enumerate the specification of this nested object's properties:

```typescript
type ValidData = {
  alpha1: {
    alpha2: number;
    bravo2: string;
  };
};

const dataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
  nameForLogging: "ValidData",
  subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
  properties: {
    alpha1: {
      required: true,
      type: Object,
      // ↓ Valid nested object properties specification
      properties: {
        alpha2: {
          required: true,
          type: Number,
          numbersSet: RawObjectDataProcessor.NumbersSets.anyRealNumber
        },
        bravo2: {
          required: true,
          type: String
        }
      }
    }
  }
};
```


#### Children indexed arrays validation

If the value has been specified as `Array`/`RawObjectDataProcessor.ValuesTypesIDs.indexedArrayOfUniformElements`, 
it's required specify the `element` property:

```typescript
type ValidData = {
  foo: Array<{ bar: string; baz: boolean; }>;
};

const validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
  nameForLogging: "Example",
  subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
  properties: {
    foo: {
      type: Array,
      required: true,
      // ↓ Valid array element specification
      element: {
        type: Object,
        properties: {
          bar: {
            type: String,
            required: true,
            minimalCharactersCount: 5
          },
          baz: {
            type: Boolean,
            required: true
          }
        }
      }
    }
  }
};
```

Also, below options are available.

<dl>

  <dt>minimalElementsCount</dt>
  <dd>The integer representing required minimal elements count.</dd>

  <dt>maximalElementsCount</dt>
  <dd>The integer representing allowed maximal elements count.</dd>

  <dt>exactElementsCount</dt>
  <dd>The integer representing required exact elements count. Incompatible with two previous options.</dd>

  <dt>allowUndefinedTypeElements</dt>
  <dd>
    Set this option to <code>true</code> to allow the empty array elements. Please note that this option still does not
    allow the <code>null</code> elements.
  </dd>

  <dt>allowNullElements</dt>
  <dd>Set this option to <code>true</code> to allow the <code>null</code> elements.</dd>

</dl>


##### Children associative arrays validation

If the value has been specified as `Map`/`RawObjectDataProcessor.ValuesTypesIDs.associativeArrayOfUniformTypeValues`,
it's required specify the `value` property:

```typescript
type ValidData = {
  foo: { [key: string]: string; };
};

const validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
  nameForLogging: "Example",
  subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
  properties: {
    foo: {
      type: RawObjectDataProcessor.ValuesTypesIDs.associativeArrayOfUniformTypeValues,
      required: true,
      value: {
        type: String,
        minimalCharactersCount: 1
      }
    }
  }
};
```

Also, below options are available.

<dl>

  <dt>minimalEntriesCount</dt>
  <dd>The integer representing required minimal entries (key and value pairs) count.</dd>

  <dt>maximalEntriesCount</dt>
  <dd>The integer representing allowed maximal entries (key and value pairs) count.</dd>

  <dt>exactEntriesCount</dt>
  <dd>The integer representing required exact entries (key and value pairs) count. Incompatible with two previous options.</dd>

  <dt>requiredKeys</dt>
  <dd>The array of string specifying the keys which respcetive values must present. </dd>

  <dt>allowedKeys</dt>
  <dd>The array of string specifying which keys are allowed. </dd>

  <dt>keyRenamings</dt>
  <dd>
    The object of <code>{ [rawKey: string]: string; }</code> shape (actually the associative array, too) defining the new
    names of specific keys.
  </dd>

  <dt>allowUndefinedTypeValues</dt>
  <dd>
    Set this option to <code>true</code> to allow the explicit undefined values. Please note that this option still does not
    allow the <code>null</code> value.
  </dd>

  <dt>allowNullValues</dt>
  <dd>Set this option to <code>true</code> to allow the <code>null</code> elements.</dd>
  

</dl>


## Validation of fixed key and value pairs type objects
### Properties requirement

Each property must be...

* either explicitly marked as required by `required: true`,
* either marked as conditionally required by `requiredIf` (see [conditional requirement](#conditional-requirement) subsection),
* either have default value by `defaultValue`
* or explicitly marked as optional by `required: false`.

Please note that **requirement conception in RawObjectDataProcessor is not related with `null` values**.

```typescript
type ValidData = {
  foo: string;
  hoge: string;
} & (
  {
    bar: string;
    baz: string;  
  } | {
    bar?: undefined;
    baz?: string;
  } 
);

const validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
  nameForLogging: "Example",
  subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
  properties: {
    
    // Required
    foo: {
      type: String,
      required: true
    },

    // Optional
    bar: {
      type: String,
      required: false
    },

    // Conditionally required
    baz: {
      type: String,
      requiredIf: {
        predicate: (rawData__currentObjectDepth: ArbitraryObject): boolean => isString(rawData__currentObjectDepth.bar),
        descriptionForLogging: "'bar' is presents"
      }
    },
    
    // Has default value
    hoge: {
      type: String,
      defaultValue: "ALPHA" 
    }
  }
}
```


#### Conditional requirement

Conditional requirement means that some property must present or could not be present conditionally.
For example, in below type `swimmingPoolDepth__meters` must present if `hasSwimmingPool` is `true`:

```typescript
type Villa = {
  floorsCount: number;
  totalSquare__squareMeters: number;
  hasSwimmingPool: boolean;
  swimmingPoolDepth__meters?: number; 
} 
```

From the viewpoint of TypeScript, `swimmingPoolDepth__meters` is not conditionally required.
The conditional requirement declaration in TypeScript is limited. For this case, we can declare

```typescript
type Villa = {
  floorsCount: number;
  totalSquare__squareMeters: number;
} & (
  {
    hasSwimmingPool: true;
    swimmingPoolDepth__meters: number;
  } | {
    hasSwimmingPool?: false;
  }    
);
```

Please note that `|` is **not the exclusive OR** and **there is no exclusive OR** operation for type aliases.
Sometimes it matters.

To define the conditional requirement in `PropertiesSpecification`, you need to specify `requredIf` with two required
options: `predicate` and `descriptionForLogging`:

```typescript
type PropertyRequirementCondition = {
  readonly predicate: (rawData__currentObjectDepth: ArbitraryObject, rawData__full: ArbitraryObject) => boolean;
  readonly descriptionForLogging: string;
};
```

* If the `predicate` will return true, the property will be considered as required.
* If you have nested objects and the condition should refer the parent objects, you will need the second parameter of
  predicate, `rawData__full` because firstOne - `rawData__currentObjectDepth` - returns just object of current depth level.
* In `descriptionForLogging`, define verbally when predicate returns `true` for clear logging. For the above example with
  `Villa`, the `descriptionForLogging` could be like "'hasSwimmingPool' is true".

```typescript
type Villa = {
  floorsCount: number;
  totalSquare__squareMeters: number;
} & (
  {
    hasSwimmingPool: true;
    swimmingPoolDepth__meters: number;
  } | {
    hasSwimmingPool?: false;
  }
);

const validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
  nameForLogging: "Villa",
  subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
  properties: {
    hasSwimmingPool: {
      type: Boolean,
      required: false
    },
    baz: {
      type: String,
      requiredIf: {
        predicate: (rawData__currentObjectDepth: ArbitraryObject): boolean => 
            rawData__currentObjectDepth.hasSwimmingPool === true,
        descriptionForLogging: "'hasSwimmingPool' is true"
      }
    },
    // ...
  }
};
```

#### Nullability

* If some property could be the `null`, specify `nullable: true`
* If you want to replace `null` with some other value, specify: `nullSubstitution` with the same type as `type`.
* If you want to replace `null` with `undefined`, specify `preValidationModifications: [ nullToUndefined ]`. In this case,
  the property will be validated according the [property requirement conception](#properties-requirement).

Please note than `required: false` does not allow the `null` values - `nullable: true` has been designed for this.

```typescript
type Sample = {
  foo: string | null;
  bar?: string | null;
  baz?: string;
};


const validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
  nameForLogging: "Sample",
  subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
  properties: {
    // ↓ 'null' is allowed while 'undefined' is not.
    foo: {
      type: String,
      required: true,
      nullable: true
    },
    // ↓ both 'null' and 'undefined' allowed
    bar: {
      type: String,
      required: false,
      nullable: true
    },
    // ↓ 'null' will be transformed to 'undefined' before validation
    baz: {
      preValidationModifications: nullToUndefined,
      type: String,
      required: false
    }
  }
};
```


## Processing of fixed key and value pairs type objects
### Properties renaming

Specify `newName` to rename the property's key during processing.

```typescript
type Sample = {
  alpha: string;
};


const validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
  nameForLogging: "Sample",
  subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
  properties: {
    foo: {
      newName: "alpha",
      type: String,
      required: true,
    }
  }
}
```

## API

## Methods

All public methods are static.

### process

Main method of the class representing most functionality.
Processing the raw data (first argument) according it's specification (second parameter) and options (third parameter, optional).

```
process<ProcessedData extends ArbitraryObject, InterimValidData extends ArbitraryObject = ProcessedData>(
  rawData: unknown,
  validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification,
  options: RawObjectDataProcessor.Options = {}
): RawObjectDataProcessor.ProcessingResult<ProcessedData>
```

* Generic parameters
  * **ProcessedData** - refers to desired type. Since **RawObjectDataProcessor** is for objects only, the **ProcessedData**
    must be the subtype of **ArbitraryObject** (non-null object with any valid string keys and values of any type).
  * **InterimValidData** - optional parameter actual only whe **postProcessing** property of third parameter of object-type
    has been specified with the function.
* Parameters
  * **rawData** Unknown as advance data which usually being retrieved from external source like HTTP or file.
  * **validDataSpecification** The object of type [**RawObjectDataProcessor.ObjectDataSpecification**](#rawobjectdataprocessorobjectdataspecification) 
     describing what raw data should it be, and, optionally, some extra processings of one or more properties of raw data.
     Must corresponding to specified **ProcessedData**, but TypeScript can not inspect is this really the case.
  * **options** 
    * **postProcessing** the function accepting the **InterimValidData** and returning **ProcessedData**, both of which
      are generic parameters of the **process** method.
    * **localization** the object of **RawObjectDataProcessor.Localization** type containing the function generating
      the validation error messages.
* **Returned value** is the object containing the processing result. The property **processedData** is available is
  and only if property **rawDataIsInvalid** is truthy, same as **validationErrorsMessages** is available if and only if
  property **rawDataIsInvalid** is falsy. So, you need to check **rawDataIsInvalid** before access to **processedData**
  or **rawDataIsInvalid**.

The section [getting-started](#getting-started) contains the example with most of above properties.

    
### formatValidationErrorsList

```
formatValidationErrorsList(
  messages: Array<string>, localization: RawObjectDataProcessor.Localization = RawObjectDataProcessor.defaultLocalization
): string
```

Formatting the validation errors messages which **RawObjectDataProcessor.ProcessingResult** contains when raw data is invalid.

```typescript
if (processingResult.rawDataIsInvalid) {
  Logger.logError({
    errorType: InvalidExternalDataError.NAME,
    title: InvalidExternalDataError.DEFAULT_TITLE,
    description: "The raw data is invalid:\n" +
        `${RawObjectDataProcessor.formatValidationErrorsList(processingResult.validationErrorsMessages)}`,
    occurrenceLocation: "upper scope"
  });
}
```

### setDefaultLocalization

```
setDefaultLocalization(newLocalization: RawObjectDataProcessor.Localization): void
```

Changing the default language of errors messages.
The **RawObjectDataProcessor.Localization** is pretty big object containing the text data and template functions for 
each error message. 

Officially, Japanese and Russian localization are available.
You can create your ows localization object of **RawObjectDataProcessor.Localization** type.
Check the [listing of English localization](../../Source/RawObjectDataProcessor/RawObjectDataProcessorLocalization__English.ts)
as reference.

### getNormalizedValueTypeID

```
getNormalizedValueTypeID(
  valueType: NumberConstructor |
      StringConstructor |
      BooleanConstructor |
      ObjectConstructor |
      ArrayConstructor |
      MapConstructor |
      RawObjectDataProcessor.ValuesTypesIDs
): RawObjectDataProcessor.ValuesTypesIDs
```

The method exclusively for localization.
Transforms **String** (the **StringConstructor**) to **RawObjectDataProcessor.ValuesTypesIDs.string**,
**Number** (the **NumberConstructor**) to **RawObjectDataProcessor.ValuesTypesIDs.number** etc. and always returns the element
of **RawObjectDataProcessor.ValuesTypesIDs** enumerations.

Basically, the switch/case could detect **StringConstructor**, **NumberConstructor** etc., but under a certain combination 
of conditions it does not work:

* https://stackoverflow.com/q/69848208/4818123
* https://stackoverflow.com/q/69848689/4818123

So the transformations like **StringConstructor** to **RawObjectDataProcessor.ValuesTypesIDs.string** aare more complicated
than just switch/case, that is what **getNormalizedValueTypeID** method is doing.


## Types
### RawObjectDataProcessor.ObjectDataSpecification

The second parameter of `RawObjectDataProcessor.process` method.

#### Properties
##### nameForLogging

Will be used in error message which will be generated if raw data is invalid.

It should make sense which exactly data does not match with expected. For example:

* If it is some data retrieved via HTTP, the name like **UsersListRetrieving.ResponseData** makes sense.
  Although in this example Pascal case has been used, this name could be the normal text.
* If it is the data from some configuration file, the name like **NNNConfigFile** (where NNN is the application name) 
  makes sense. 

```typescript
const validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
  nameForLogging: "UsersListRetrieving.ResponseData",
  subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
  properties: {
    /* Properties' specification goes here ... */
  }
}
```

##### Subtype and dependent properties

Defines which subtype of object must be the raw data.
Object-type data classification has been considered in [corresponding section](#object-type-data-classification)
of [theoretical minimum](#theoretical-minimum) chapter.

* If you have specified `subtype: ObjectSubtypes.fixedKeyAndValuePairsObject`, you must define `properties` property   
  with specification of each property of target object (see [PropertiesSpecification and related - Object properties specification](#propertiesspecification-and-related---object-properties-specification)). 
* If you have specified `subtype: ObjectSubtypes.indexedArray`, you must define `element` property with specification 
  of target indexed array's element.
* If you have specified `subtype: ObjectSubtypes.associativeArray`, you must define `value` property with specification
  of target associative array's value.

```typescript
const validDataSpecification: RawObjectDataProcessor.ObjectDataSpecification = {
  
  nameForLogging: "UsersListRetrieving.ResponseData",
  
  subtype: RawObjectDataProcessor.ObjectSubtypes.fixedKeyAndValuePairsObject,
  properties: {
    /* Properties' specification goes here ... */
  },
  
  // OR
  subtype: RawObjectDataProcessor.ObjectSubtypes.indexedArray,
  element: {
    /* Element's specification goes here ... */
  },

  // OR
  subtype: RawObjectDataProcessor.ObjectSubtypes.associativeArray,
  value: {
    /* Values's specification goes here ... */
  },
}
```

### PropertiesSpecification and related - Object properties specification

The **PropertiesSpecification** is the associative where key is a name of expected property:

```typescript
export type PropertiesSpecification = { readonly [propertyName: string]: CertainPropertySpecification; };
```

The **CertainPropertySpecification** is one of:

* **NumberPropertySpecification**
* **StringPropertySpecification**
* **BooleanPropertySpecification**
* **NestedObjectPropertySpecification**
* **NestedUniformElementsIndexedArrayPropertySpecification**
* **NestedUniformElementsAssociativeArrayPropertySpecification**
* **MultipleTypesAllowedPropertySpecification**

As has been explained in [Theoretical-minimum](#theoretical-minimum) chapter, the value could exist inside object as property,
but also could be independent (until global scope). Thus, each of above extends the specification of respective value:

* **NumberValueSpecification** - subset of **NumberPropertySpecification**
* **StringValueSpecification** - subset of **StringPropertySpecification**
* **BooleanValueSpecification** - subset of **BooleanPropertySpecification**
* **FixedKeyAndValuePairsObjectValueSpecification** - subset of **NestedObjectPropertySpecification**
* **UniformElementsIndexedArrayValueSpecification** - subset of **NestedUniformElementsIndexedArrayPropertySpecification**
* **UniformElementsAssociativeArrayValueSpecification** - subset of **NestedUniformElementsAssociativeArrayPropertySpecification**
* **MultipleTypesAllowedValueSpecification** - subset of **MultipleTypesAllowedPropertySpecification**


### ProcessingResult - raw data processing result
#### Generic parameter

Even with first generic parameter of **process** method - the shape of valid and processed data.

#### Properties

* **rawDataIsInvalid** - boolean property reflects the result of validation of the raw data.
* **processedData** - the validated and processed data. Presents (non-undefined) if and only if **rawDataIsInvalid** is **true**.
* **validationErrorsMessages** - the array of validation errors messages. Presents (non-undefined) if and only if
  **rawDataIsInvalid** is **false**.
