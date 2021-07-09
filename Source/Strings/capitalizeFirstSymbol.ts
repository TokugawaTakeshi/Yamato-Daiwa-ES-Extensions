export default function capitalizeFirstSymbol(targetString: string): string {
  return targetString.charAt(0).toUpperCase() + targetString.slice(1);
}
