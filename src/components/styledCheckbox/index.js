export default function styledCheckbox(selector) {
    if (!selector) {
        console.warn('Selector required! selector: ', selector);
        return;
    }

    const nativeCheckbox = document.querySelector(selector);

    if (!nativeCheckbox) {
        console.warn('No element for selector: ', selector);
        return;
    }

    nativeCheckbox.classList.add('hidden-checkbox');

    const customCheckbox = document.createElement('div');
    customCheckbox.classList.add('custom-checkbox');
    if (nativeCheckbox.parentNode) {
        nativeCheckbox.parentNode.insertBefore(customCheckbox, nativeCheckbox.nextSibling);
      }
}