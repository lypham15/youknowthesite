const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); 

let isDrawing = false;
let currentX, currentY;
let angle = 0;  

function getRandomSpiralMovement() {
    const radius = Math.random() * 50 + 20; 
    angle += Math.random() * 0.5; 

    const deltaX = radius * Math.cos(angle);
    const deltaY = radius * Math.sin(angle);

    return { deltaX, deltaY };
}

function drawRandomSpiral() {
    if (!isDrawing) return;

    const { deltaX, deltaY } = getRandomSpiralMovement();
    const newX = currentX + deltaX;
    const newY = currentY + deltaY;

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(currentX, currentY);
    ctx.lineTo(newX, newY);
    ctx.stroke();

    currentX = newX;
    currentY = newY;
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    currentX = e.clientX;
    currentY = e.clientY;

    randomDrawingInterval = setInterval(drawRandomSpiral, 50);
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    clearInterval(randomDrawingInterval); 
});

canvas.addEventListener('mouseleave', () => {
    isDrawing = false;
    clearInterval(randomDrawingInterval);
});

const trashBin = document.getElementById('trashBin');
trashBin.addEventListener('click', () => {
    alert("Too much sadness, cannot handle!"); 
});
