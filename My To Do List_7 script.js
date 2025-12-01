let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const clearAllBtn = document.getElementById("clearAll");
const taskCount = document.getElementById("taskCount");
const dateTimeElement = document.getElementById("currentDateTime");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = task.completed ? "task completed" : "task";
    li.textContent = task.text;

    // Toggle Complete on Click
    li.onclick = () => {
      task.completed = !task.completed;
      saveTasks();
      render();
    };

    // Delete Button
    const del = document.createElement("span");
    del.textContent = "X";
    del.className = "delete-btn";
    del.onclick = (e) => {
      e.stopPropagation();
      tasks = tasks.filter(t => t.id !== task.id);
      saveTasks();
      render();
    };

    li.appendChild(del);
    taskList.appendChild(li);
  });

  taskCount.textContent = `${tasks.filter(t => !t.completed).length} tasks remaining`;
}

addBtn.onclick = () => {
  if (input.value.trim() === "") return;

  const newTask = {
    id: Date.now(),
    text: input.value,
    completed: false,
    created: new Date()
  };

  tasks.push(newTask);
  input.value = "";
  saveTasks();
  render();
};

clearAllBtn.onclick = () => {
  tasks = [];
  saveTasks();
  render();
};

render();
function updateDateTime() {
  const now = new Date();
  dateTimeElement.textContent = `${now.toDateString()} ${now.toLocaleTimeString()}`;
}

// Call once to show immediately
updateDateTime();

// Optional: update every second
setInterval(updateDateTime, 1000);
