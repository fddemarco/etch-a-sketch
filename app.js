const canvas = document.querySelector('.canvas');

for (let i = 0; i < 16*16; i++){
  const canvasPixel = document.createElement('div');
  canvasPixel.classList.add('canvas-pixel');
  canvas.appendChild(canvasPixel);
}
