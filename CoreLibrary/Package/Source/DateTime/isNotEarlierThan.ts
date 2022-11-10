export default function isNotEarlierThan(
  sourceData: Readonly<{
    targetDate: Date | string;
    thanWhichDate: Date | string;
    mustIgnoreTime: boolean;
  }>
): boolean {

  const targetDate: Date = new Date(sourceData.targetDate);
  const thanWhichDate: Date = new Date(sourceData.thanWhichDate);

  if (sourceData.mustIgnoreTime) {

    targetDate.setHours(0);
    targetDate.setMinutes(0);
    targetDate.setSeconds(0);
    targetDate.setMilliseconds(0);

    thanWhichDate.setHours(0);
    thanWhichDate.setMinutes(0);
    thanWhichDate.setSeconds(0);
    thanWhichDate.setMilliseconds(0);

  }


  return targetDate.getTime() >= thanWhichDate.getTime();

}
