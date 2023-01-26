/**
 * @jest-environment jsdom
 */
/* eslint-disable no-unused-vars */
import TodoList from '../modules/todoList.js';
import Form from '../modules/form.js';

document.body.innerHTML = `
    <div> 
        <ul id="test-list"></ul> 
    </div>
    <div class="box"> 
        <input id="new_task_input" placeholder="Add to your list..." type="text"> 
        <i id="new_task_icon" class="fa-solid fa-arrow-turn-down fa-rotate-90 fa-2xs"></i>
    </div>
    <button class="box" id="clear_all_completed_tasks">
        <span>Clear all completed</span>
    </button>
  `;

const myList = new TodoList('#test-list');

const myForm = new Form(myList, {
  newTaskInput: 'new_task_input',
  newTaskIcon: 'new_task_icon',
  clearAllCompletedTasks: 'clear_all_completed_tasks',
});

const testEventStorage = new Map();

let testEventOutput = 0;

const testEvent = {
  dataTransfer: {
    setData: (key, value) => testEventStorage.set(key, value),
    getData: (key) => testEventStorage.get(key),
  },
  preventDefault: () => { testEventOutput = 1 },
};

describe('Optional requirements', () => {
  test('Add event must create new task', () => {
    const event = { key: 'Enter', type: 'click' };

    Form.addInput = { value: 'just a test' };
    Form.addEvent(event);

    expect(Form.list.tasks).toHaveLength(1);
  });

  test('Remove event must remove task', () => {
    Form.index = 1;
    Form.removeEvent();

    expect(Form.list.tasks).toHaveLength(0);
  });

  test('toggleCompleted event must change task complete status', () => {
    const event = { key: 'Enter', type: 'click' };

    Form.addInput = { value: 'just a test' };
    Form.addEvent(event);

    const toggleEvent = { currentTarget: { checked: true } };

    Form.list.tasks[0].completed = true;

    Form.toggleCompleted(toggleEvent);

    expect(Form.list.tasks[0].domCheck.checked).toBe(true);
  });

  test('toggleCompleted event must change task complete status', () => {
    const event = { key: 'Enter', type: 'click' };

    Form.addInput = { value: 'just a test 2' };
    Form.addEvent(event);

    const toggleEvent = { currentTarget: { checked: false } };

    Form.list.tasks[0].completed = false;

    Form.toggleCompleted(toggleEvent);

    expect(Form.list.tasks[0].domCheck.checked).toBe(false);
  });

  test('edit event must add .editing css class', () => {
    Form.editing = false;
    Form.domElement = Form.list.tasks[0].domElement;
    Form.domInput = Form.list.tasks[0].domInput;
    Form.domSpan = Form.list.tasks[0].domSpan;

    Form.editEvent();

    expect(Form.editing).toBe(true);
    expect(Form.list.tasks[0].domElement.classList.contains('editing')).toBe(true);
  });

  test('edit event must do nothing when already editing', () => {
    Form.editing = true;

    Form.editEvent();

    expect(Form.list.tasks[0].domElement.classList.contains('editing')).toBe(true);
  });

  test('dragTask must set index value', () => {
    Form.dragTask(testEvent);

    expect(testEvent.dataTransfer.getData('index')).toBe(1);
  });

  test('allowDropTask must prevent Default behavior', () => {
    Form.allowDropTask(testEvent);
    expect(testEventOutput).toBe(1);
  });

  test('dropTask must switch item index', () => {
    Form.index = 2;
    Form.dropTask(testEvent);
    expect(Form.list.tasks[0].description).toBe('just a test 2');
    expect(Form.list.tasks[1].description).toBe('just a test');
  });

  test('keypress enter event on task must remove editing css class', () => {
    Form.editing = false;
    Form.domElement = Form.list.tasks[0].domElement;
    Form.domInput = Form.list.tasks[0].domInput;
    Form.domSpan = Form.list.tasks[0].domSpan;

    Form.editEvent();

    expect(Form.list.tasks[0].domElement.classList.contains('editing')).toBe(true);
    Form.list.tasks[0].domInput.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
    expect(Form.list.tasks[0].domElement.classList.contains('editing')).toBe(false);
  });
});
