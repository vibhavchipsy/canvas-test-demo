// Select the input fields, canvas, and context
var imageInput = document.getElementById("image-upload");
var textInput = document.getElementById("text-input");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Set fixed canvas size
const CANVAS_SIZE = 400;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// Global variables
var uploadedImg = null; // Store uploaded image
var backgroundImg = new Image(); // Store background image

// Load the background image
function loadBackgroundImage(src) {
    backgroundImg.src = src;
    backgroundImg.onload = function () {
        drawCanvas(); // Redraw when the background is loaded
    };
}

// Draw everything on the canvas
function drawCanvas() {
    clearCanvas();
    drawBackground();
    drawUploadedImage();
    drawText();
}

// Clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Draw the background image
function drawBackground() {
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
}

// Draw uploaded image if available
function drawUploadedImage() {
    if (!uploadedImg) return; // Skip if no image uploaded

    const imgSize = 150; // Fixed image size
    const xPos = (canvas.width - imgSize) / 2; // Center horizontally
    const yPos = (canvas.height - imgSize) / 2; // Center vertically
    const radius = imgSize / 2; // Half of image size (75px)

    ctx.save(); // Save current state
    ctx.beginPath();
    ctx.arc(xPos + radius, yPos + radius, radius, 0, Math.PI * 2); // Clip circle
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(uploadedImg, xPos, yPos, imgSize, imgSize);
    ctx.restore(); // Restore state to remove clipping
}

// Draw text from input field
function drawText() {
    var text = textInput.value.trim();
    if (!text) return; // Skip if no text entered

    ctx.fillStyle = "white"; // Text color
    ctx.font = "20px Arial"; // Font size and style
    ctx.textAlign = "center"; // Center the text
    ctx.fillText(text, canvas.width / 2, canvas.height - 50); // Position text at the bottom
}

// Handle image upload event
function handleImageUpload(event) {
    var file = event.target.files[0];
    if (!file) return; // Skip if no file selected

    var reader = new FileReader();
    reader.onload = function (e) {
        uploadedImg = new Image();
        uploadedImg.src = e.target.result;
        uploadedImg.onload = drawCanvas; // Redraw when image is loaded
    };
    reader.readAsDataURL(file);
}

// Handle text input event
function handleTextInput() {
    drawCanvas(); // Redraw canvas when text changes
}

// Attach event listeners
imageInput.addEventListener("change", handleImageUpload);
textInput.addEventListener("input", handleTextInput);

// Initialize with background image
loadBackgroundImage("./Subtract.png"); // Set your background image path
