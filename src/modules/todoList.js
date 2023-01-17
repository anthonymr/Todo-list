import Task from './task.js';
import Form from './form.js';

export default class TodoList {
  constructor(selector) {
    this.domList = document.querySelector(selector);
    this.tasks = [];
  }

  addTask(description, completed = false) {
    const newIndex = this.tasks.length + 1;
    const newTask = new Task(description, completed, newIndex);
    this.tasks.push(newTask);
    this.drawTable();
    Form.refreshTasksEvents();
  }

  removeTask(indexToRemove){
    let found = false;

    this.tasks.forEach((task, index) => {
      if(task.index === indexToRemove){
        this.tasks.splice(index, 1);
        found = true;
      }

      if(found && indexToRemove <= this.tasks.length){
        this.tasks[index].index--;
      }
    });
  }

  editTask(task) {
    if (task.domInput.value) {
      task.description = task.domInput.value
      task.domSpan.innerHTML = task.description;
      task.domInput.value = '';
    }

    task.domElement.classList.remove('editing');
    task.editing = false;
  }

  sortedTasks() {
    return this.tasks.sort((a, b) => a.index - b.index);
  }

  drawTable() {
    this.domList.innerHTML = '';
    this.sortedTasks().forEach((task) => {
      const domTask = task.draw();
      this.domList.appendChild(domTask);
    });
  }
}