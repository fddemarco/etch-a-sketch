const COLORS = [
  '#FF6F61',
  '#87CEEB',
  '#98FB98',
  '#E6E6FA',
  '#DAA520',
  '#DA70D6',
  '#008080',
  '#FFDAB9',
  '#6A5ACD',
  '#FF007F'
];

function getRandomColor(){
  const index = Math.floor(Math.random()*10);
  return COLORS[index];
}

function fillPixel(event) {
  const pixel = event.target;
  pixel.style.background = getRandomColor();
}

function changeCanvasResolution(event){
  const userInput = +prompt('Please input canvas width resolution');
  const resolution = Math.min(100, userInput);
  const canvas = document.querySelector('.canvas');
  cleanCanvas(canvas);
  drawCanvas(canvas, resolution);
}

function cleanCanvas(canvas){
  console.log(canvas);
  const pixels = canvas.querySelectorAll('.canvas-pixel');
  for (let pixel of pixels){
    canvas.removeChild(pixel);
  }
}

function drawCanvas(canvas, resolution){
  const pixelLength = `${16*16/resolution}px`;
  for (let i = 0; i < resolution*resolution; i++){
    const canvasPixel = document.createElement('div');
    canvasPixel.classList.add('canvas-pixel');

    canvasPixel.style.width = pixelLength;
    canvasPixel.style.height = pixelLength;

    canvas.appendChild(canvasPixel);
    canvasPixel.addEventListener('mouseover', fillPixel)
  }
}

const canvas = document.querySelector('.canvas');
drawCanvas(canvas, 16);

const canvasResolutionButton = document.querySelector('.canvas-resolution-button');
canvasResolutionButton.addEventListener('click', changeCanvasResolution);