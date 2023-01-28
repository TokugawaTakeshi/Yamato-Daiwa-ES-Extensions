# `ParsedJSON`, `ParsedJSON_Object`, `ParsedJSON_Array`, `ParsedJSON_NestedProperty`

<div style="border: 1px solid red; padding: 12px 14px">
  ⚠ Make sure that you are understanding the difference between <code>JSON</code> which is the <code>string</code> and native 
  JavaScript object which <code>ParsedJSON</code> is.
</div>

`ParsedJSON` could be the `ParsedJSON_Object` or `ParsedJSON_Array`:

```typescript
export type ParsedJSON = ParsedJSON_Object | ParsedJSON_Array;

export type ParsedJSON_Object = {
  [key: string]: ParsedJSON_NestedProperty;
};

export type ParsedJSON_Array = Array<ParsedJSON_NestedProperty>;
``` 

In indexed type like `{ [key: string]: string; }` does not respect the `undefined` value; it means "any property
which will be called is definitely exists", that is impossible. Thus, the `ParsedJSON_NestedProperty` as very wide
(but narrower than `any`) type must respect the cases when called property does not exist.
`null` is also the possible scenario.

```typescript
export type ParsedJSON_NestedProperty =
    | number
    | string
    | boolean
    | null
    | ParsedJSON_Object
    | ParsedJSON_Array
    | undefined;
```
