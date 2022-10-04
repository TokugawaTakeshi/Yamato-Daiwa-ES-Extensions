import { explodeCasedPhraseToWords } from "../../../Source";
import { deepStrictEqual } from "assert";


describe("explodeCasedPhraseToWords", (): void => {

  it("Normal text has been processed correctly", (): void => {
    deepStrictEqual(
      explodeCasedPhraseToWords("Waltz bad nymph for quick jigs vex"),
      [ "Waltz", "bad", "nymph", "for", "quick", "jigs", "vex" ]
    );
  });

  it("Upper camel case has been processed correctly", (): void => {
    deepStrictEqual(explodeCasedPhraseToWords("ExperimentalSample"), [ "Experimental", "Sample" ]);
    deepStrictEqual(explodeCasedPhraseToWords("HTMLContent"), [ "HTML", "Content" ]);
    deepStrictEqual(explodeCasedPhraseToWords("IAmATeapot"), [ "I", "Am", "A", "Teapot" ]);
  });

  it("Lower camel case has been processed correctly", (): void => {
    deepStrictEqual(explodeCasedPhraseToWords("experimentalSample"), [ "experimental", "Sample" ]);
    deepStrictEqual(explodeCasedPhraseToWords("iAmATeapot"), [ "i", "Am", "A", "Teapot" ]);
  });

  it("Kebab case has been processed correctly", (): void => {
    deepStrictEqual(explodeCasedPhraseToWords("I-am-The-tasty-Kebab"), [ "I", "am", "The", "tasty", "Kebab" ]);
  });

  it("Screaming snake case has been processed correctly", (): void => {
    deepStrictEqual(explodeCasedPhraseToWords("I_AM_A_SNAKE"), [ "I", "AM", "A", "SNAKE" ]);
  });

});
