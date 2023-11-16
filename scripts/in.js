$(function(){
    $("#header").load("../header.html", function() {
        $('.header-burger').click(function(event) {
            $('.header-nav').toggleClass('open-burger');
        });
    });
    $("#footer").load("../footer.html");
});

let cnt = 0;

let tasks = [
    //{name: "Залить лабу на гит"},
    //{name: "Проверить github pages"}
];

let completed = []

function removeElementById(arr, id) {
    let res;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
            res = arr.splice(i, 1);
            break;
        }
    }
    return res;
}

function del(x, id) {
    let completed_task = removeElementById(tasks, id);
    completed.push({name: completed_task[0].name, id: "c" + completed_task[0].id});
    x.parentElement.remove()
    toLocalStorage();
    toLocalStorageCompl();
    load()
}

function redo(x, id) {
    let redo_task = removeElementById(completed, id);
    tasks.push({name: redo_task[0].name, id: cnt})
    cnt += 1
    x.parentElement.remove()
    loadCompl()
    toLocalStorageCompl()
}

function load() {
    let task_class = document.querySelector(".task-items");
    task_class.innerHTML = ""
    for (task in tasks) {
        let task_id = tasks[task].id;
        task_class.innerHTML = `
                <div class="task__item" id="${task_id}">
                    <!---<input type="checkbox" onclick="this.parentElement.remove()" class="task-checkbox"/>--->
                    <input type="checkbox" onclick="del(this, ${task_id})" class="task-checkbox"/>
                    <div class="task-item__text">
                        <span>${tasks[task].name}</span>
                    </div>
                </div>` + task_class.innerHTML;
    }
    for (compl in completed) {
        let compl_id = completed[compl].id;
        console.log("AAAAAAAAAAAAAA", compl_id)
        task_class.innerHTML += `
                <div class="task__item__completed" id="${compl_id}" style="display: none">
                    <input type="checkbox" checked="checked" onclick="redo(this, ${compl_id}.id)" class="task-checkbox"/>
                    <div class="task-item__text_completed">
                        <span>${completed[compl].name}</span>
                    </div>
                </div>`;
    }
}

function loadCompl() {
    let task_class = document.querySelector(".task-items");
    task_class.innerHTML = ""
    for (task in tasks) {
        let task_id = tasks[task].id;
        task_class.innerHTML = `
                <div class="task__item" id="${task_id}"  style="display: none">
                    <input type="checkbox" onclick="del(this, ${task_id})" class="task-checkbox"/>
                    <div class="task-item__text">
                        <span>${tasks[task].name}</span>
                    </div>
                </div>` + task_class.innerHTML;
    }
    for (compl in completed) {
        let compl_id = completed[compl].id;
        task_class.innerHTML += `
                <div class="task__item__completed" id="${compl_id}">
                    <input type="checkbox" checked="checked" onclick="redo(this, ${compl_id}.id)" class="task-checkbox"/>
                    <div class="task-item__text_completed">
                        <span>${completed[compl].name}</span>
                    </div>
                </div>`;
    }
}

function addTask() {
    // tasks.length
    tasks.push({name: document.querySelector(".task-choice__input").value, id: cnt});
    cnt += 1
    document.querySelector(".task-choice__input").value = ""
    load();
    toLocalStorage();
}

$(document).on('click', '#sub', function(){
    addTask()
});

$(document).on('keydown', '.task-choice__input', function(e){
    console.log(e.key)
    if (e.key === "Enter") {
        addTask()
    }
});

function toLocalStorage() {
    let stor = JSON.stringify(tasks);
    let storCnt = JSON.stringify(cnt);
    localStorage.setItem("cnt", storCnt);
    localStorage.setItem("cur-tasks", stor);
}

function toLocalStorageCompl() {
    let compl = JSON.stringify(completed);
    localStorage.setItem("prev-tasks", compl);
}

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("cur-tasks")) {
        tasks = JSON.parse(localStorage.getItem("cur-tasks"));
    } else {
        toLocalStorage()
    }

    if (localStorage.getItem("prev-tasks")) {
        completed = JSON.parse(localStorage.getItem("prev-tasks"));
    } else {
        toLocalStorageCompl()
    }

    cnt = JSON.parse(localStorage.getItem("cnt"))
    console.log("cnttttt", cnt)
    load();
})

function deleteAll() {
    console.log("Deleted all tasks: cur and completed")
    localStorage.clear()
    tasks = []
    completed = []
    cnt = 0
    load()
}

let state = "active"
function changeState(elementId) {
    if (state === "active") {
        state = "complete"
        for(task in tasks) {
            console.log("id ====", task);
            document.getElementById(tasks[task].id).style.display = "none";
        }
        for(compl in completed) {
            console.log("cid ====", compl);
            document.getElementById(completed[compl].id).style.display = "";
        }
    } else {
        state = "active"
        for(task in tasks) {
            console.log("id ====", task);
            document.getElementById(tasks[task].id).style.display = "";
        }
        for(compl in completed) {
            console.log("cid ====", compl);
            document.getElementById(completed[compl].id).style.display = "none";
        }
    }
}