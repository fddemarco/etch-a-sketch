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

const SHADES = grayShades(10);

function grayShades(numberOfSteps){
  let shades = [];
  let step = 250 / numberOfSteps;
  for (let i = numberOfSteps; i >= 0 ; i--){
    const j = i * step;
    shades.push(`rgb(${j}, ${j}, ${j})`);
  }
  return shades;
}

function nextShade(shade){
  const index = SHADES.indexOf(shade);
  if (index == SHADES.length - 1) return shade;

  return SHADES[index + 1];
}

function getRandomColor(event){
  const index = Math.floor(Math.random()*10);
  const pixel = event.target;
  pixel.style.background =  COLORS[index];

}

function fillPixel(event) {
  const pixel = event.target;
  pixel.style.background = 'black';
}

function progressiveDarkening(event){
  const pixel = event.target;
  const currentShade = pixel.style.background;
  pixel.style.background = nextShade(currentShade);
}

function redrawCanvas(event){
  const classes = Array.from(event.target.classList);
  let resolution = 16;
  if (classes.includes('canvas-resolution-button')){
    const userInput = +prompt('Please input canvas width resolution');
    resolution = Math.min(100, userInput);
  }

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
    canvasPixel.style.background = SHADES[0];

    canvas.appendChild(canvasPixel);

    const colorPalette = document.querySelector('#color-palette').value;
    let callback = undefined;
    if (colorPalette == 'classic') {
      callback = fillPixel;
    }
    else if (colorPalette == 'random') {
      callback = getRandomColor;
    }
    else if (colorPalette == 'darkening'){
      callback = progressiveDarkening;
    }
    canvasPixel.addEventListener('mouseover', callback)
  }
}

const canvas = document.querySelector('.canvas');
drawCanvas(canvas, 16);

const canvasResolutionButton = document.querySelector('.canvas-resolution-button');
canvasResolutionButton.addEventListener('click', redrawCanvas);

const colorPalette = document.querySelector('#color-palette');
colorPalette.addEventListener('change', redrawCanvas);