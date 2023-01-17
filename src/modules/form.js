export default class Form {
    constructor(list, domElements) {
        this.myList = list;

        this.addInput = document.querySelector(`#${domElements.newTaskInput}`);
        this.addIcon = document.querySelector(`#${domElements.newTaskIcon}`);

        this.addInput.addEventListener('keypress', this.addEvent.bind(this));
        this.addIcon.addEventListener('click', this.addEvent.bind(this));
    }

    addEvent(event) {
        if (event.key === "Enter" || event.type == 'click') {
            this.myList.addTask(this.addInput.value);
            this.addInput.value = '';
        }
    }
}