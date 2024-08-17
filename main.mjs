import { PerformanceCounter } from './performancecounter.mjs';

const svg = document.querySelector('#svg');
const rangeAnimationSpeed = document.querySelector('#animationSpeed');

const idSuffixes = ['ruleengine_proc.in'];
const performanceCounters = [];

let animating = false;

function init() {
  console.log('init');
  if (performanceCounters.length > 0) return;
  const svgDoc = svg.contentDocument;
  if (!svgDoc) {
    setTimeout(init, 100);
    return;
  }

  for (const idSuffix of idSuffixes) {
    performanceCounters.push(new PerformanceCounter(idSuffix, svgDoc));
  }

  clear();
}

svg.onload = function () {
  console.log('SVG loaded!');
  init();
};
// sometimes svg already loaded -> no onload call
setTimeout(init, 100);

rangeAnimationSpeed.addEventListener('change', () => {
  if (performanceCounters.length === 0)
    return;
  const val = parseInt(rangeAnimationSpeed.value);

  for (let i = 0; i < performanceCounters.length; i++) {
    performanceCounters[i].setValue(val * (i + 1));
  }

  if (val > 0) {
    if (!animating) {
      for (const performanceCounter of performanceCounters) {
        performanceCounter.showDot();
      }
      animating = true;
      animate();
    }
  }
  else {
    animating = false;
    clear();
  }
});

function clear() {
  for (const performanceCounter of performanceCounters) {
    performanceCounter.hideDot();
  }
}

function animate() {
  for (const performanceCounter of performanceCounters) {
    performanceCounter.animateStep();
  }

  if (animating)
    requestAnimationFrame(animate);
  else
    clear();
}