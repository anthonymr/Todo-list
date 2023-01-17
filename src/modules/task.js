export default class Task {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
    this.editing = false;
  }

  draw() {
    this.domElement = document.createElement('li');
    this.domElement.classList.add('box');
    this.domElement.id = `task_${this.index}`;

    this.domChk = document.createElement('input');
    this.domChk.setAttribute('type', 'checkbox');
    this.domChk.checked = this.completed;

    this.domSpan = document.createElement('span');
    this.domSpan.innerHTML = this.description;

    this.domInput = document.createElement('input');
    this.domInput.type = 'text';

    this.domIcon = document.createElement('i');
    this.domIcon.classList.add('fa-solid', 'fa-ellipsis-vertical');

    this.domElement.appendChild(this.domChk);
    this.domElement.appendChild(this.domSpan);
    this.domElement.appendChild(this.domInput);
    this.domElement.appendChild(this.domIcon);

    return this.domElement;
  }
}