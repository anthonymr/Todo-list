export default class Form {
  constructor(list, domElements) {
    Form.myList = list;

    this.addInput = document.querySelector(`#${domElements.newTaskInput}`);
    this.addIcon = document.querySelector(`#${domElements.newTaskIcon}`);

    this.addInput.addEventListener('keypress', Form.addEvent.bind(this));
    this.addIcon.addEventListener('click', Form.addEvent.bind(this));
  }

  static myList;

  static refreshEditEvents(){
    Form.myList.tasks.forEach(task => {
        task.domElement.addEventListener('click', () => {
            if(task.editing) {
                return;
            }

            task.domElement.classList.add('editing');
            task.domInput.value = task.domSpan.innerHTML;
            task.domInput.focus();
            task.editing = true;

            task.domInput.addEventListener('keypress', (event) => {
            if(event.key === 'Enter'){
                if(task.domInput.value){
                    task.description = task.domInput.value
                    task.domSpan.innerHTML = task.description;
                    task.domInput.value = '';
                }

                task.domElement.classList.remove('editing');
                task.editing = false;
                console.log(Form.myList);
            }      
            })
        });
    });
  }

  static addEvent(event) {
    if (event.key === "Enter" || event.type == 'click') {
      Form.myList.addTask(this.addInput.value);
      this.addInput.value = '';
    }
  }
}