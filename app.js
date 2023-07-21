function fillPixel(event) {
  const pixel = event.target;
  pixel.style.background = 'black';
}

function changeCanvasResolution(event){
  const resolution = +prompt('Please input canvas width resolution');
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