// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Image upload functionality
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const imagePreview = document.getElementById('imagePreview');
const removeImageBtn = document.getElementById('removeImage');

// Click to upload
uploadArea.addEventListener('click', (e) => {
    if (e.target !== removeImageBtn) {
        fileInput.click();
    }
});

// Drag and drop functionality
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFileUpload(files[0]);
    }
});

// File input change
fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFileUpload(e.target.files[0]);
    }
});

// Handle file upload + API call
async function handleFileUpload(file) {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
        alert('Please upload a valid image file (JPEG, JPG, PNG, WebP)');
        return;
    }
    if (file.size > 40 * 1024 * 1024) {
        alert('File size must be less than 40MB');
        return;
    }

    // Show preview before upload
    const reader = new FileReader();
    reader.onload = function(e) {
        imagePreview.src = e.target.result;
        imagePreview.style.display = 'block';
        removeImageBtn.style.display = 'inline-block';
    };
    reader.readAsDataURL(file);

    // Send file to API
    try {
        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch("https://api.remove.bg/v1.0/removebg", {
  method: "POST",
  headers: {
    "X-Api-Key": "G3khqgezCxim36yyzbHtG7Ln"
  },
  body: formData
});


          if (!res.ok) throw new Error("API request failed");

// Show loading text (optional)
imagePreview.alt = "Processing... Please wait";

// Convert response to blob
const blob = await res.blob();
const url = URL.createObjectURL(blob);

// Replace preview with processed image
imagePreview.src = url;
imagePreview.style.display = "block";
imagePreview.alt = "Background removed";

// Add download button
let downloadBtn = document.getElementById("downloadBtn");
if (!downloadBtn) {
    downloadBtn = document.createElement("a");
    downloadBtn.id = "downloadBtn";
    downloadBtn.href = url;
    downloadBtn.download = "background-removed.png";
    downloadBtn.textContent = "⬇️ Download Image";
    downloadBtn.style.display = "inline-block";
    downloadBtn.style.marginTop = "1rem";
    downloadBtn.style.background = "#e63946";
    downloadBtn.style.color = "#fff";
    downloadBtn.style.padding = "10px 20px";
    downloadBtn.style.borderRadius = "6px";
    downloadBtn.style.textDecoration = "none";
    document.querySelector(".preview-container").appendChild(downloadBtn);
} else {
    downloadBtn.href = url;
}

// ✅ Always show remove button after processing
removeImageBtn.style.display = "inline-block";

} catch (err) {
    console.error(err);
    alert("❌ Failed to process image. Please try again.");

    // Reset UI on failure
    imagePreview.src = "";
    imagePreview.style.display = "none";
    removeImageBtn.style.display = "none";
    const downloadBtn = document.getElementById("downloadBtn");
    if (downloadBtn) downloadBtn.remove();
}
}

// Remove image
removeImageBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    imagePreview.src = "";
    imagePreview.style.display = "none";
    removeImageBtn.style.display = "none";
    fileInput.value = "";
    const downloadBtn = document.getElementById("downloadBtn");
    if (downloadBtn) downloadBtn.remove();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const hash = this.getAttribute('href');
        if (!hash || hash === '#' || hash.length < 2) return;
        e.preventDefault();
        const target = document.querySelector(hash);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
mobileMenu.addEventListener('click', () => {
    const isVisible = navLinks.style.display === 'flex';
    navLinks.style.display = isVisible ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '100%';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'white';
    navLinks.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    navLinks.style.padding = '1rem';
    mobileMenu.setAttribute('aria-expanded', !isVisible);
});

// Gallery hover effects
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Tool card loading animation
document.querySelector('.tool-card').addEventListener('click', function(e) {
    e.preventDefault();
    this.style.opacity = '0.7';
    this.innerHTML = '<h3>🔄 Loading Background Remover...</h3>';
    setTimeout(() => {
        window.location.href = 'background-remover.html';
    }, 1000);
});
