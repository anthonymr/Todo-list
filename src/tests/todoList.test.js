/**
 * @jest-environment jsdom
 */
import TodoList from "../modules/todoList";
import Form from "../modules/form";

document.body.innerHTML =
  `
    <div> 
        <ul id="test-list"></ul> 
    </div>
    <div class="box"> 
        <input id="new_task_input" placeholder="Add to your list..." type="text"> 
        <i id="new_task_icon" class="fa-solid fa-arrow-turn-down fa-rotate-90 fa-2xs"></i>
    </div>
    <button class="box" id="clear_all_completed_tasks">
        <span>Clear all completed</span>
    </button>
  `;

const myList = new TodoList('#test-list');

const myForm = new Form(myList, {
  newTaskInput: 'new_task_input',
  newTaskIcon: 'new_task_icon',
  clearAllCompletedTasks: 'clear_all_completed_tasks',
});
