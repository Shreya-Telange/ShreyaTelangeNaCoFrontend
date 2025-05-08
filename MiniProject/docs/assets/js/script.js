// Select Elements
const taskInput = document.getElementById("taskInput");
const todoList = document.getElementById("todoList");
const completedList = document.getElementById("completedList");
const moveRightBtn = document.getElementById("moveRightBtn");
const moveLeftBtn = document.getElementById("moveLeftBtn");
const toast = document.getElementById("toast"); // Toast element
let selectedTasks = new Set(); // Store multiple selected tasks
let undoTimeout = null; // Store timeout ID for undo action
let lastDeletedTasks = []; // Store deleted tasks with their original lists

// Function to Show Toast Messages (with Undo Button for Removal)
function showToast(message, color = "black", undoFunction = null) {
    toast.innerHTML = message;
    toast.style.backgroundColor = color;
    toast.classList.add("show");

    if (undoFunction) {
        let undoBtn = document.createElement("button");
        undoBtn.innerHTML = "Undo";
        undoBtn.style.marginLeft = "10px";
        undoBtn.style.color = "white";
        undoBtn.style.border = "none";
        undoBtn.style.background = "transparent";
        undoBtn.style.cursor = "pointer";
        undoBtn.onclick = () => {
            undoFunction();
            toast.classList.remove("show");
            clearTimeout(undoTimeout);
        };
        toast.appendChild(undoBtn);
    }

    undoTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 5000);
}

// Function to Update Button Text Based on Screen Size
function updateButtonText() {
    if (window.innerWidth <= 768) {
        moveRightBtn.textContent = "Move Up";
        moveLeftBtn.textContent = "Move Down";
    } else {
        moveRightBtn.textContent = "Move to Right >";
        moveLeftBtn.textContent = "< Move to Left";
    }
}

// Run function on load and on screen resize
updateButtonText();
window.addEventListener("resize", updateButtonText);

// Add Task (Fixed Duplicate Check)
function addTask() {
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        showToast("Task cannot be empty!", "red");
        return;
    }

    // Check for duplicates in both lists
    let allTasks = [...document.querySelectorAll("#todoList li, #completedList li")].map(li => li.childNodes[0].nodeValue.trim());

    if (allTasks.includes(taskText)) {
        showToast("Duplicate Item! Already exists.", "red");
        return;
    }

    // Create List Item
    let li = document.createElement("li");
    li.innerText = taskText;
    li.onclick = () => toggleSelectTask(li);

    // ✅ Add Pencil Icon for Editing
    let editBtn = document.createElement("button");
    editBtn.innerHTML = "&#9998;"; // Pencil Icon 📝
    editBtn.style.border = "none";
    editBtn.style.background = "transparent";
    editBtn.style.cursor = "pointer";
    editBtn.style.marginLeft = "10px";
    editBtn.style.color = "#333";  // ✅ Fix: Makes the pencil icon dark
    editBtn.style.fontSize = "16px"; // ✅ Fix: Adjusts icon size
    editBtn.onclick = (e) => {
        e.stopPropagation(); // Prevent selecting the task
        editTask(li);
    };

    li.appendChild(editBtn);
    todoList.appendChild(li);
    taskInput.value = "";

    showToast("New Item Added!", "green");
}

// Toggle Selection of a Task
function toggleSelectTask(task) {
    if (selectedTasks.has(task)) {
        selectedTasks.delete(task);
        task.classList.remove("selected");
    } else {
        selectedTasks.add(task);
        task.classList.add("selected");
    }
}

// Move Selected Tasks (Handles Move Right, Move Left, Move Up, Move Down)
function moveSelectedTasks(targetList, message) {
    if (selectedTasks.size === 0) {
        showToast("Select at least one item!", "blue");
        return;
    }

    selectedTasks.forEach(task => {
        targetList.appendChild(task);
        task.classList.remove("selected");
    });

    selectedTasks.clear();
    showToast(message, "green");
}

// Move Up (Send to To-Do List on Small Screens, Move Right on Large Screens)
function moveRight() {
    if (window.innerWidth <= 768) {
        moveSelectedTasks(todoList, "Items moved to To-Do List");
    } else {
        moveSelectedTasks(completedList, "Items moved to Completed List");
    }
}

// Move Down (Send to Completed List on Small Screens, Move Left on Large Screens)
function moveLeft() {
    if (window.innerWidth <= 768) {
        moveSelectedTasks(completedList, "Items moved to Completed List");
    } else {
        moveSelectedTasks(todoList, "Items moved back to To-Do List");
    }
}

// ✅ Fix: Remove Selected Tasks (with Undo Option)
function removeSelected() {
    if (selectedTasks.size === 0) {
        showToast("Select at least one item!", "blue");
        return;
    }

    lastDeletedTasks = [...selectedTasks].map(task => ({ 
        element: task, 
        parent: task.parentNode // ✅ Store the original list
    })); 

    lastDeletedTasks.forEach(({ element }) => element.remove());
    selectedTasks.clear();

    showToast("Items removed!", "red", undoRemove);
}

// ✅ Fix: Undo Remove (Restore items to their original lists)
function undoRemove() {
    if (lastDeletedTasks.length > 0) {
        lastDeletedTasks.forEach(({ element, parent }) => {
            parent.appendChild(element); // ✅ Restore to the correct original list
        });

        showToast("Undo successful!", "green");
        lastDeletedTasks = [];
    }
}

// Edit Task (Prevent Duplicates)
function editTask(task) {
    let newTask = prompt("Edit Task:", task.childNodes[0].nodeValue.trim());
    if (newTask && newTask.trim() !== "") {
        // Check for duplicates
        let allTasks = [...document.querySelectorAll("#todoList li, #completedList li")].map(li => li.childNodes[0].nodeValue.trim());
        if (allTasks.includes(newTask.trim())) {
            showToast("Duplicate Item! Already exists.", "red");
            return;
        }

        task.childNodes[0].nodeValue = newTask.trim();
        showToast("Task Updated!", "blue");
    }
}
