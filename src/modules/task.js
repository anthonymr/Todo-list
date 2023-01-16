export default class Task {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }

  draw(){
    const li = document.createElement('li');
    li.classList.add('box');

    const chk = document.createElement('input');
    chk.setAttribute('type', 'checkbox'); 
    chk.checked = this.completed;

    const span = document.createElement('span');
    span.innerHTML = this.description;

    const icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-ellipsis-vertical');

    li.appendChild(chk);
    li.appendChild(span);
    li.appendChild(icon);

    return li;
  }
}