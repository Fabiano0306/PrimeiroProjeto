let tasks = [];

function addTask() {
    const taskDescription = document.getElementById("taskDescription").value;
    if (taskDescription.trim() !== "") {
        const newTask = {
            description: taskDescription,
            completed: false,
            priority: false,
            dueDate: null,
            category: "General",
            reminder: false,
        };
        tasks.push(newTask);
        updateTaskList();
        updateStats();
        saveTasks();
        clearInput();
    } else {
        Swal.fire("Erro!", "Por favor, insira uma descrição para a tarefa.", "error");
    }
}

function clearInput() {
    document.getElementById("taskDescription").value = "";
}

function updateTaskList() {
    const taskListContainer = document.getElementById("taskList");
    taskListContainer.innerHTML = "";

    tasks.forEach((task, index) => {
        const taskElement = document.createElement("div");
        taskElement.className = `task ${task.completed ? "completed" : ""} ${task.priority ? "priority" : ""}`;
        taskElement.innerHTML = `
            <input type="checkbox" class="status-checkbox" id="status-${index}" ${task.completed ? "checked" : ""} onclick="toggleTaskStatus(${index})">
            <span>${task.description}</span>
            <div class="task-actions">
                <button class="priority-btn" onclick="setPriority(${index})">Prioridade</button>
                <button class="edit-btn" onclick="editTask(${index})">Editar</button>
                <button class="delete-btn" onclick="removeTask(${index})">Excluir</button>
            </div>
        `;
        taskListContainer.appendChild(taskElement);
    });
}

function toggleTaskStatus(index) {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStats();
    saveTasks();
}

function removeTask(index) {
    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTasks();
}

function editTask(index) {
    const newDescription = prompt("Editar Tarefa", tasks[index].description);
    if (newDescription !== null) {
        tasks[index].description = newDescription;
        updateTaskList();
        saveTasks();
    }
}

function setPriority(index) {
    tasks[index].priority = !tasks[index].priority;
    updateTaskList();
    updateStats();
    saveTasks();
}

function updateStats() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.completed).length;
    const incompleteTasks = totalTasks - completedTasks;

    document.getElementById("taskStats").innerHTML = `
        Total de Tarefas: ${totalTasks} |
        Concluídas: ${completedTasks} |
        Incompletas: ${incompleteTasks}
    `;
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        updateTaskList();
        updateStats();
    }
}

loadTasks();
