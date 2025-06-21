import type { ArbitraryObject } from "./Types/ArbitraryObject";


export default abstract class ValuesDeepCopier {

  public static deeplyCloneArbitraryValueAsPossible<TargetValue = unknown>(arbitraryValue: TargetValue): TargetValue {

    /* [ Performance Optimization ]
     * The BigInt is nore rare that JSON-compatible types thus the check for BigInt should going last.  */
    if (
      typeof arbitraryValue === "number" ||
      typeof arbitraryValue === "string" ||
      typeof arbitraryValue === "boolean" ||
      typeof arbitraryValue === "undefined" ||
      arbitraryValue === null ||
      typeof arbitraryValue === "bigint"
    ) {
      return arbitraryValue;
    }


    if (typeof arbitraryValue === "object") {
      /* eslint-disable @typescript-eslint/consistent-type-assertions --
      * It is unknown at advance which exactly type will be passed thus the copy is based on real, not expected value. */
      return ValuesDeepCopier.deeplyCloneObjectLikeValueAsPossible(arbitraryValue as object) as TargetValue;
    }


    return arbitraryValue;

  }

  public static deeplyCloneObjectLikeValueAsPossible<ObjectLikeType extends object>(
    objectLikeValue: ObjectLikeType
  ): ObjectLikeType {

    if (Array.isArray(objectLikeValue)) {
      return objectLikeValue.map(
        (element: unknown): unknown => ValuesDeepCopier.deeplyCloneArbitraryValueAsPossible(element)
      ) as ObjectLikeType;
    }


    if (objectLikeValue instanceof Set) {
      return new Set(
        Array.from(objectLikeValue.values()).map(
          (element: unknown): unknown => ValuesDeepCopier.deeplyCloneArbitraryValueAsPossible(element)
        )
      ) as ObjectLikeType;
    }


    if (objectLikeValue instanceof Map) {
      return new Map(
        Array.from(objectLikeValue.entries()).map(
          ([ key, value ]: [ unknown, unknown ]): [ unknown, unknown ] =>
              [
                ValuesDeepCopier.deeplyCloneArbitraryValueAsPossible(key),
                ValuesDeepCopier.deeplyCloneArbitraryValueAsPossible(value)
              ]
        )
      ) as ObjectLikeType;
    }


    if (objectLikeValue instanceof Date) {
      return new Date(objectLikeValue) as ObjectLikeType;
    }


    return ValuesDeepCopier.deeplyClonePlainObjectAsPossible(objectLikeValue as ArbitraryObject) as ObjectLikeType;
    /* eslint-enable @typescript-eslint/consistent-type-assertions */

  }

  private static deeplyClonePlainObjectAsPossible(targetPlainObject: ArbitraryObject): object {

    const copy: ArbitraryObject = {};

    Object.
        getOwnPropertyNames(targetPlainObject).
        forEach(
          (key: string): void => {

            const propertyDescriptor: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(targetPlainObject, key);

            Object.defineProperty(
              copy,
              key,
              {
                value: ValuesDeepCopier.deeplyCloneArbitraryValueAsPossible(targetPlainObject[key]),
                writable: propertyDescriptor?.writable ?? true,
                configurable: propertyDescriptor?.configurable ?? true,
                enumerable: propertyDescriptor?.enumerable ?? true
              }
            );

          }
        );

    return copy;

  }

}
