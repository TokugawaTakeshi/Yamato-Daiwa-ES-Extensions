export default function hasTimeCome(dateTime: Date | string): boolean {

  const dateTime__unified: Date = typeof dateTime === "string" ? new Date(dateTime) : dateTime;
  const currentDateTime: Date = new Date();

  return dateTime__unified.getTime() - currentDateTime.getTime() <= 0;
}
