export function htmlToPlainText(html) {
    // Create a new DOMParser
    const parser = new DOMParser();

    // Parse the HTML string into a DOM document
    const doc = parser.parseFromString(html, 'text/html');

    // Use the document's textContent to get the plain text
    const plainText = doc.body.textContent;

    return plainText;
}

