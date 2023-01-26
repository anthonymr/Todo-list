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

describe('Testing To Do list: part 1', () => {
  test('Add one new item to the list', () => {
    myList.addTask('Test description');
    const list = document.querySelectorAll('#test-list li');
    expect(list).toHaveLength(1);
  });

  test('Remove one item to the list', () => {
    myList.removeTask(1);
    myList.drawTable();

    const list = document.querySelectorAll('#test-list li');
    expect(list).toHaveLength(0);
  });
});

describe('Testing To Do list: part 2', () => {
  test('Edit one item to the list', () => {
    myList.addTask('Test description');
    myList.tasks[0].domInput.value = 'New value';
    myList.editTask(myList.tasks[0]);

    expect(myList.tasks[0].description).toBe('New value');
  });
  test('Complete one item in the list', () => {
    myList.completeTask(myList.tasks[0]);

    expect(myList.tasks[0].completed).toBe(true);
  });

  test('Clear all completed item to the list', () => {
    myList.clearAllCompleted();

    const list = document.querySelectorAll('#test-list li');
    expect(list).toHaveLength(0);
  });
});

describe('Optional requirements', () => {
  test('Uncomplete one item in the list', () => {
    myList.addTask('Test description', true);

    myList.uncompleteTask(myList.tasks[0]);

    expect(myList.tasks[0].completed).toBe(false);
  });

  test('Switching item indexes in the list', () => {
    myList.addTask('Test description 2', true);
    myList.addTask('Test description 3', true);

    myList.switchIndexes(1, 4);

    expect(myList.tasks[0].description).toBe('Test description 2');
    expect(myList.tasks[2].description).toBe('Test description');
  });

  test('Edit item with empty string', () => {
    myList.tasks[0].domInput.value = '';

    myList.editTask(myList.tasks[0]);

    expect(myList.tasks[0].description).toBe('Test description 2');
  });

  test('Load items from local storage', () => {
    const myNewList = new TodoList('#test-list');

    myNewList.tasks = [];

    const myNewForm = new Form(myNewList, {
      newTaskInput: 'new_task_input',
      newTaskIcon: 'new_task_icon',
      clearAllCompletedTasks: 'clear_all_completed_tasks',
    });

    expect(myNewList.tasks).toHaveLength(3);
  });

  test('Load items from empty local storage', () => {
    myList.removeTask(1);
    myList.removeTask(1);
    myList.removeTask(1);
    myList.drawTable();

    const myNewList = new TodoList('#test-list');

    myNewList.tasks = [];

    const myNewForm = new Form(myNewList, {
      newTaskInput: 'new_task_input',
      newTaskIcon: 'new_task_icon',
      clearAllCompletedTasks: 'clear_all_completed_tasks',
    });

    expect(myNewList.tasks).toHaveLength(0);
  });
});