export default function createHTML_CollectionFromHTML_Code(HTML_Code: string): HTMLCollection {

  const container: Document = document.implementation.createHTMLDocument();

  container.body.innerHTML = HTML_Code;

  return container.body.children;
}
