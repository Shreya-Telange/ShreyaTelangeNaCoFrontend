document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tab");
    const contents = document.querySelectorAll(".tab-content");
  
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove("active"));
  
        // Hide all content boxes
        contents.forEach(c => (c.style.display = "none"));
  
        // Activate clicked tab
        tab.classList.add("active");
  
        // Show matching content
        const targetId = tab.getAttribute("data-tab");
        const targetBox = document.getElementById(targetId);
        if (targetBox) {
          targetBox.style.display = "block";
        }
      });
    });
  });
  
