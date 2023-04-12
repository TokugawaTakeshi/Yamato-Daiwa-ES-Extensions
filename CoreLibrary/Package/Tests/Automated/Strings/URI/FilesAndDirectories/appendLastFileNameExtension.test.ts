import { appendLastFileNameExtension } from "../../../../../Source";
import Assert from "assert";


describe("appendLastFileNameExtension", (): void => {

  describe("Case with path without filename extension", (): void => {

    it("File name extension has been appended", (): void => {

      Assert.strictEqual(
        appendLastFileNameExtension({
          targetPath: "path/to/some/file",
          targetFileNameExtensionWithOrWithoutLeadingDot: "md",
          mustAppendDuplicateEvenIfTargetLastFileNameExtensionAlreadyPresentsAtSpecifiedPath: false
        }),
        "path/to/some/file.md"
      );

      Assert.strictEqual(
        appendLastFileNameExtension({
          targetPath: "path/to/some/file",
          targetFileNameExtensionWithOrWithoutLeadingDot: ".md",
          mustAppendDuplicateEvenIfTargetLastFileNameExtensionAlreadyPresentsAtSpecifiedPath: false
        }),
        "path/to/some/file.md"
      );

    });

    it("File name extension has been appended herewith the fragment has been kept", (): void => {

      Assert.strictEqual(
        appendLastFileNameExtension({
          targetPath: "path/to/some/file#description",
          targetFileNameExtensionWithOrWithoutLeadingDot: "md",
          mustAppendDuplicateEvenIfTargetLastFileNameExtensionAlreadyPresentsAtSpecifiedPath: false
        }),
        "path/to/some/file.md#description"
      );

      Assert.strictEqual(
        appendLastFileNameExtension({
          targetPath: "path/to/some/file#description",
          targetFileNameExtensionWithOrWithoutLeadingDot: ".md",
          mustAppendDuplicateEvenIfTargetLastFileNameExtensionAlreadyPresentsAtSpecifiedPath: false
        }),
        "path/to/some/file.md#description"
      );

    });

    it("Path with fragment and surrogate pairs has been processed correctly", (): void => {

      Assert.strictEqual(
        appendLastFileNameExtension({
          targetPath: "path/to/some/file🙂#😃description",
          targetFileNameExtensionWithOrWithoutLeadingDot: "md",
          mustAppendDuplicateEvenIfTargetLastFileNameExtensionAlreadyPresentsAtSpecifiedPath: false
        }),
        "path/to/some/file🙂.md#😃description"
      );

      Assert.strictEqual(
        appendLastFileNameExtension({
          targetPath: "path/to/some/file🙂#😃description",
          targetFileNameExtensionWithOrWithoutLeadingDot: ".md",
          mustAppendDuplicateEvenIfTargetLastFileNameExtensionAlreadyPresentsAtSpecifiedPath: false
        }),
        "path/to/some/file🙂.md#😃description"
      );

    });

  });


  describe("Case with path including filename extension", (): void => {

    it("One more file name extension has been appended", (): void => {

      Assert.strictEqual(
        appendLastFileNameExtension({
          targetPath: "path/to/some/file.php",
          targetFileNameExtensionWithOrWithoutLeadingDot: "blade",
          mustAppendDuplicateEvenIfTargetLastFileNameExtensionAlreadyPresentsAtSpecifiedPath: false
        }),
        "path/to/some/file.php.blade"
      );

      Assert.strictEqual(
        appendLastFileNameExtension({
          targetPath: "path/to/some/file.php",
          targetFileNameExtensionWithOrWithoutLeadingDot: ".blade",
          mustAppendDuplicateEvenIfTargetLastFileNameExtensionAlreadyPresentsAtSpecifiedPath: false
        }),
        "path/to/some/file.php.blade"
      );

    });

    it("One more file name extension has been appended herewith the fragment has been kept", (): void => {

      Assert.strictEqual(
        appendLastFileNameExtension({
          targetPath: "path/to/some/file.php#section",
          targetFileNameExtensionWithOrWithoutLeadingDot: "blade",
          mustAppendDuplicateEvenIfTargetLastFileNameExtensionAlreadyPresentsAtSpecifiedPath: false
        }),
        "path/to/some/file.php.blade#section"
      );

      Assert.strictEqual(
        appendLastFileNameExtension({
          targetPath: "path/to/some/file.php#section",
          targetFileNameExtensionWithOrWithoutLeadingDot: ".blade",
          mustAppendDuplicateEvenIfTargetLastFileNameExtensionAlreadyPresentsAtSpecifiedPath: false
        }),
        "path/to/some/file.php.blade#section"
      );

    });

  });

  it("Duplicating of filename extension has been processed correctly depending on options", (): void => {

    Assert.strictEqual(
      appendLastFileNameExtension({
        targetPath: "path/to/some/file.php",
        targetFileNameExtensionWithOrWithoutLeadingDot: "php",
        mustAppendDuplicateEvenIfTargetLastFileNameExtensionAlreadyPresentsAtSpecifiedPath: false
      }),
      "path/to/some/file.php"
    );

    Assert.strictEqual(
      appendLastFileNameExtension({
        targetPath: "path/to/some/file.php",
        targetFileNameExtensionWithOrWithoutLeadingDot: ".php",
        mustAppendDuplicateEvenIfTargetLastFileNameExtensionAlreadyPresentsAtSpecifiedPath: true
      }),
      "path/to/some/file.php.php"
    );

  });

});
