# `DataMocking` Class/Namespace
## Public Static Methods
### `decideOptionalValue`

```
<ValueType>(
  sourceDataAndOptions: 
      {
        strategy: DataMocking.OptionalPropertiesDecisionStrategies;
        randomValueGenerator: () => ValueType;
        preDefinedValue?: ValueType;
      }
) => ValueType | undefined
```

Intended to be used for the generating of object with optional properties.

When mocking an object with optional properties, each optional property may ge generated or no.
To make the tests closer to exhaustive, it is required to have the objects with all properties being set
  with non-empty values, and also the objects with omitted optional properties.
The decision may be made according the one of the following main strategies:

+ Generate the value for the optional property
+ Do not generate the value for the optional property
+ Generate the value for the optional property or not generate it randomly with specific probability

Additionally, the value for the optional property can be specified explicitly instead of generating of a random value.
It is useful when you want to test, for example, the searching of some item by its title or description.

`decideOptionalValue` method allows to generate or not generate the value for random optional property
  depending on the selected strategy.
This method has the single parameter of the object type with the following properties:

<dl>

  <dt><code>strategy</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd><code>DataMocking.OptionalPropertiesDecisionStrategies</code></dd>
      <dt>Is required</dt>
      <dd>Yes</dd>
      <dt>Description<dt>
      <dd>
        Specifying the strategy basing on which the random value for target optional property must be generated or 
          not generated.
        <dl>
          <dt><code>OptionalPropertiesDecisionStrategies.mustGenerateAll</code></dt>
          <dd>If <code>preDefinedValue</code> not specified, the random value will be generated.</dd>
          <dt><code>OptionalPropertiesDecisionStrategies.mustGenerateWith50PercentageProbability</code></dt>
          <dd>The random value will be generated with 50% probability herewith <code>preDefinedValue</code> will not be used even if defined.</dd>
          <dt><code>OptionalPropertiesDecisionStrategies.mustSkipIfHasNotBeenPreDefined</code></dt>
          <dd>If <code>preDefinedValue</code> not specified, the random value will not be generated.</dd>
        </dl>
      </dd>
    </dl>
  </dd>

  <dt><code>randomValueGenerator</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>Function</dd>
      <dt>Signature</dt>
      <dd><code>() => ValueType;</code></dd>
      <dt>Return Type</dt>
      <dd>(As specified via generic parameter)</dd>
      <dt>Is required</dt>
      <dd>Yes</dd>
      <dt>Description<dt>
      <dd>Must generate the random value, but will be invoked only when this value actually must be generated.</dd>
    </dl>
  </dd>

  <dt><code>preDefinedValue</code></dt>
  <dd>
    <dl>
      <dt>Type</dt>
      <dd>(As specified via generic parameter)</dd>
      <dt>Is required</dt>
      <dd>No</dd>
      <dt>Description<dt>
      <dd>
        Will be used instead of generating of a random value in <b>mustGenerateAll</b> and 
          <b>mustSkipIfHasNotBeenPreDefined</b> scenarios.
      </dd>
    </dl>
  </dd>

</dl>


## Example
