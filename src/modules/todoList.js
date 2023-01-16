import Task from "./task.js";

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

  sortedTasks() {
    return this.tasks.sort((a, b) => {
      return a.index - b.index;
    });
  }

  newIndex() {
    if (!this.tasks.length) {
      return 0;
    }

    const lastIndex = Math.max(...this.tasks.map(task => task.index));
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