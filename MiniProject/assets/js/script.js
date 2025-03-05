document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
    
    document.getElementById("addTask").addEventListener("click", addTask);
    document.getElementById("moveRight").addEventListener("click", () => moveTasks("todoList", "completedList"));
    document.getElementById("moveLeft").addEventListener("click", () => moveTasks("completedList", "todoList"));
    document.getElementById("removeSelected").addEventListener("click", removeSelected);
   
});

function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();

    if (taskText === "") {
        alert("Enter a task!");
        return;
    }

    let newTask = createTaskElement(taskText);
    document.getElementById("todoList").appendChild(newTask);  // Adds task at the BOTTOM of the list
    input.value = "";
    saveTasks();
}

function createTaskElement(text) {
    let li = document.createElement("li");
    li.textContent = text;
    li.addEventListener("click", () => li.classList.toggle("selected"));
    li.addEventListener("dblclick", () => editTask(li));
    return li;
}

function editTask(task) {
    let newText = prompt("Edit task:", task.textContent);
    if (newText) {
        task.textContent = newText;
        saveTasks();
    }
}

function moveTasks(fromId, toId) {
    let fromList = document.getElementById(fromId);
    let toList = document.getElementById(toId);
    let selectedTasks = fromList.querySelectorAll(".selected");

    if (selectedTasks.length === 0) {
        alert("Select a task first!");
        return;
    }

    selectedTasks.forEach(task => {
        task.classList.remove("selected");
        toList.appendChild(task);  // Moves tasks to the BOTTOM of the new list
    });

    saveTasks();
}

function removeSelected() {
    let selectedTasks = document.querySelectorAll(".selected");
    
    if (selectedTasks.length === 0) {
        alert("Select a task first!");
        return;
    }

    selectedTasks.forEach(task => task.remove());
    saveTasks();
}


function saveTasks() {
    localStorage.setItem("todoList", document.getElementById("todoList").innerHTML);
    localStorage.setItem("completedList", document.getElementById("completedList").innerHTML);
}

function loadTasks() {
    document.getElementById("todoList").innerHTML = localStorage.getItem("todoList") || "";
    document.getElementById("completedList").innerHTML = localStorage.getItem("completedList") || "";

    document.querySelectorAll("li").forEach(task => {
        task.addEventListener("click", () => task.classList.toggle("selected"));
        task.addEventListener("dblclick", () => editTask(task));
    });
}
