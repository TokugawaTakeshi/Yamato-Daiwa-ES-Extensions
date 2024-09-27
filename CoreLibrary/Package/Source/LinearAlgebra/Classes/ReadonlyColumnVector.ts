interface ReadonlyColumnVector<ElementType> extends ReadonlyArray<ElementType> {
  getElementAt__numerationFrom1: (targetElementNumber__numerationFrom1: number) => ElementType;
}


export default ReadonlyColumnVector;
