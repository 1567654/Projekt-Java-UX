// Resizing sidebar (dragging to resize)
const resizer = document.getElementById('resizer');
const sidebar = document.querySelector('.aside'); // Använd querySelector för att selektera rätt sidebar
let isResizing = false;

resizer.addEventListener('mousedown', (e) => {
  isResizing = true;
  document.body.style.cursor = 'ew-resize';
});

document.addEventListener('mousemove', (e) => {
  if (!isResizing) return;
  const newWidth = e.clientX;
  sidebar.style.width = newWidth + 'px'; // Ändra bredden på sidebar
});

document.addEventListener('mouseup', () => {
  isResizing = false;
  document.body.style.cursor = 'default';
});

// Hantera bilduppladdning och förhandsvisning
const upload = document.getElementById('imageUpload');
const list = document.getElementById('imageList');
const preview = document.getElementById('preview');

upload.addEventListener('change', (event) => {
  const files = Array.from(event.target.files);
  list.innerHTML = ''; // Rensa listan med tidigare bilder
  files.forEach((file) => {
    const url = URL.createObjectURL(file);
    const thumb = document.createElement('img');
    thumb.src = url;
    thumb.classList.add('thumb'); // Lägg till en klass istället för inline-styling
    thumb.onclick = () => {
      preview.src = url;
      preview.hidden = false; // Visa förhandsvisningen
    };
    list.appendChild(thumb);
  });
});

// När sidan har laddats (DOMContentLoaded), hantera knapptryckning
document.addEventListener("DOMContentLoaded", function () {
  const importBtn = document.getElementById("link1");
  const aside = document.getElementById("resizer");
  const imageUpload = document.getElementById("imageUpload");

  importBtn.addEventListener("click", () => {
    // Visa aside om den är dold
    aside.style.display = "block";

    // Trigga klick på filuppladdningen (öppnar filväljaren)
    setTimeout(() => imageUpload.click(), 200); // Lägg till en liten fördröjning för att visa aside först
  });
});

// Stäng sidebar när användaren klickar på stäng-knappen
const closeBtn = document.querySelector('.closeBarIcon');
const aside = document.getElementById("resizer");

closeBtn.addEventListener("click", () => {
  aside.style.display = "none"; // Dölj sidebar
});

document.getElementById('label').addEventListener('change', function(event) {
  const files = event.target.files;
  const container = document.getElementById('pixuresContainer');
  container.innerHTML = ''; // Rensa tidigare uppladdade bilder om det behövs

  for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = function(e) {
          const imgElement = document.createElement('img');
          imgElement.src = e.target.result;
          imgElement.style.width = '100px'; // Justera storlek på bilderna som du vill
          imgElement.style.height = 'auto';
          imgElement.alt = file.name;
          container.appendChild(imgElement);
      };

      reader.readAsDataURL(file); // Läser filen och genererar en base64-data-URL
  }
});