// Select Elements
const taskInput = document.getElementById("taskInput");
const todoList = document.getElementById("todoList");
const completedList = document.getElementById("completedList");
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

// Move Right (To Completed List)
function moveRight() {
    if (!selectedTask) {
        showToast("Select an item first!", "blue");
        return;
    }
    completedList.appendChild(selectedTask);
    selectedTask.classList.remove("selected");
    selectedTask = null;
    showToast("Item moved to completed list", "green");
}

// Move Left (Back to To-Do List)
function moveLeft() {
    if (!selectedTask) {
        showToast("Select an item first!", "blue");
        return;
    }
    todoList.appendChild(selectedTask);
    selectedTask.classList.remove("selected");
    selectedTask = null;
    showToast("Item moved back to To-Do list", "orange");
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
