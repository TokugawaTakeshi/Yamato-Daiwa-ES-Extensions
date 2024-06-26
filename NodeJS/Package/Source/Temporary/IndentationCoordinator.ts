import { splitString } from "@yamato-daiwa/es-extensions";


export default class IndentationCoordinator {

  private static readonly DOUBLE_SPACE: string = "\u0020\u0020";

  private currentIndentationMultiplier: number = 0;


  public incrementIndent(): void {
    this.currentIndentationMultiplier++;
  }

  public decrementIndent(): void {
    this.currentIndentationMultiplier--;
  }

  public insertIndent(): string {
    return IndentationCoordinator.DOUBLE_SPACE.repeat(this.currentIndentationMultiplier);
  }

  public incrementIndentAndInsert(): string {
    this.incrementIndent();
    return this.insertIndent();
  }

  public decrementIndentAndInsert(): string {
    this.decrementIndent();
    return this.insertIndent();
  }

  public insertIncrementedIndentWihtoutUpdatingOfIndentationMultiplier(): string {
    return IndentationCoordinator.DOUBLE_SPACE.repeat(this.currentIndentationMultiplier + 1);
  }

  public addCurrentIntendationToEachLineOf(targetString: string): string {
    return splitString(targetString, "\n").
        map((line: string): string => `${ this.insertIndent() }${ line }`).
        join("\n");
  }

}
