export enum SpaceCharacters {
  regularSpace = "\u0020",
  noBreakSpace = "\u00A0",
  enSpace = "\u2002",
  emSpace = "\u2003",
  threePerEmSpace = "\u2004",
  forPerEmSpace = "\u2005",
  sixPerEmSpace = "\u2006",
  figureSpace = "\u2007",
  punctuationSpace = "\u2008",
  thinSpace = "\u2009",
  hairSpace = "\u200A",
  zeroWidthSpace = "\u200B",
  ideographicSpace = "\u3000",
  zeroWithNoBreakSpace = "\uFEFF",
  characterTabulation = "\u0009"
}

export enum SpaceCharactersStringifiedHexCharactersForRegularExpressionWithUnicodeFlag {
  regularSpace = "\\u{0020}",
  noBreakSpace = "\\u{00A0}",
  enSpace = "\\u{2002}",
  emSpace = "\\u{2003}",
  threePerEmSpace = "\\u{2004}",
  forPerEmSpace = "\\u{2005}",
  sixPerEmSpace = "\\u{2006}",
  figureSpace = "\\u{2007}",
  punctuationSpace = "\\u{2008}",
  thinSpace = "\\u{2009}",
  hairSpace = "\\u{200A}",
  zeroWidthSpace = "\\u{200B}",
  ideographicSpace = "\\u{3000}",
  zeroWithNoBreakSpace = "\\u{FEFF}",
  characterTabulation = "\\u{0009}"
}

export enum EscapeCharacters {
  backspace = "\b",
  formFeed = "\f",
  newLine = "\n",
  carriageReturn = "\r",
  horizontalTabulator = "\t",
  verticalTabulator = "\v"
}

export const latinCharacters__lowercase: Array<string> = "abcdefghijklmnopqrstuvwxyz".split("");
export const latinCharacters__uppercase: Array<string> = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const stringifiedDigits: Array<string> = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ];
