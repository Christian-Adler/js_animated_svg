const svg = document.querySelector('#svg');
const btn = document.querySelector('#btn');
let svgLoaded = false;
svg.onload = function () {
  console.log('SVG loaded!');
  svgLoaded = true;
}

btn.addEventListener('click', (/*e*/) => {
  if (!svgLoaded)
    return;
  const doc = svg.contentDocument;
  doc.querySelector('#textID').textContent = "some new value";
});