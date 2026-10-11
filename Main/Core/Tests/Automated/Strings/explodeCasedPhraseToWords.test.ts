import { explodeCasedPhraseToWords, Logger } from "../../../Source";
import Testing from "node:test";
import Assert from "assert";

Promise.all([

  Testing.test(
    "Normal text has been processed correctly",
    (): void => {
      Assert.deepStrictEqual(
        explodeCasedPhraseToWords("Waltz bad nymph for quick jigs vex"),
        [ "Waltz", "bad", "nymph", "for", "quick", "jigs", "vex" ]
      );
    }
  ),

  Testing.test(
    "Upper camel case has been processed correctly",
    (): void => {
      Assert.deepStrictEqual(explodeCasedPhraseToWords("ExperimentalSample"), [ "Experimental", "Sample" ]);
      Assert.deepStrictEqual(explodeCasedPhraseToWords("HTMLContent"), [ "HTML", "Content" ]);
      Assert.deepStrictEqual(explodeCasedPhraseToWords("IAmATeapot"), [ "I", "Am", "A", "Teapot" ]);
    }
  ),

  Testing.test(
    "Lower camel case has been processed correctly",
    (): void => {
      Assert.deepStrictEqual(explodeCasedPhraseToWords("experimentalSample"), [ "experimental", "Sample" ]);
      Assert.deepStrictEqual(explodeCasedPhraseToWords("iAmATeapot"), [ "i", "Am", "A", "Teapot" ]);
    }
  ),

  Testing.test(
    "Kebab case has been processed correctly",
    (): void => {
      Assert.deepStrictEqual(explodeCasedPhraseToWords("I-am-The-tasty-Kebab"), [ "I", "am", "The", "tasty", "Kebab" ]);
    }
  ),

  Testing.test(
    "Screaming snake case has been processed correctly",
    (): void => {
      Assert.deepStrictEqual(explodeCasedPhraseToWords("I_AM_A_SNAKE"), [ "I", "AM", "A", "SNAKE" ]);
    }
  )

]).catch(Logger.logPromiseError);
