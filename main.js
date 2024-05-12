const svg = document.querySelector('#svg');
const btnChangeText = document.querySelector('#btnChangeText');
const btnAnimate = document.querySelector('#btnAnimate');

let svgDoc = null;

let path = null;
let dot = null;

svg.onload = function () {
  console.log('SVG loaded!');
  svgDoc = svg.contentDocument;

  path = svgDoc.querySelector('#pathID');
  dot = svgDoc.querySelector('#dotID');

  clear();
}

btnChangeText.addEventListener('click', (/*e*/) => {
  if (!svgDoc)
    return;
  svgDoc.querySelector('#textID').textContent = "some new value";
});

let animating = false;
btnAnimate.addEventListener('click', (/*e*/) => {
  if (!svgDoc)
    return;

  animating = !animating;
  btnAnimate.innerText = animating ? 'Stop animation' : 'Start animation';

  if (animating) {
    fill();
    animate();
  }
});


function clear() {
  dot.style.fill = 'none';
}

function fill() {
  dot.style.fill = '#f00';
}

let step = 0;
const steps = 100;

function animate() {
  const len = path.getTotalLength();
  const pointOnPath = path.getPointAtLength(len / steps * step);
  dot.setAttribute('cx', pointOnPath.x);
  dot.setAttribute('cy', pointOnPath.y);
  step++;
  if (step > steps) step = 0; // reset

  if (animating)
    requestAnimationFrame(animate);
  else
    clear();
}