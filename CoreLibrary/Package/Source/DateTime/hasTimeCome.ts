export default function hasTimeCome(targetDateTime: Date | string): boolean {
  return new Date(targetDateTime).getTime() - new Date().getTime() <= 0;
}
