import getRandomBoolean from "../RandomValuesGenerators/getRandomBoolean";


class DataMocking {

  public static decideOptionalValue<ValueType>(
    sourceDataAndOptions: Readonly<{
      strategy: DataMocking.OptionalPropertiesDecisionStrategies;
      randomValueGenerator: () => ValueType;
      preDefinedValue?: ValueType;
    }>
  ): ValueType | undefined {

    switch (sourceDataAndOptions.strategy) {

      case DataMocking.OptionalPropertiesDecisionStrategies.mustGenerateAll:

        return sourceDataAndOptions.preDefinedValue ?? sourceDataAndOptions.randomValueGenerator();


      case DataMocking.OptionalPropertiesDecisionStrategies.mustSkipIfHasNotBeenPreDefined:

        return sourceDataAndOptions.preDefinedValue;


      case DataMocking.OptionalPropertiesDecisionStrategies.mustGenerateWith50PercentageProbability:

        /* eslint-disable-next-line no-void --
         * TypeScript requires to be returned something (TS7030: Not all code paths return a value),
         * herewith the `undefined` has been forbidden by "no-undefined" ESLint rule.
         * */
        return getRandomBoolean() ? sourceDataAndOptions.randomValueGenerator() : void 0;

    }

  }

}


namespace DataMocking {

  export enum OptionalPropertiesDecisionStrategies {
    mustGenerateAll = "MUST_GENERATE_ALL",
    mustGenerateWith50PercentageProbability = "MUST_GENERATE_WITH_50_PERCENTAGE_PROBABILITY",
    mustSkipIfHasNotBeenPreDefined = "MUST_SKIP_IF_HAS_NOT_BEEN_PRE_DEFINED"
  }

}


export default DataMocking;
