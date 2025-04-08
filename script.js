const resizer = document.getElementById('resizer');
const sidebar = document.getElementById('sidebar');
let isResizing = false;

resizer.addEventListener('mousedown', (e) => {
  isResizing = true;
  document.body.style.cursor = 'ew-resize';
});

document.addEventListener('mousemove', (e) => {
  if (!isResizing) return;
  const newWidth = e.clientX;
  sidebar.style.width = newWidth + 'px';
});

document.addEventListener('mouseup', () => {
  isResizing = false;
  document.body.style.cursor = 'default';
});