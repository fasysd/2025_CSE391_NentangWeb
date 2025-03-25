var toDoList = new Map();
var taskList = document.getElementById("taskList");
var taskInput = document.getElementById("taskInput");
var addBtn = document.getElementById("addBtn");

var reloadList = () => {
    taskList.innerHTML = "";
    toDoList.forEach (function(value, key) {
        var newChild = document.createElement("li");
        var childContent = document.createElement("div");

        childContent.onclick = () => {
            value[1] = !value[1];
            reloadList();
        }
        childContent.innerHTML = value[0];
        childContent.style.color = value[1] ? "grey" : "red";

        var childDeleteButton = document.createElement("button");
        childDeleteButton.onclick = () => {
            toDoList.delete( key);
            console.log( "delete" + key);
            reloadList();
        }
        childDeleteButton.innerHTML = "Xóa";

        newChild.appendChild( childContent);
        newChild.appendChild( childDeleteButton);
        taskList.appendChild(newChild);
    })
}

addBtn.onclick = () => {
    toDoList.set( new Date().getTime(), new Array( taskInput.value, false));
    reloadList();
    // readTextFile( )
}

var saveTasksToLocalStorage = () => {
    var reader = new FileReader();
    reader.readAsDataURL("");
    var data = require( "./TasksToLocalStorage.json");
    console.log( data);
    console.log("---------------")
}
var loadTasksFromLocalStorage = () => {
    
}
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}