import { createDeleteButton } from '../components';

export function createTodoItemTemplate() {
  const article = document.createElement('article');
  article.classList.add('todo');

  const deleteButton = createDeleteButton();

  article.innerHTML = `
  <div class="left">
    <input type="checkbox" class="todo-check"/>
    <span class="todo-title"></span>
    <span class="todo-desc grey">
    </span>
  </div>
  <div class="right">
    <span class="todo-date"></span>
  </div>
  `;

  article.querySelector('.right').appendChild(deleteButton);

  return article;
}