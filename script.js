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



// Stäng sidebar när användaren klickar på stäng-knappen
const closeBtn = document.querySelector('.closeBarIcon');
const aside = document.getElementById("resizer");

closeBtn.addEventListener("click", () => {
  aside.style.display = "none"; // Dölj sidebar
});




const app = {
  data() {
    return {
      images: [],
      selectedImageIndex: null,
      isResizing: false,
      drawerWidth: 300,
      canvas: null,
      ctx: null,
    };
  },
  methods: {
    handleFileChange(event) {
      console.log("jag händer")
      const files = Array.from(event.target.files);
      const imageUrls = files.map(file => URL.createObjectURL(file));
      this.images.push(...imageUrls);
    },
    selectImage(idx) {
      this.selectedImageIndex = idx;
      this.loadImageToCanvas(this.images[idx]);
    },
    // loadImageToCanvas(src) {
    //   const img = new Image();
    //   img.src = src;
    //   img.onload = () => {
    //     const canvas = this.$refs.canvas;
    //     this.ctx = canvas.getContext('2d');
    //     this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    //     this.ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    //   };
    // },
    startResizing(event) {
      if (event.offsetX > this.drawerWidth - 10) {
        this.isResizing = true;
        window.addEventListener('mousemove', this.resizeDrawer);
        window.addEventListener('mouseup', this.stopResizing);
      }
    },
    resizeDrawer(event) {
      if (this.isResizing) {
        const newWidth = event.clientX;
        this.drawerWidth = Math.min(Math.max(newWidth, 200), 600);
      }
    },
    stopResizing() {
      this.isResizing = false;
      window.removeEventListener('mousemove', this.resizeDrawer);
      window.removeEventListener('mouseup', this.stopResizing);
    }
  }
}

Vue.createApp(app).mount("#app")