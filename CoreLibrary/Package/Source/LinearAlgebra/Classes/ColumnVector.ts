import ReadonlyColumnVector from "./ReadonlyColumnVector";


export default class ColumnVector extends ReadonlyColumnVector {

  declare public readonly elements: Array<number>;

  public constructor(elements: ReadonlyArray<number>) {
    super(elements);
  }

}
