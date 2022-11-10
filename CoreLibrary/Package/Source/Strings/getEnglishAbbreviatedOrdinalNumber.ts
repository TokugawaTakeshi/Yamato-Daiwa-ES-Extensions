export default function getEnglishAbbreviatedOrdinalNumber(targetNumber: number): string {

  switch (targetNumber) {

    case 1: return "1st";
    case 2: return "2nd";
    case 3: return "3rd";

    default: return `${ targetNumber }th`;

  }

}
