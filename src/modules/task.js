export default class Task {
  constructor(description, index, completed = false) {
    this.description = description;
    this.completed = completed;
    this.index = index;
    this.editing = false;
  }

  draw() {
    this.domElement = document.createElement('li');
    this.domElement.classList.add('box');

    this.domCheck = document.createElement('input');
    this.domCheck.setAttribute('type', 'checkbox');
    this.domCheck.checked = this.completed;

    this.domSpan = document.createElement('span');
    this.domSpan.classList.add('description');
    this.domSpan.innerHTML = this.description;

    this.domInput = document.createElement('input');
    this.domInput.type = 'text';

    this.domIcon = document.createElement('span');
    this.domIcon.classList.add('icon', 'move-icon');
    this.domIcon.innerHTML = '<i class="fa-solid fa-ellipsis-vertical">'

    this.domDeleteIcon = document.createElement('span');
    this.domDeleteIcon.classList.add('icon', 'delete-icon');
    this.domDeleteIcon.innerHTML = '<i class="fa-regular fa-trash-can">'

    this.domElement.appendChild(this.domCheck);
    this.domElement.appendChild(this.domSpan);
    this.domElement.appendChild(this.domInput);
    this.domElement.appendChild(this.domIcon);
    this.domElement.appendChild(this.domDeleteIcon);

    return this.domElement;
  }
}