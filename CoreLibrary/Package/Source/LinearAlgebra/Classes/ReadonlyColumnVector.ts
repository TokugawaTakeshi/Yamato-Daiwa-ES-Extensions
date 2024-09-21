export default class ReadonlyColumnVector {

  public readonly elements: ReadonlyArray<number>;
  public readonly elementsCount: number;

  public constructor(elements: ReadonlyArray<number>) {
    this.elements = elements;
    this.elementsCount = elements.length;
  }

  public [Symbol.iterator](): Iterator<number> {

    let index: number = 0;

    const elements: ReadonlyArray<number> = this.elements;

    return {
      next(): IteratorResult<number> {
        return index < elements.length ?
            { value: elements[index++], done: false } :
            { value: null, done: true };
      }
    };

  }

}
