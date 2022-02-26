var addButton = document.getElementById('addButton');
var addInput = document.getElementById('itemInput');
var todoList = document.getElementById('todoList');
var listArray = [];
//declare addToList function

function listItemObj(content, status) {
    this.content = '';
    this.status = 'incomplete';
}

// write datetime now
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
var hours = today.getHours();
var minutes = today.getMinutes();
var datetime = dd + "/" + mm + "/" + yyyy + " " + hours + ":" + minutes;



var changeToComp = function () {
    var parent = this.parentElement;
    console.log('Changed to complete');
    parent.className = 'uncompleted well';
    this.innerText = 'Incomplete';
    this.removeEventListener('click', changeToComp);
    this.addEventListener('click', changeToInComp);
    changeListArray(parent.firstChild.innerText, 'complete');

}

var changeToInComp = function () {
    var parent = this.parentElement;
    console.log('Changed to incomplete');
    parent.className = 'completed well';
    this.innerText = 'Complete';
    this.removeEventListener('click', changeToInComp);
    this.addEventListener('click', changeToComp);

    changeListArray(parent.firstChild.innerText, 'incomplete');

}

var removeItem = function () {
    var parent = this.parentElement.parentElement;
    parent.removeChild(this.parentElement);

    var data = this.parentElement.firstChild.innerText;
    for (var i = 0; i < listArray.length; i++) {

        if (listArray[i].content == data) {
            listArray.splice(i, 1);
            refreshLocal();
            break;
        }
    }


}

//function to change the todo list array
var changeListArray = function (data, status) {

    for (var i = 0; i < listArray.length; i++) {

        if (listArray[i].content == data) {
            listArray[i].status = status;
            refreshLocal();
            break;
        }
    }
}

//function to chage the dom of the list of todo list
var createItemDom = function (text, status) {

    var tableitem = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');


    tableitem.className = (status == 'incomplete') ? 'completed well' : 'uncompleted well';
    td1.innerText = text;
    td1.style = 'text-align:left';
    td2.innerText = (status == 'incomplete') ? 'Complete' : 'Incomplete';
    if (status == 'incomplete') {
        td2.addEventListener('click', changeToComp);
        td2.style = 'cursor:pointer;color:green;';
    } else {
        td2.addEventListener('click', changeToInComp);
        td2.style = 'cursor:pointer;color:yellow;';
    }
    td3.innerText = 'Delete';

    td3.addEventListener('click', removeItem);

    tableitem.appendChild(td1);
    tableitem.appendChild(td2);
    tableitem.appendChild(td3);

    return tableitem;
}

var refreshLocal = function () {
    var todos = listArray;
    localStorage.removeItem('todoList');
    localStorage.setItem('todoList', JSON.stringify(todos));
}

var addToList = function () {
    var newItem = new listItemObj();
    newItem.content = datetime + " " + addInput.value;
    listArray.push(newItem);
    //add to the local storage
    refreshLocal();
    //change the dom
    var item = createItemDom(datetime + " | " + addInput.value, 'incomplete');
    todoList.appendChild(item);
    addInput.value = '';
}

//function to clear todo list array
var clearList = function () {
    listArray = [];
    localStorage.removeItem('todoList');
    todoList.innerHTML = '';

}

window.onload = function () {
    var list = localStorage.getItem('todoList');

    if (list != null) {
        todos = JSON.parse(list);
        listArray = todos;

        for (var i = 0; i < listArray.length; i++) {
            var data = listArray[i].content;

            var item = createItemDom(data, listArray[i].status);
            todoList.appendChild(item);
        }

    }

};
//add an event binder to the button
addButton.addEventListener('click', addToList);
clearButton.addEventListener('click', clearList);