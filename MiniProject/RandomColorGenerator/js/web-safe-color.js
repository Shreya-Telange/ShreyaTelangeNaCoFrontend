
  function displaySafeColors() {
    const safeValues = ["00", "33", "66", "99", "cc", "ff"];
    const container = document.querySelector(".button-container");

    // Remove old grid if any
    const oldGrid = document.getElementById("safeColorsGrid");
    if (oldGrid) oldGrid.remove();

    const grid = document.createElement("div");
    grid.id = "safeColorsGrid";
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(12, 1fr)";
    grid.style.gap = "5px";
    grid.style.marginTop = "20px";

    for (let r of safeValues) {
      for (let g of safeValues) {
        for (let b of safeValues) {
          const hex = `#${r}${g}${b}`;
          const colorBox = document.createElement("div");
          colorBox.style.backgroundColor = hex;
          colorBox.style.height = "40px";
          colorBox.style.color = "white";
          colorBox.style.display = "flex";
          colorBox.style.alignItems = "center";
          colorBox.style.justifyContent = "center";
          colorBox.style.fontSize = "12px";
          colorBox.style.borderRadius = "4px";
          colorBox.textContent = hex;
          grid.appendChild(colorBox);
        }
      }
    }

    container.appendChild(grid);
  }

  // Attach event listener to button
  document.querySelector(".btn").addEventListener("click", displaySafeColors);

  const hamburger = document.getElementById("hamburger");
  const navbar = document.getElementById("navbar");

  hamburger.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });
