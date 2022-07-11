import Path from "path";
import ImprovedPath from "../../Source/ImprovedPath/ImprovedPath";
import { deepEqual, equal } from "assert";


describe("ImprovedPath", (): void => {

  describe("buildAbsolutePath", (): void => {

    const pathSegments: Array<string> = [ "/foo/bar", "./baz" ];

    it("As default works as native 'Path.resolve'", (): void => {
      deepEqual(Path.resolve(...pathSegments), ImprovedPath.buildAbsolutePath(pathSegments));
    });

    it("With 'forwardSlashOnlySeparators' using forward slashes", (): void => {
      equal(ImprovedPath.buildAbsolutePath(pathSegments, { forwardSlashOnlySeparators: true }), "D:/foo/bar/baz");
    });

  });

  // describe("parsePath", (): void => {
  //
  //   const unixLikeAbsoluteSamplePath: string = "/home/user/dir/file.txt";
  //   const windowsLikeAbsoluteSamplePath: string = "C:\\path\\dir\\file.txt";
  //   const unixLikeRelativeSamplePath: string = "home/user/dir/file.txt";
  //   const windowsLikeRelativeSamplePath: string = "path\\dir\\file.txt";
  //
  //   it("root & getRootWhichExpectedBeDefined", (): void => {
  //
  //     Assert.strictEqual(ImprovedPath.parsePath(unixLikeAbsoluteSamplePath).root, "/");
  //     Assert.strictEqual(
  //       Path.parse(unixLikeAbsoluteSamplePath).root,
  //       ImprovedPath.parsePath(unixLikeAbsoluteSamplePath).root
  //     );
  //
  //     Assert.strictEqual(ImprovedPath.parsePath(windowsLikeAbsoluteSamplePath).root, "C:\\");
  //     Assert.strictEqual(
  //       Path.parse(windowsLikeAbsoluteSamplePath).root,
  //       ImprovedPath.parsePath(windowsLikeAbsoluteSamplePath).root
  //     );
  //     Assert.strictEqual(ImprovedPath.parsePath(windowsLikeAbsoluteSamplePath, {
  //       forwardSlashOnlySeparators: true
  //     }).root, "C:/");
  //
  //     Assert.strictEqual(Path.parse(unixLikeRelativeSamplePath).root, "");
  //     Assert.isUndefined(ImprovedPath.parsePath(unixLikeRelativeSamplePath).root);
  //     expect((): void => {
  //       ImprovedPath.parsePath(unixLikeRelativeSamplePath).getRootWhichExpectedBeDefined();
  //     }).to.throw(UnexpectedEventError);
  //
  //     Assert.strictEqual(Path.parse(windowsLikeRelativeSamplePath).root, "");
  //     Assert.isUndefined(ImprovedPath.parsePath(windowsLikeRelativeSamplePath).root);
  //     expect((): void => {
  //       ImprovedPath.parsePath(windowsLikeRelativeSamplePath).getRootWhichExpectedBeDefined();
  //     }).to.throw(UnexpectedEventError);
  //   });

    // it("directory & getDirectoryWhichExpectedBeDefined", (): void => {
    //
    //   const unixLikeSampleAbsolutePathWithoutDirectory: string = "/file.txt";
    //   const unixLikeSampleRelativePathWithoutDirectory: string = "file.txt";
    //   const windowsLikeSampleAbsolutePathWithoutSubdirectory: string = "C:\\file.txt";
    //   const windowsLikeSampleRelativePathWithoutSubdirectory: string = "file.txt";
    //
    //   Assert.strictEqual(ImprovedPath.parsePath(unixLikeAbsoluteSamplePath).directory, "/home/user/dir");
    //   Assert.strictEqual(
    //     ImprovedPath.parsePath(unixLikeAbsoluteSamplePath).directory,
    //     Path.parse(unixLikeAbsoluteSamplePath).dir
    //   );
    //
    //   Assert.strictEqual(ImprovedPath.parsePath(unixLikeSampleAbsolutePathWithoutDirectory).directory, "/");
    //   Assert.strictEqual(
    //     ImprovedPath.parsePath(unixLikeSampleAbsolutePathWithoutDirectory).directory,
    //     Path.parse(unixLikeSampleAbsolutePathWithoutDirectory).dir
    //   );
    //
    //   Assert.strictEqual(Path.parse(unixLikeSampleRelativePathWithoutDirectory).dir, "");
    //   Assert.isUndefined(ImprovedPath.parsePath(unixLikeSampleRelativePathWithoutDirectory).directory);
    //   expect((): void => {
    //     ImprovedPath.parsePath(unixLikeSampleRelativePathWithoutDirectory).getDirectoryWhichExpectedBeDefined();
    //   }).to.throw(UnexpectedEventError);
    //
    //   Assert.strictEqual(ImprovedPath.parsePath(windowsLikeAbsoluteSamplePath).directory, "C:\\path\\dir");
    //   Assert.strictEqual(
    //       ImprovedPath.parsePath(windowsLikeAbsoluteSamplePath).directory,
    //       Path.parse(windowsLikeAbsoluteSamplePath).dir
    //   );
    //
    //   Assert.strictEqual(ImprovedPath.parsePath(windowsLikeSampleAbsolutePathWithoutSubdirectory).directory, "C:\\");
    //   Assert.strictEqual(
    //       ImprovedPath.parsePath(windowsLikeSampleAbsolutePathWithoutSubdirectory).directory,
    //       Path.parse(windowsLikeSampleAbsolutePathWithoutSubdirectory).dir
    //   );
    //
    //   Assert.strictEqual(Path.parse(windowsLikeSampleRelativePathWithoutSubdirectory).dir, "");
    //   Assert.isUndefined(ImprovedPath.parsePath(windowsLikeSampleRelativePathWithoutSubdirectory).directory);
    //   expect((): void => {
    //     ImprovedPath.parsePath(windowsLikeSampleRelativePathWithoutSubdirectory).getDirectoryWhichExpectedBeDefined();
    //   }).to.throw(UnexpectedEventError);
    // });
  // });
});
