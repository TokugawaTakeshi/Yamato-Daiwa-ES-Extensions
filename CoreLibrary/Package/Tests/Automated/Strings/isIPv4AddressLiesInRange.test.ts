import Assert from "assert";
import { isIPv4AddressLiesInRange } from "../../../Source";


describe("isIPv4AddressLiesInRange", (): void => {

  it("The value less than minimal IP address processed correctly", (): void => {
    Assert.strictEqual(
      isIPv4AddressLiesInRange({
        minimalIP_Address: "127.0.0.2",
        maximalIP_Address: "127.255.255.254",
        comparedIP_Address: "127.0.0.1"
      }),
      false
    );
  });

  it("Matching with left limit processed correctly", (): void => {
    Assert.strictEqual(
      isIPv4AddressLiesInRange({
        minimalIP_Address: "127.0.0.2",
        maximalIP_Address: "127.255.255.254",
        comparedIP_Address: "127.0.0.2"
      }),
      true
    );
  });

  it("The value greater than minimal IP address but near it processed correctly", (): void => {
    Assert.strictEqual(
      isIPv4AddressLiesInRange({
        minimalIP_Address: "127.0.0.2",
        maximalIP_Address: "127.255.255.254",
        comparedIP_Address: "127.0.0.3"
      }),
      true
    );
  });

  it("The value less than maximal IP address processed correctly", (): void => {
    Assert.strictEqual(
      isIPv4AddressLiesInRange({
        minimalIP_Address: "127.0.0.1",
        maximalIP_Address: "127.255.255.254",
        comparedIP_Address: "127.255.255.253"
      }),
      true
    );
  });

  it("Matching with right limit processed correctly", (): void => {
    Assert.strictEqual(
      isIPv4AddressLiesInRange({
        minimalIP_Address: "127.0.0.1",
        maximalIP_Address: "127.255.255.254",
        comparedIP_Address: "127.255.255.254"
      }),
      true
    );
  });

  it("The value greater than maximal IP address processed correctly", (): void => {
    Assert.strictEqual(
      isIPv4AddressLiesInRange({
        minimalIP_Address: "127.0.0.1",
        maximalIP_Address: "127.255.255.254",
        comparedIP_Address: "127.255.255.255"
      }),
      false
    );
  });

});
