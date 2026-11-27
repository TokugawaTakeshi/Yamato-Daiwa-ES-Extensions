import { URI_QueryParametersConverter, Logger, type ReadonlyParsedJSON, splitString} from "../../../../Source";
import Testing from "node:test";
import Assert from "node:assert";


Testing.

    suite(
      `${ URI_QueryParametersConverter.name } - General Strings`,
      (): void => {

        function getConstantQueryParametersObject(): ReadonlyParsedJSON {
          return {
            foo: "ALPHA",
            bar: "BRAVO",
            baz: "CHARLIE"
          };
        }

        const queryString__withoutLeadingQuestionMark: string =
            URI_QueryParametersConverter.serialize(getConstantQueryParametersObject());

        const serializedQueryParametersPairs: ReadonlyArray<string> =
            splitString(queryString__withoutLeadingQuestionMark, "&");

        const deserializedQueryParameters: ReadonlyParsedJSON =
            URI_QueryParametersConverter.deserialize(queryString__withoutLeadingQuestionMark);

        Assert.strictEqual(serializedQueryParametersPairs.length, 3);
        Assert.strictEqual(serializedQueryParametersPairs.includes("foo=ALPHA"), true);
        Assert.strictEqual(serializedQueryParametersPairs.includes("bar=BRAVO"), true);
        Assert.strictEqual(serializedQueryParametersPairs.includes("baz=CHARLIE"), true);

        Assert.deepStrictEqual(deserializedQueryParameters, getConstantQueryParametersObject());

      }
    ).

    catch(Logger.logPromiseError);
