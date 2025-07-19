import { formatNumberWith4KetaKanji, Logger } from "../../../Source";
import Testing from "node:test";
import Assert from "assert";


Promise.all([

  Testing.test(
    "Values of 4 Digits and Less has not Changes",
    (): void => {
      [ 2, 34, 452, 5634 ].forEach((number: number): void => {
        Assert.strictEqual(formatNumberWith4KetaKanji(number), String(number));
      });
    }
  ),

  Testing.test(
    "\"万\" has been Added to Correct Position",
    (): void => {

      const testingSet: Array<[ number, string ]> = [
        [ 12345, "1万2345" ],
        [ 123456, "12万3456" ],
        [ 1234567, "123万4567" ],
        [ 12345678, "1234万5678" ],
        [ -12345, "-1万2345" ],
        [ -123456, "-12万3456" ],
        [ -1234567, "-123万4567" ],
        [ -12345678, "-1234万5678" ]
      ];

      testingSet.forEach(
        ([ number, formattedNumber ]: Readonly<[ number, string ]>): void => {
          Assert.strictEqual(formatNumberWith4KetaKanji(number), formattedNumber);
        }
      );

    }
  ),

  Testing.test(
    "\"億\" and \"万\" has been added to appropriate position",
    (): void => {

      const testingSet: Array<[ number, string ]> = [
        [ 123456789, "1億2345万6789" ],
        [ 1234567890, "12億3456万7890" ],
        [ 12345678901, "123億4567万8901" ],
        [ 123456789012, "1234億5678万9012" ],
        [ -123456789, "-1億2345万6789" ],
        [ -1234567890, "-12億3456万7890" ],
        [ -12345678901, "-123億4567万8901" ],
        [ -123456789012, "-1234億5678万9012" ]
      ];

      testingSet.forEach(
        ([ number, formattedNumber ]: Readonly<[ number, string ]>): void => {
          Assert.strictEqual(formatNumberWith4KetaKanji(number), formattedNumber);
        }
      );

    }
  ),

  Testing.test(
    "\"兆\", \"億\" and \"万\" has been added to appropriate position",
    (): void => {

      const testingSet: Array<[ number, string ]> = [
        [ 1234567890123, "1兆2345億6789万0123" ],
        [ 12345678901234, "12兆3456億7890万1234" ],
        [ 123456789012345, "123兆4567億8901万2345" ],
        [ 1234567890123456, "1234兆5678億9012万3456" ],
        [ -1234567890123, "-1兆2345億6789万0123" ],
        [ -12345678901234, "-12兆3456億7890万1234" ],
        [ -123456789012345, "-123兆4567億8901万2345" ],
        [ -1234567890123456, "-1234兆5678億9012万3456" ]
      ];

      testingSet.forEach(
        ([ number, formattedNumber ]: Readonly<[ number, string ]>): void => {
          Assert.strictEqual(formatNumberWith4KetaKanji(number), formattedNumber);
        }
      );

    }
  ),

  Testing.test(
    "'京', '兆', '億' and '万' has been added to appropriate position",
    (): void => {

      /* 〔 Note 〕 The 'Number.MAX_SAFE_INTEGER' is 9,007,199,254,740,991 */
      const testingSet: Array<[ string | bigint, string ]> = [
        [ 12345678901234567n, "1京2345兆6789億0123万4567" ],
        [ 123456789012345678n, "12京3456兆7890億1234万5678" ],
        [ 1234567890123456789n, "123京4567兆8901億2345万6789" ],
        [ 12345678901234567890n, "1234京5678兆9012億3456万7890" ],
        [ "12345678901234567", "1京2345兆6789億0123万4567" ],
        [ "123456789012345678", "12京3456兆7890億1234万5678" ],
        [ "1234567890123456789", "123京4567兆8901億2345万6789" ],
        [ "12345678901234567890", "1234京5678兆9012億3456万7890" ],
        [ -12345678901234567n, "-1京2345兆6789億0123万4567" ],
        [ -123456789012345678n, "-12京3456兆7890億1234万5678" ],
        [ -1234567890123456789n, "-123京4567兆8901億2345万6789" ],
        [ -12345678901234567890n, "-1234京5678兆9012億3456万7890" ],
        [ "-12345678901234567", "-1京2345兆6789億0123万4567" ],
        [ "-123456789012345678", "-12京3456兆7890億1234万5678" ],
        [ "-1234567890123456789", "-123京4567兆8901億2345万6789" ],
        [ "-12345678901234567890", "-1234京5678兆9012億3456万7890" ]
      ];

      testingSet.forEach(
        ([ stringifiedNumber, formattedNumber ]: Readonly<[ string | bigint, string ]>): void => {
          Assert.strictEqual(formatNumberWith4KetaKanji(stringifiedNumber), formattedNumber);
        }
      );

    }
  ),

  Testing.test(
    "For the number greater than \"9999京\" five and more digits before \"京\"",
    (): void => {

      /* 〔 Note 〕 The 'Number.MAX_SAFE_INTEGER' is 9,007,199,254,740,991 */
      const testingSet: Array<[ string | bigint, string ]> = [
        [ BigInt("123456789012345678901"), "12345京6789兆0123億4567万8901" ],
        [ "123456789012345678901", "12345京6789兆0123億4567万8901" ],
        [ BigInt("1234567890123456789012"), "123456京7890兆1234億5678万9012" ],
        [ "1234567890123456789012", "123456京7890兆1234億5678万9012" ]
      ];

      testingSet.forEach(
        ([ stringifiedNumber, formattedNumber ]: Readonly<[ string | bigint, string ]>): void => {
          Assert.strictEqual(formatNumberWith4KetaKanji(stringifiedNumber), formattedNumber);
        }
      );

    }
  )

]).catch(Logger.logPromiseError);
