const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const trashBin = document.getElementById('trashBin');
const cameraIcon = document.getElementById('cameraIcon');
const galleryIcon = document.getElementById('galleryIcon');
const paletteIcon = document.getElementById('paletteIcon');
const colorOptions = document.getElementById('colorOptions');
const galleryOverlay = document.getElementById('galleryOverlay');
const closeGallery = document.getElementById('closeGallery');
const galleryImage = document.getElementById('galleryImage');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

let capturedImages = [];
let currentImageIndex = 0;
let isCanvasEmpty = true; 
let currentColor = '#000000'; 

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

paletteIcon.addEventListener('click', () => {
    colorOptions.style.display = colorOptions.style.display === 'none' ? 'block' : 'none';
});

colorOptions.addEventListener('click', (e) => {
    if (e.target.classList.contains('color-option')) {
        currentColor = e.target.getAttribute('data-color'); 
        colorOptions.style.display = 'none'; 
    }
});

canvas.addEventListener('mousedown', (e) => {
    isCanvasEmpty = false; 
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
});

canvas.addEventListener('mousemove', (e) => {
    if (e.buttons !== 1) return; 
    ctx.lineTo(e.clientX, e.clientY);
    ctx.strokeStyle = currentColor; 
    ctx.lineWidth = 2;
    ctx.stroke();
});

canvas.addEventListener('mouseup', () => {
    ctx.closePath();
});

trashBin.addEventListener('click', () => {
    if (isCanvasEmpty){
        alert("There is nothing on the canvas to trash!")
    } else{
        alert("Too much negative feelings, cannot handle!");
    }
});

cameraIcon.addEventListener('click', () => {
    if (isCanvasEmpty) {
        alert("There's nothing on the canvas to capture, yet! Try to put your pencil on the canvas.");
    } else {
        const imageUrl = canvas.toDataURL();
        capturedImages.push(imageUrl);
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        isCanvasEmpty = true; 
    }
});

galleryIcon.addEventListener('click', () => {
    if (capturedImages.length > 0) {
        currentImageIndex = 0;
        displayImage();
        galleryOverlay.style.display = 'flex';
    } else {
        alert("No images in the gallery for now, but you can do it!");
    }
});

closeGallery.addEventListener('click', () => {
    galleryOverlay.style.display = 'none';
});

function displayImage() {
    galleryImage.src = capturedImages[currentImageIndex];
}

nextButton.addEventListener('click', () => {
    if (currentImageIndex < capturedImages.length - 1) {
        currentImageIndex++;
        displayImage();
    } else {
        alert("This is your last masterpiece. You want to give it one more try?");
    }
});

prevButton.addEventListener('click', () => {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        displayImage();
    } else {
        alert("This is the first draft. The first isn't the best, is it?");
    }
});

galleryOverlay.style.display = 'none';


// let currentX, currentY;
// let angle = 0;  

// function getRandomSpiralMovement() {
//     const radius = Math.random() * 50 + 20; 
//     angle += Math.random() * 0.5; 

//     const deltaX = radius * Math.cos(angle);
//     const deltaY = radius * Math.sin(angle);

//     return { deltaX, deltaY };
// }

// function drawRandomSpiral() {
//     if (!isDrawing) return;

//     const { deltaX, deltaY } = getRandomSpiralMovement();
//     const newX = currentX + deltaX;
//     const newY = currentY + deltaY;

//     ctx.strokeStyle = 'black';
//     ctx.lineWidth = 2;
//     ctx.lineJoin = 'round';

//     ctx.beginPath();
//     ctx.moveTo(currentX, currentY);
//     ctx.lineTo(newX, newY);
//     ctx.stroke();

//     currentX = newX;
//     currentY = newY;
// }

// canvas.addEventListener('mousedown', (e) => {
//     isDrawing = true;
//     currentX = e.clientX;
//     currentY = e.clientY;

//     randomDrawingInterval = setInterval(drawRandomSpiral, 50);
// });

// canvas.addEventListener('mouseup', () => {
//     isDrawing = false;
//     clearInterval(randomDrawingInterval); 
// });

// canvas.addEventListener('mouseleave', () => {
//     isDrawing = false;
//     clearInterval(randomDrawingInterval);
// });

