const svg = document.querySelector('#svg');
const btnChangeText = document.querySelector('#btnChangeText');
const btnAnimate = document.querySelector('#btnAnimate');
const rangeAnimationSpeed = document.querySelector('#animationSpeed');

let svgDoc = null;

let path = null;
let dot = null;

const maxSteps = 10000;
let stepWidth = 50;
let step = 0;

let animating = false;

svg.onload = function () {
  console.log('SVG loaded!');
  if (svgDoc) return;
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

rangeAnimationSpeed.addEventListener('change', () => {
  stepWidth = parseInt(rangeAnimationSpeed.value);
  step = 0;
});


function clear() {
  dot.style.fill = 'none';
}

function fill() {
  dot.style.fill = '#f00';
}


function animate() {
  console.log(step);
  const len = path.getTotalLength();
  const pointOnPath = path.getPointAtLength(len / maxSteps * step);
  dot.setAttribute('cx', pointOnPath.x);
  dot.setAttribute('cy', pointOnPath.y);
  step += stepWidth;
  if (step > maxSteps)
    step = 0; // reset

  if (animating)
    requestAnimationFrame(animate);
  else
    clear();
}