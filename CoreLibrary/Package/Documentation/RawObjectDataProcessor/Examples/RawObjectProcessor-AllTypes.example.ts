import { RawObjectDataProcessor } from "../../../Source";


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
};

console.log(validDataSpecification);
