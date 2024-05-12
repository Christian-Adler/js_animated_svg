const maxSteps = 10000;
const minStepWidth = 0;
const maxStepWidth = 200;

class PerformanceCounter {
  constructor(idSuffix, svgContentDocument) {
    this.path = svgContentDocument.querySelector('#path_' + idSuffix);
    this.dot = svgContentDocument.querySelector('#dot_' + idSuffix);
    this.text = svgContentDocument.querySelector('#text_' + idSuffix);

    this.pathLen = this.path.getTotalLength();

    this.stepWidth = 0;
    this.step = 0;
  }

  setValue(val) {
    this.text.textContent = val + ' evt/s';
    this.stepWidth = Math.max(minStepWidth, Math.min(val, maxStepWidth));
    if (this.stepWidth === minStepWidth) {
      this.step = 0;
      this.hideDot();
    }
  }

  animateStep() {
    if (this.stepWidth === minStepWidth)
      return;
    const pointOnPath = this.path.getPointAtLength(this.pathLen / maxSteps * this.step);
    this.dot.setAttribute('cx', `${pointOnPath.x}`);
    this.dot.setAttribute('cy', `${pointOnPath.y}`);
    this.step += this.stepWidth;
    if (this.step > maxSteps)
      this.step = 0; // reset
  }

  #setDotOpacity(opacity) {
    this.dot.style.fillOpacity = `${opacity}`;
    this.dot.style.strokeOpacity = `${opacity}`;
  }

  hideDot() {
    this.#setDotOpacity(0);
  }

  showDot() {
    this.#setDotOpacity(1);
  }
}

export {PerformanceCounter};