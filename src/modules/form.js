export default class Form {
  constructor(list, domElements) {
    Form.list = list;

    this.addInput = document.querySelector(`#${domElements.newTaskInput}`);
    this.addIcon = document.querySelector(`#${domElements.newTaskIcon}`);

    this.addInput.addEventListener('keypress', Form.addEvent.bind(this));
    this.addIcon.addEventListener('click', Form.addEvent.bind(this));
  }

  static list;

  static refreshTasksEvents(){
    Form.list.tasks.forEach(task => {
        task.domElement.classList.remove('editing');
        task.editing = false;
        task.domElement.addEventListener('click', Form.editEvent.bind(task));
        task.domDeleteIcon.addEventListener('click', Form.removeEvent.bind(task));
    });
  }

  static removeEvent() {
    this.editing = false;
    Form.list.removeTask(this.index);
    Form.list.drawTable();
    Form.refreshTasksEvents();
  }

  static editEvent() {
    if(this.editing) {
        return;
    }

    this.domElement.classList.add('editing');
    this.domInput.value = this.domSpan.innerHTML;
    this.domInput.focus();
    this.editing = true;

    this.domInput.addEventListener('keypress', (event) => {
    if(event.key === 'Enter'){
        if(this.domInput.value){
            this.description = this.domInput.value
            this.domSpan.innerHTML = this.description;
            this.domInput.value = '';
        }

        this.domElement.classList.remove('editing');
        this.editing = false;
    }      
    })
  }

  static addEvent(event) {
    if (event.key === "Enter" || event.type == 'click') {
      Form.list.addTask(this.addInput.value);
      this.addInput.value = '';
    }
  }
}