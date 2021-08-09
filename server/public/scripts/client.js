$(document).ready(onReady);



function onReady(){
    console.log('JS Sourced');
    $('#submit-task').on('click', addTask);
    getTask();
    $('#taskToTableBody').on('click', '.deleteBtn', deleteTheTask);
    $('#taskToTableBody').on('click', '.completeBtn', Complete, );
    

};


function addTask() {
    let task = {
    task:$(`#task`).val(),
    is_complete: false ///whatever is here change DB 
    }   
    $.ajax({
      type: 'POST',
      url: '/task',
      data: task,
      }).then(function(response) {
        console.log('Response from server.', response);
        getTask()
        $('#task').val('');
    });
    
  
  }

   function deleteTheTask(){
     //console.log($(this));
     let taskId = $(this).closest('tr').data('id')
     $.ajax({
         type: 'DELETE',
         url: `/task/${taskId}`,
     }).then(function(res){
         getTask();
     })
   }

  function getTask(){
    $.ajax({
        type: 'GET',
        url: '/task'
      }).then(function(res) {
        console.log(res);
        renderTask(res);
      
        })
    }  

  
  function Complete(){
    console.log('complete', $(this));
    let tr = $(this).closest('tr');
    console.log('tr', tr);
    let id = tr.data('id');
    console.log('datarow', id);
 
    
    $.ajax({
        method: 'PUT',
        url: `/task/${id}`, //POSSIBLE BUGGGGGGG!!!
    }).then((res) => {
        console.log('PUT Task', res);
        getTask();

    }).catch((err) => {
        console.log('PUT /Task error',err);
        alert('PUT TASKS FAILED')
    })
  }

  function renderTask(task) {
    $('#taskToTableBody').empty();
    for(let i = 0; i < task.length; i ++) {
      $(this).parents('tr').children('td').toggleClass('green');      
      let itemCssClass
      if (task[i].is_complete){
        itemCssClass ='green'
      }
      else{
        itemCssClass = '';
      }
      $('#taskToTableBody').append(`
        <tr data-id=${task[i].id} class="${itemCssClass}">
          <td>${task[i].task}</td>
          <td><button class= "deleteBtn">Delete</button></td>
          <td><button class= "completeBtn">Complete</button></td>       
          </tr>
      `);
    }
  }













