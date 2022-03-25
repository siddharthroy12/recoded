export default function downloadBlob(blob, filename) {
  let element = document.createElement('a');
  element.setAttribute('href', blob);
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
