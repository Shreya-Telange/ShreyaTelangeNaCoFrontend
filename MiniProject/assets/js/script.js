// Select Elements
const taskInput = document.getElementById("taskInput");
const todoList = document.getElementById("todoList");
const completedList = document.getElementById("completedList");
const moveRightBtn = document.getElementById("moveRightBtn");
const moveLeftBtn = document.getElementById("moveLeftBtn");
let selectedTask = null;

// Function to Show Toast Messages
function showToast(message, color = "black") {
    let toast = document.getElementById("toast");
    toast.innerText = message;
    toast.style.backgroundColor = color;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
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

    // Add Edit Button
    let editBtn = document.createElement("button");
    editBtn.innerText = "✏ Edit";
    editBtn.onclick = (e) => {
        e.stopPropagation(); // Prevent selecting the task
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
        //  Move task to the To-Do List (Small Screens)
        if (selectedTask.parentNode !== todoList) {
            todoList.appendChild(selectedTask);
            showToast("Item moved to To-Do List", "green");
        } else {
            showToast("Already in To-Do List!", "blue");
        }
    } else {
        //  Move task to Completed List (Large Screens)
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

// Remove Task
function removeSelected() {
    if (!selectedTask) {
        showToast("Select an item first!", "blue");
        return;
    }
    selectedTask.remove();
    selectedTask = null;
    showToast("Item removed!", "red");
}

// Edit Task
function editTask(task) {
    let newTask = prompt("Edit Task:", task.childNodes[0].nodeValue.trim());
    if (newTask && newTask.trim() !== "") {
        task.childNodes[0].nodeValue = newTask.trim();
        showToast("Task Updated!", "blue");
    }
}
