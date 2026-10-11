export default abstract class EmailAddress {

  /* [ Theory ] https://www.w3resource.com/javascript/form/email-validation.php */
  public static readonly VALID_PATTERN: RegExp = /^\w+(?:[.-]?\w+)*@\w+(?:[.-]?\w+)*(?:\.\w{2,3})+$/u;

  public static isValid(potentialEmail: string): boolean {
    return EmailAddress.VALID_PATTERN.test(potentialEmail);
  }

}
