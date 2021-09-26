import formatNumberWith4KetaKanji from "../../Source/Numbers/formatNumberWith4KetaKanji";
import { strictEqual } from "assert";


describe("formatNumberWith4KetaKanji", (): void => {

  it("No value changes for 4 digits and less", (): void => {
    [ 2, 34, 452, 5634 ].forEach((number: number): void => {
      strictEqual(formatNumberWith4KetaKanji(number), String(number));
    });
  });

  it("'万' has been added to appropriate position", (): void => {

    const testingSet: Array<[number, string]> = [
      [ 12345, "1万2345" ],
      [ 123456, "12万3456" ],
      [ 1234567, "123万4567" ],
      [ 12345678, "1234万5678" ]
    ];

    testingSet.forEach(([ number, formattedNumber ]: [number, string]): void => {
      strictEqual(formatNumberWith4KetaKanji(number), formattedNumber);
    });
  });

  it("'億' and '万' has been added to appropriate position", (): void => {

    const testingSet: Array<[number, string]> = [
      [ 123456789, "1億2345万6789" ],
      [ 1234567890, "12億3456万7890" ],
      [ 12345678901, "123億4567万8901" ],
      [ 123456789012, "1234億5678万9012" ]
    ];

    testingSet.forEach(([ number, formattedNumber ]: [number, string]): void => {
      strictEqual(formatNumberWith4KetaKanji(number), formattedNumber);
    });
  });

  it("'兆', '億' and '万' has been added to appropriate position", (): void => {

    const testingSet: Array<[number, string]> = [
      [ 1234567890123, "1兆2345億6789万0123" ],
      [ 12345678901234, "12兆3456億7890万1234" ],
      [ 123456789012345, "123兆4567億8901万2345" ],
      [ 1234567890123456, "1234兆5678億9012万3456" ]
    ];

    testingSet.forEach(([ number, formattedNumber ]: [number, string]): void => {
      strictEqual(formatNumberWith4KetaKanji(number), formattedNumber);
    });
  });

  it("'京', '兆', '億' and '万' has been added to appropriate position", (): void => {

    /* 〔 Note 〕 The 'Number.MAX_SAFE_INTEGER' is 9007199254740991 */
    const testingSet: Array<[string | bigint, string]> = [
      [ BigInt("12345678901234567"), "1京2345兆6789億0123万4567" ],
      [ BigInt("123456789012345678"), "12京3456兆7890億1234万5678" ],
      [ BigInt("1234567890123456789"), "123京4567兆8901億2345万6789" ],
      [ BigInt("12345678901234567890"), "1234京5678兆9012億3456万7890" ],
      [ "12345678901234567", "1京2345兆6789億0123万4567" ],
      [ "123456789012345678", "12京3456兆7890億1234万5678" ],
      [ "1234567890123456789", "123京4567兆8901億2345万6789" ],
      [ "12345678901234567890", "1234京5678兆9012億3456万7890" ]
    ];

    testingSet.forEach(([ stringifiedNumber, formattedNumber ]: [string | bigint, string]): void => {
      strictEqual(formatNumberWith4KetaKanji(stringifiedNumber), formattedNumber);
    });
  });

  it("For the number greater than '9999京' five and more digits before '京'", (): void => {

    /* 〔 Note 〕 The 'Number.MAX_SAFE_INTEGER' is 9007199254740991 */
    const testingSet: Array<[string | bigint, string]> = [
      [ BigInt("123456789012345678901"), "12345京6789兆0123億4567万8901" ],
      [ "123456789012345678901", "12345京6789兆0123億4567万8901" ],
      [ BigInt("1234567890123456789012"), "123456京7890兆1234億5678万9012" ],
      [ "1234567890123456789012", "123456京7890兆1234億5678万9012" ]
    ];

    testingSet.forEach(([ stringifiedNumber, formattedNumber ]: [string | bigint, string]): void => {
      strictEqual(formatNumberWith4KetaKanji(stringifiedNumber), formattedNumber);
    });
  });
});
