export default function createElements(HTML_Code: string): HTMLCollection {

  const container: Document = document.implementation.createHTMLDocument();

  container.body.innerHTML = HTML_Code;

  return container.body.children;
}
