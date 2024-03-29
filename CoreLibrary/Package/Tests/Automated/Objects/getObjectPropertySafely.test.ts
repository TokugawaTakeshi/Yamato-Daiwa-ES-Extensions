import { getObjectPropertySafely, isUndefined } from "../../../Source";
import Assert from "assert";


describe("getObjectPropertySafely", (): void => {

  const experimentalSample: unknown = {
    alpha1: {
      alpha1_1: "ALPHA",
      alpha1_2: null
    },
    bravo1: null
  };

  it("Non-nullable value retrieved correctly", (): void => {

    /* eslint-disable @typescript-eslint/no-unsafe-member-access -- We need to check does target function work as native
    *   optional chaining - it is valid JavaScript but not TypeScript. */
    // @ts-expect-error: TS2339 In this case, the usage of ts-expect is obeying to guidelines (testing)
    Assert.strictEqual(experimentalSample?.alpha1?.alpha1_1, "ALPHA");
    /* eslint-enable @typescript-eslint/no-unsafe-member-access */

    Assert.strictEqual(getObjectPropertySafely(experimentalSample, "alpha1.alpha1_1"), "ALPHA");
    Assert.strictEqual(getObjectPropertySafely(experimentalSample, [ "alpha1", "alpha1_1" ]), "ALPHA");

  });

  it("Accessing to child property of not existing one processed correctly", (): void => {

    /* eslint-disable @typescript-eslint/no-unsafe-member-access -- We need to check does target function work as native
     *   optional chaining - it is valid JavaScript but not TypeScript. */
    // @ts-expect-error: TS2339 In this case, the usage of ts-expect is obeying to guidelines (testing)
    Assert.strictEqual(isUndefined(experimentalSample?.bravo1?.bravo1_1), true);
    /* eslint-enable @typescript-eslint/no-unsafe-member-access */
    Assert.strictEqual(isUndefined(getObjectPropertySafely(experimentalSample, "bravo1.bravo1_1")), true);
    Assert.strictEqual(isUndefined(getObjectPropertySafely(experimentalSample, [ "bravo1", "bravo1_1" ])), true);

  });

  it("The non-objects are being processed correctly", (): void => {
    Assert.strictEqual(isUndefined(getObjectPropertySafely("TEST", "bravo1.bravo1_1")), true);
    Assert.strictEqual(isUndefined(getObjectPropertySafely("TEST", [ "bravo1", "bravo1_1" ])), true);
  });

});
