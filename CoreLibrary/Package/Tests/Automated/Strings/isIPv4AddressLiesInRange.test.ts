import { isIPv4AddressLiesInRange, Logger } from "../../../Source";
import Testing from "node:test";
import Assert from "assert";


Promise.all([

  Testing.test(
    "The value less than minimal IP address processed correctly",
    (): void => {
      Assert.strictEqual(
        isIPv4AddressLiesInRange({
          minimalIP_Address: "127.0.0.2",
          maximalIP_Address: "127.255.255.254",
          comparedIP_Address: "127.0.0.1"
        }),
        false
      );
    }
  ),

  Testing.test(
    "Matching with left limit processed correctly",
    (): void => {
      Assert.strictEqual(
        isIPv4AddressLiesInRange({
          minimalIP_Address: "127.0.0.2",
          maximalIP_Address: "127.255.255.254",
          comparedIP_Address: "127.0.0.2"
        }),
        true
      );
    }
  ),

  Testing.test(
    "The value greater than minimal IP address but near it processed correctly",
    (): void => {
      Assert.strictEqual(
        isIPv4AddressLiesInRange({
          minimalIP_Address: "127.0.0.2",
          maximalIP_Address: "127.255.255.254",
          comparedIP_Address: "127.0.0.3"
        }),
        true
      );
    }
  ),

  Testing.test(
    "The value less than maximal IP address processed correctly",
    (): void => {
      Assert.strictEqual(
        isIPv4AddressLiesInRange({
          minimalIP_Address: "127.0.0.1",
          maximalIP_Address: "127.255.255.254",
          comparedIP_Address: "127.255.255.253"
        }),
        true
      );
    }
  ),

  Testing.test(
    "Matching with right limit processed correctly",
    (): void => {
      Assert.strictEqual(
        isIPv4AddressLiesInRange({
          minimalIP_Address: "127.0.0.1",
          maximalIP_Address: "127.255.255.254",
          comparedIP_Address: "127.255.255.254"
        }),
        true
      );
    }
  ),

  Testing.test(
    "The value greater than maximal IP address processed correctly",
    (): void => {
      Assert.strictEqual(
        isIPv4AddressLiesInRange({
          minimalIP_Address: "127.0.0.1",
          maximalIP_Address: "127.255.255.254",
          comparedIP_Address: "127.255.255.255"
        }),
        false
      );
    }
  )

]).catch(Logger.logPromiseError);
