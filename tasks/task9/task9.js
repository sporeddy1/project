let taskStack = [];
function addTask() {
    let taskInput = document.getElementById("taskInput").value;
    if (taskInput) {
        taskStack.push(taskInput);
        document.getElementById("taskInput").value = "";
        updateDisplay();
    }
}
function undoTask() {
    if (taskStack.length > 0) {
        taskStack.pop();
        updateDisplay();
    }
}
function updateDisplay() {
    document.getElementById("taskDisplay").textContent = taskStack.join(",");
}
