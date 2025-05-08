document.addEventListener("DOMContentLoaded", () => {
  populateCMYContent();
  populateDropdowns();
  displayRGBColor();
});

function colorizeCMYText(elementId, textParts) {
  const container = document.getElementById(elementId);
  container.innerHTML = "";

  textParts.forEach(part => {
    const span = document.createElement("span");
    span.textContent = part.text;
    if (part.color) {
      span.style.color = part.color;
      span.style.fontWeight = "bold";
    }
    container.appendChild(span);
  });
}

function populateCMYContent() {
  colorizeCMYText("cmyHeading1", [
    { text: "Cyan ", color: "cyan" },
    { text: "Magenta ", color: "magenta" },
    { text: "Yellow ", color: "gold" },
    { text: "( " },
    { text: "C", color: "cyan" },
    { text: " M", color: "magenta" },
    { text: " Y", color: "gold" },
    { text: " )" }
  ]);

  const cmyHeading2 = document.getElementById("cmyHeading2");
  if (cmyHeading2) {
    cmyHeading2.innerHTML = `
      <strong>Select 
        <span style="color:cyan;">C</span>
        <span style="color:magenta;">M</span>
        <span style="color:gold;">Y</span> values:
      </strong>
    `;
  }

  const cmyPara = document.getElementById("cmyPara");
  if (cmyPara) {
    cmyPara.innerHTML = `
      <p>
        <span style="color:cyan; font-weight:bold;">C</span>
        <span style="color:magenta; font-weight:bold;">M</span>
        <span style="color:yellow; font-weight:bold;">Y</span> is a 
        <em>subtractive reflected light color model</em> where each color is stored in <strong>one byte</strong>.
      </p>
      <p>
        All possible combinations of 
        <strong><span style="color:cyan;">Cyan</span>, 
          <span style="color:magenta;">Magenta</span>, 
          <span style="color:gold;">Yellow</span></strong> give 
          2<sup>24</sup> = 16,777,216 different colors.
      </p>
      <p>Starting with <strong>white</strong> color, to which different color <strong>inks</strong> are added to <strong>absorb (subtract)</strong> light that is reflected.</p>
    `;
  }
}

function populateDropdowns() {
  const cyan = document.getElementById("cyan");
  const magenta = document.getElementById("magenta");
  const yellow = document.getElementById("yellow");

  for (let i = 0; i <= 255; i++) {
    const option = `<option value="${i}">${i}</option>`;
    cyan.innerHTML += option;
    magenta.innerHTML += option;
    yellow.innerHTML += option;
  }

  cyan.value = 0;
  magenta.value = 0;
  yellow.value = 0;
}

function displayRGBColor() {
  const c = parseInt(document.getElementById("cyan").value);
  const m = parseInt(document.getElementById("magenta").value);
  const y = parseInt(document.getElementById("yellow").value);

  const cFloat = c / 255;
  const mFloat = m / 255;
  const yFloat = y / 255;

  const r = Math.round((1 - cFloat) * 255);
  const g = Math.round((1 - mFloat) * 255);
  const b = Math.round((1 - yFloat) * 255);

  document.getElementById("floatOutput").textContent = 
    `C: ${cFloat.toFixed(2)}, M: ${mFloat.toFixed(2)}, Y: ${yFloat.toFixed(2)}`;

  document.getElementById("hexOutput").textContent = 
    `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

  document.getElementById("colorBox").style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}
