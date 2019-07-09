$(onReady);

function addTask() {
    //create item to send
    let newTask = {
        task: $('#taskIn').val(),
        duedate: $('#dueDateIn').val(),
        priority: $('#priorityIn').val(),
        complete: false
    }
    //ajax POST request
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: newTask
    }).then(function(response) {
        //call getTaskList to refresh
        getTaskList();
    }).catch(function(error) {
        console.log('error at client POST /tasks:', error);
    }) //end ajax POST
    //clear inputs and set focus back on first field
    $('#addTaskArea input').val('');
    $('#addTaskArea select').val('1');
    $('#taskIn').focus();
} //end addTask

function deleteTask() {
    //source row id into url
    let deleteUrl = '/tasks/' + $(this).data('id');
    //ajax DELETE request
    $.ajax({
        method: 'DELETE',
        url: deleteUrl
    }).then(function(response) {
        //call getTaskList to refresh
        getTaskList();
    }).catch(function(error) {
        console.log(`error at client DELETE ${deleteUrl}:`, error);
    }) //end ajax DELETE
} //end deleteTask

function getTaskList() {
    //ajax GET request
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function(response) {
        //call printTaskList
        printTaskList(response);
    }).catch(function(error) {
        console.log('error at client GET /tasks:', error);
    }) //end ajax GET
} //end getTaskList

function markTaskComplete() {
    //source row id into url
    let updateUrl = '/tasks/' + $(this).data('id');
    //ajax PUT request
    $.ajax({
        method: 'PUT',
        url: updateUrl
    }).then(function(response) {
        //call getTaskList to refresh
        getTaskList();
    }).catch(function(error) {
        console.log(`error at client PUT ${updateUrl}`, error);
    }) //end ajax PUT
} //end markTaskComplete

function markTaskIncomplete() {
    //source row id into url
    let updateUrl = '/tasks/unmark/' + $(this).data('id');
    //ajax PUT request
    $.ajax({
        method: 'PUT',
        url: updateUrl
    }).then(function (response) {
        //call getTaskList to refresh
        getTaskList();
    }).catch(function (error) {
        console.log(`error at client PUT ${updateUrl}`, error);
    }) //end ajax PUT
} //end markTaskIncomplete

function onReady() {
    //activate buttons
    $('#addBtn').on('click', addTask);
    $('#taskListTableBody').on('click', '.delBtn', deleteTask);
    $('#taskListTableBody').on('change', '.uncheckedBox', markTaskComplete);
    $('#taskListTableBody').on('change', '.checkedBox', markTaskIncomplete);
    //call getTaskList
    getTaskList();
} //end onReady

function printTaskList(taskList) {
    //empty target area
    $('#taskListTableBody').empty();
    //loop through list
    for (let task of taskList) {
        //determine classes to include
        let classC = 'unchecked';
        if (task.complete) {
            classC = 'checked';
        }
        let classP = 'priority1';
        if (task.priority === 2) {
            classP = 'priority2';
        } else if (task.priority === 3) {
            classP = 'priority3';
        }
        //append each row with sourced classes
        $('#taskListTableBody').append(`<tr class="${classC}Row ${classP}">
            <td>${task.task}</td>
            <td>${task.duedate.substring(0, 10)}</td>
            <td>${task.priority}</td>
            <td><input type="checkbox" ${classC} class="${classC}Box" data-id="${task.id}"></td>
            <td><button class="delBtn btn btn-danger" data-id="${task.id}">Delete</button></td>
            </tr>`) //end append
    } //end loop
} //end printTaskList