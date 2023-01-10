import { appendFragmentToURI } from "../../../../Source";
import Assert from "assert";


describe("appendFragmentToURI", (): void => {

  describe("Appending of previously non existed fragment", (): void => {

    const sampleURI: string = "sample/path";

    it("Parameter with leading hash", (): void => {
      Assert.strictEqual(
        appendFragmentToURI({
          targetURI: sampleURI,
          targetFragmentWithOrWithoutLeadingHash: "#test",
          mustReplaceFragmentIfThereIsOneAlready: true
        }),
        "sample/path#test"
      );
    });

    it("Parameter without leading hash", (): void => {
      Assert.strictEqual(
        appendFragmentToURI({
          targetURI: sampleURI,
          targetFragmentWithOrWithoutLeadingHash: "test",
          mustReplaceFragmentIfThereIsOneAlready: true
        }),
        "sample/path#test"
      );
    });

  });

  describe("Replacing of previously existed fragment", (): void => {

    const sampleURI: string = "sample/path#previous";

    it("Parameter with leading hash", (): void => {
      Assert.strictEqual(
        appendFragmentToURI({
          targetURI: sampleURI,
          targetFragmentWithOrWithoutLeadingHash: "#test",
          mustReplaceFragmentIfThereIsOneAlready: true
        }),
        "sample/path#test"
      );
    });

    it("Parameter without leading hash", (): void => {
      Assert.strictEqual(
        appendFragmentToURI({
          targetURI: sampleURI,
          targetFragmentWithOrWithoutLeadingHash: "test",
          mustReplaceFragmentIfThereIsOneAlready: true
        }),
        "sample/path#test"
      );
    });

  });

  describe("Ignoring of previously existed fragment", (): void => {

    const sampleURI: string = "sample/path#previous";

    it("Parameter with leading hash", (): void => {
      Assert.strictEqual(
        appendFragmentToURI({
          targetURI: sampleURI,
          targetFragmentWithOrWithoutLeadingHash: "#test",
          mustReplaceFragmentIfThereIsOneAlready: false
        }),
        sampleURI
      );
    });

    it("Parameter without leading hash", (): void => {
      Assert.strictEqual(
        appendFragmentToURI({
          targetURI: sampleURI,
          targetFragmentWithOrWithoutLeadingHash: "test",
          mustReplaceFragmentIfThereIsOneAlready: false
        }),
        sampleURI
      );
    });

  });


  describe("Surrogate pairs support", (): void => {

    const sampleURI: string = "sample/path#😀previous";

    it("Parameter with leading hash", (): void => {
      Assert.strictEqual(
        appendFragmentToURI({
          targetURI: sampleURI,
          targetFragmentWithOrWithoutLeadingHash: "#😆test",
          mustReplaceFragmentIfThereIsOneAlready: true
        }),
        "sample/path#😆test"
      );
    });

    it("Parameter without leading hash", (): void => {
      Assert.strictEqual(
        appendFragmentToURI({
          targetURI: sampleURI,
          targetFragmentWithOrWithoutLeadingHash: "😆test",
          mustReplaceFragmentIfThereIsOneAlready: true
        }),
        "sample/path#😆test"
      );
    });

  });

});
