import TodoList from './modules/todoList.js';
import './style.css';
import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';

window.onload = () => {
  const myList = new TodoList('ul');

  myList.addTask('0');
  myList.addTask('1');
  myList.addTask('2');
  myList.addTask('3');
  myList.addTask('4');
  myList.addTask('5');
  myList.addTask('6');
  myList.addTask('7');
  myList.addTask('8');

  console.log(myList.sortedTasks());
};