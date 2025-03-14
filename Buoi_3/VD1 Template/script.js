var toDoList = new Array();
var taskList = document.getElementById("taskList");
var taskInput = document.getElementById("taskInput");
var addBtn = document.getElementById("addBtn");
console.log(typeof(toDoList))
addBtn.onclick = () => {
    toDoList.push( new Array( taskInput.value, false));
    taskList.innerHTML = "";
    toDoList.forEach (function(value) {
        var newChildContent = document.createElement("li");
        newChildContent.innerHTML = value[0];
        taskList.appendChild(newChildContent);
    })
}