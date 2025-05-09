function colorizeRGBText(elementId, textParts) {
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
  
  function populateRGBContent() {
    // Heading 1: RGB (colored letters)
    colorizeRGBText("rgbHeading1", [
      { text: "RGB = " },
      { text: "R", color: "red" },
      { text: "G", color: "green" },
      { text: "B", color: "blue" },
    ]);
  
    // Heading 2: Select RGB values
    const rgbHeading2 = document.getElementById("rgbHeading2");
    rgbHeading2.innerHTML = `
      <strong>Select 
        <span style="color:red;">R</span>
        <span style="color:green;">G</span>
        <span style="color:blue;">B</span> values:
      </strong>
    `;
  
    // Description paragraph formatting
    const rgbPara = document.getElementById("rgbPara");
    rgbPara.innerHTML = `
      Starting with (<span style="color:red; font-weight:bold;">Red</span>, 
      <span style="color:green; font-weight:bold;">Green</span>, 
      <span style="color:blue; font-weight:bold;">Blue</span>) = 
      (<span style="color:red; font-weight:bold;">0</span>, 
      <span style="color:green; font-weight:bold;">0</span>, 
      <span style="color:blue; font-weight:bold;">0</span>) (black), 
      to which different color "lights" are added to produce visible colors.
    `;
  }
  
  function populateRGBDropdowns() {
    ["red", "green", "blue"].forEach(id => {
      const select = document.getElementById(id);
      select.innerHTML = "";
      for (let i = 0; i <= 255; i++) {
        const option = document.createElement("option");
        option.value = option.textContent = i;
        select.appendChild(option);
      }
    });
  }
  
  function displayRGBColor() {
    const red = parseInt(document.getElementById("red").value);
    const green = parseInt(document.getElementById("green").value);
    const blue = parseInt(document.getElementById("blue").value);
  
    const rFloat = (red / 255).toFixed(2);
    const gFloat = (green / 255).toFixed(2);
    const bFloat = (blue / 255).toFixed(2);
    const floatString = `(${rFloat},${gFloat},${bFloat})`;
  
    const toHex = (value) => value.toString(16).padStart(2, '0');
    const hex = `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
  
    document.getElementById("floatOutput").textContent = floatString;
    document.getElementById("hexOutput").textContent = hex;
    document.getElementById("colorBox").style.backgroundColor = hex;
  }
  
  window.onload = function () {
    populateRGBDropdowns();
    displayRGBColor(); // Display default
    document.getElementById("red").addEventListener("change", displayRGBColor);
    document.getElementById("green").addEventListener("change", displayRGBColor);
    document.getElementById("blue").addEventListener("change", displayRGBColor);
  };
  

  function generateRandomColors() {
    const container = document.getElementById("colorTableContainer");
    container.innerHTML = "";

    const table = document.createElement("table");
    table.innerHTML = `
      <thead>
        <tr>
          <th>RGB Float Values</th>
          <th>RGB Hexadecimal Values</th>
          <th>Display</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;

    const tbody = table.querySelector("tbody");

    for (let i = 0; i < 10; i++) {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);

      const rFloat = (r / 255).toFixed(2);
      const gFloat = (g / 255).toFixed(2);
      const bFloat = (b / 255).toFixed(2);

      const toHex = val => val.toString(16).padStart(2, '0');
      const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>(${rFloat}, ${gFloat}, ${bFloat})</td>
        <td>${hex}</td>
        <td>
          <div style="width: 60px; height: 30px; background-color: ${hex}; border: 1px solid #ccc; margin: 0 auto;"></div>
        </td>
      `;
      tbody.appendChild(row);
    }

    container.appendChild(table);
  }
  function toggleMenu() {
    const nav = document.getElementById("navLinks").querySelector("ul");
    nav.classList.toggle("show");
  }

  const hamburger = document.getElementById("hamburger");
  const navbar = document.getElementById("navbar");

  hamburger.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });