export default function replaceBrHTML_TagToNewLineEscapeSequence(targetString) {
    return targetString.replace(/<br\s*\/*>/gu, "\n");
}
