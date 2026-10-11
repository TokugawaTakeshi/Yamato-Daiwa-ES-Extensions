export default function isNumber(
  potentialNumber: unknown,
  { mustConsiderNaN_AsNumber }: Readonly<{ mustConsiderNaN_AsNumber: boolean; }>
): potentialNumber is number {

  if (typeof potentialNumber !== "number") {
    return false;
  }


  return isNaN(potentialNumber) ? mustConsiderNaN_AsNumber : true;

}
