$(document).ready(onReady);

function onReady(){
    console.log('JS Sourced');
    addClickHandler();
    refreshTask();

};

function addClickHandler() {
    // Get info to send to the server
   $('#submit-task').on('click', add);
   $('#taskToTableBody').on('click', '.deleteBtn', deleteTheTask);
    $('#taskToTableBody').on('click', '.completeBtn', markAsComplete)
}

function add(){
    console.log('Submit Btn Clicked', add);
    let task = {};
    task.task =$(`#task`)
    addTask(task);
}

function addTask(taskToAdd) {
    $.ajax({
      type: 'POST',
      url: '/task',
      data: taskToAdd,
      }).then(function(response) {
        console.log('Response from server.', response);
        refreshTask();
      }).catch(function(error) {
        console.log('Error in POST', error)
        alert('Unable to add Task at this time. Please try again later.');
      });
  }

  function deleteTheTask(){
    //console.log($(this));
    const taskId = $(this).closest('tr').data('id')
    $.ajax({
        type: 'DELETE',
        url: `/task/${taskId}`,
    }).then(function(res){
        refreshTask();
    })
  }

  function refreshTask(){
    $.ajax({
        type: 'GET',
        url: '/task'
      }).then(function(response) {
        console.log(response);
        renderTask(response);
      }).catch(function(error){
        console.log('error in GET', error);
        });
    }  //must complete

  
  function markAsComplete(){
    //console.log('read', $(this));
    let tr = $(this).parents('tr');
    //console.log('tr', tr);
    let id = tr.data('id');
    //console.log('datarow', id);
  
    $.ajax({
        method: 'PUT',
        url: `/task/${id}`,
        data: {}
    }).then((res) => {
      //console.log('PUT Task', res);
      refreshTask();
    }).catch((err) => {
      //console.log('PUT /Task error',err);
      alert('PUT TASKS FAILED')
    });
  }

  function renderTask(task) {
    $('#taskToTableBody').empty();
  
    for(let i = 0; i < task.length; i += 1) {
      let task = task[i];
      // For each book, append a new row to our table
      $('#taskToTableBody').append(`
        <tr data-id=${task.id}>
          <td>${task.task}</td>
          <td><button class= "deleteBtn">Delete</button></td>
          <td><button class= "completeBtn">Complete</button></td>
        </tr>
      `);
    }
  }













