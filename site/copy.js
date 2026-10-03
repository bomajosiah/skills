const button = document.querySelector('[data-copy]');
button.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(document.querySelector('#install-command').textContent);
    button.textContent = 'Copied';
    document.querySelector('#copy-status').textContent = 'Install command copied.';
  } catch {
    button.textContent = 'Select text';
    const range = document.createRange();
    range.selectNodeContents(document.querySelector('#install-command'));
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.querySelector('#copy-status').textContent = 'Select and copy the command above.';
  }
  setTimeout(() => { button.textContent = 'Copy'; }, 2000);
});
