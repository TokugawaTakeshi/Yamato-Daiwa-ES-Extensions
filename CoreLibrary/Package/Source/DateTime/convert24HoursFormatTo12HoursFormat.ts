export default function convert24HoursFormatTo12HoursFormat(hoursAmount__24Format: number): number {

  if (hoursAmount__24Format === 0) {
    return 12;
  }


  if (hoursAmount__24Format < 13) {
    return hoursAmount__24Format;
  }


  return hoursAmount__24Format - 12;

}
