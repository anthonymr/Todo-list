import TodoList from './modules/todoList.js';
import './style.css';
import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';

window.onload = () => {
  const myList = new TodoList('ul');

  myList.addTask('wash the dishes');
  myList.addTask('complete To Do list project');
};