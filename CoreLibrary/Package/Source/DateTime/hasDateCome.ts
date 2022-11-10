export default function hasDateCome(targetDate: Date | string): boolean {

  const midnightOfTargetDate: Date = new Date(targetDate);
  midnightOfTargetDate.setHours(0);
  midnightOfTargetDate.setMinutes(0);
  midnightOfTargetDate.setSeconds(0);
  midnightOfTargetDate.setMilliseconds(0);

  const midnightOfCurrentDate: Date = new Date();
  midnightOfCurrentDate.setHours(0);
  midnightOfCurrentDate.setMinutes(0);
  midnightOfCurrentDate.setSeconds(0);
  midnightOfCurrentDate.setMilliseconds(0);

  return midnightOfCurrentDate.getTime() >= midnightOfTargetDate.getTime();

}
