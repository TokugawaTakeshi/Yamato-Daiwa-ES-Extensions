```typescript
import {
  RawObjectDataProcessor,
  Logger,
  explodeCasedPhraseToWords,
  toUpperCamelCase
} from "../../../Source";
import { suite, test } from "node:test";
import { strictEqual } from "assert";


suite(
  "Numeric Property",
  (): void => {

    await Promise.all(

      Object.values(RawObjectDataProcessor.ProcessingApproaches).map(

        async (processingApproach: RawObjectDataProcessor.ProcessingApproaches): Promise<void> =>

            suite(
              explodeCasedPhraseToWords(toUpperCamelCase(processingApproach)).join(" "),
              async (): Promise<void> => {
                  
                await Promise.all([

                  test(
                    "Test 1",
                    async (): Promise<void> => {
                      // TODO
                    }
                  ),

                  test(
                    "Test 2",
                    async (): Promise<void> => {
                      // TODO
                    }
                  ),

                  suite(
                    "One more suite",
                    async (): Promise<void> => {
                      
                      await test(
                        "Test 3-1",
                        (): void => {
                          strictEqual(true, true);
                        }
                      );

                      await test(
                        "Test 3-2",
                        (): void => {
                          strictEqual(false, false);
                        }
                      );
                  
                    }
                  )
                    
                ]);
                
              }
            )

      )

    );

  }
).catch(Logger.logPromiseError);
```
