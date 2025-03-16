// Select Elements
const taskInput = document.getElementById("taskInput");
const todoList = document.getElementById("todoList");
const completedList = document.getElementById("completedList");
const moveRightBtn = document.getElementById("moveRightBtn");
const moveLeftBtn = document.getElementById("moveLeftBtn");
const toast = document.getElementById("toast"); // Toast element
let selectedTask = null;
let undoTimeout = null; // Store timeout ID for undo action
let lastDeletedTask = null; // Store deleted task
let lastDeletedParent = null; // Store where the task was deleted from

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
    li.onclick = () => selectTask(li);


    //Pencil icon
    let editBtn = document.createElement("button");
    editBtn.innerHTML = "&#9998;"; 
    editBtn.style.border = "none";
    editBtn.style.background = "transparent";
    editBtn.style.cursor = "pointer";
    editBtn.style.marginLeft = "10px";
    editBtn.style.color = "#333";  
    editBtn.style.fontSize = "16px";
    editBtn.onclick = (e) => {
        e.stopPropagation(); 
        editTask(li);
    };
    
    li.appendChild(editBtn);
    
    todoList.appendChild(li);
    taskInput.value = "";

    showToast("New Item Added!", "green");
}

// Select Task
function selectTask(task) {
    if (selectedTask) {
        selectedTask.classList.remove("selected");
    }
    selectedTask = task;
    selectedTask.classList.add("selected");
}

// Move Up (Send to To-Do List on Small Screens, Move Right on Large Screens)
function moveRight() {
    if (!selectedTask) {
        showToast("Select an item first!", "blue");
        return;
    }

    if (window.innerWidth <= 768) {
        // Move task to the To-Do List (Small Screens)
        if (selectedTask.parentNode !== todoList) {
            todoList.appendChild(selectedTask);
            showToast("Item moved to To-Do List", "green");
        } else {
            showToast("Already in To-Do List!", "blue");
        }
    } else {
        // Move task to Completed List (Large Screens)
        if (selectedTask.parentNode !== completedList) {
            completedList.appendChild(selectedTask);
            showToast("Item moved to completed list", "green");
        }
    }

    selectedTask.classList.remove("selected");
    selectedTask = null;
}

// Move Down (Send to Completed List on Small Screens, Move Left on Large Screens)
function moveLeft() {
    if (!selectedTask) {
        showToast("Select an item first!", "blue");
        return;
    }

    if (window.innerWidth <= 768) {
        //  Move task to the Completed List (Small Screens)
        if (selectedTask.parentNode !== completedList) {
            completedList.appendChild(selectedTask);
            showToast("Item moved to Completed List", "orange");
        } else {
            showToast("Already in Completed List!", "blue");
        }
    } else {
        //  Move task back to To-Do List (Large Screens)
        if (selectedTask.parentNode !== todoList) {
            todoList.appendChild(selectedTask);
            showToast("Item moved back to To-Do list", "orange");
        }
    }

    selectedTask.classList.remove("selected");
    selectedTask = null;
}

// Remove Task (with Undo Option)
function removeSelected() {
    if (!selectedTask) {
        showToast("Select an item first!", "blue");
        return;
    }

    lastDeletedTask = selectedTask;
    lastDeletedParent = selectedTask.parentNode; // Store where the task was deleted from
    selectedTask.remove();
    selectedTask = null;

    // Show toast with Undo option
    showToast("Item removed!", "red", undoRemove);
}

// Undo Remove
function undoRemove() {
    if (lastDeletedTask && lastDeletedParent) {
        lastDeletedParent.appendChild(lastDeletedTask);
        showToast("Undo successful!", "green");
        lastDeletedTask = null;
        lastDeletedParent = null;
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
