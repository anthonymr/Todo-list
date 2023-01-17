import TodoList from './modules/todoList.js';
import Form from './modules/form.js';
import './style.css';
import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';

window.onload = () => {
  const myList = new TodoList('ul');
  const myForm = new Form(myList, {
    newTaskInput: 'new_task_input',
    newTaskIcon: 'new_task_icon',
  });


  /*myList.addTask('0');
  myList.addTask('1');
  myList.addTask('2');
  myList.addTask('3');
  myList.addTask('4');
  myList.addTask('5');
  myList.addTask('6');
  myList.addTask('7');
  myList.addTask('8');

  myList.removeTask(3);
  myList.removeTask(1);
  myList.removeTask(0);
  myList.removeTask(2);

  myList.addTask('9');
  myList.addTask('10');*/
};