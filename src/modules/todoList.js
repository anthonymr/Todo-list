import Task from './task.js';

export default class TodoList {
  constructor(selector) {
    this.domList = document.querySelector(selector);
    this.tasks = [];
  }

  addTask(description, completed = false) {
    const newTask = new Task(description, completed, this.newIndex());
    this.tasks.push(newTask);
    this.drawTable();
  }

  removeTask(indexToRemove){

    let found = false;

    this.tasks.forEach((task, index) => {
      if(task.index === indexToRemove){
        this.tasks.splice(index, 1);
        found = true;
      }

      if(found && indexToRemove < this.tasks.length){
        this.tasks[index].index--;
      }
    });
  }

  sortedTasks() {
    return this.tasks.sort((a, b) => a.index - b.index);
  }

  newIndex() {
    if (!this.tasks.length) {
      return 0;
    }

    const lastIndex = Math.max(...this.tasks.map((task) => task.index));
    return lastIndex + 1;
  }

  drawTable() {
    this.domList.innerHTML = '';
    this.sortedTasks().forEach((task) => {
      const domTask = task.draw();
      this.domList.appendChild(domTask);
    });
  }
}