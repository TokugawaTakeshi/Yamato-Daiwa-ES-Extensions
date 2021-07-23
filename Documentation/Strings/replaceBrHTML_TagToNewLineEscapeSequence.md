# replaceBrHTML_TagToNewLineEscapeSequence: Replacing of "br" HTML tag to new line (line feed) escape sequence

```
replaceBrHTML_TagToNewLineEscapeSequence(targetString: string): string
```


```typescript
import { replaceBrHTML_TagToNewLineEscapeSequence } from "@yamato-daiwa/es-extensions";

const textExample = `En multaj lokoj de Ĉinio estis temploj de drako-reĝo. <br>
    Dum trosekeco oni preĝis en la temploj, ke la drako-reĝo donu pluvon al la homa mondo. <br/>
    Tiam drako estis simbolo de la supernatura estaĵo. <br />
    Kaj pli poste, ĝi fariĝis prapatro de la plej altaj regantoj kaj simbolis la absolutan
        aŭtoritaton de feŭda imperiestro.`;

console.log(replaceBrHTML_TagToNewLineEscapeSequence(textExample));
/* =>
En multaj lokoj de Ĉinio estis temploj de drako-reĝo.

    Dum trosekeco oni preĝis en la temploj, ke la drako-reĝo donu pluvon al la homa mondo.

    Tiam drako estis simbolo de la supernatura estaĵo.

    Kaj pli poste, ĝi fariĝis prapatro de la plej altaj regantoj kaj simbolis la absolutan
        aŭtoritaton de feŭda imperiestro.
*/
```
