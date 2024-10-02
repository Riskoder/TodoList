import deleteIcon from '../assets/icons/delete.svg';
import addIcon from '../assets/icons/add.svg';

export function createFormButtons() {
  const buttonContainer = document.createElement('div');

  buttonContainer.innerHTML = `
    <button type="submit" class="add-btn btn">Add</button>
    <button type="button" class="cancel-btn btn">Cancel</button>
  `;

  return buttonContainer;
}

export function createDeleteButton() {
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-btn', 'right');

  deleteButton.innerHTML = deleteIcon;

  return deleteButton;
}

export function createAddButton() {
  const button = document.createElement('button');
  button.classList.add('btn');

  button.innerHTML = addIcon;

  return button;
}

export function createAddTodoBtn() {
  const button = document.createElement('button');
  button.classList.add('add-todo', 'btn', 'hover', 'add-folder');

  button.innerHTML = addIcon;

  return button;
}
