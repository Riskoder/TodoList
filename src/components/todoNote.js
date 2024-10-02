import { createDeleteButton } from './Buttons';

export function createTodoHeader(folder) {
  const header = document.createElement('header');
  header.classList.add('flex', 'header');

  header.innerHTML = `
    <h2 class="header-title">${folder.title}</h2>
    <p class="grey header-description">
      ${folder.description}
    </p>
  `;

  return header;
}

export function createTodoNotes(folder, section) {
  folder.notes.forEach((note, noteIndex) => {
    const article = document.createElement('article');
    article.classList.add('todo', `${note.priority}`);

    const deleteBtn = createDeleteButton();
    deleteBtn.addEventListener('click', () => {
      folder.deleteNote(noteIndex);
      renderNotes(note, noteIndex);
    });

    article.innerHTML = `
    <div class="left">
      <input id="input-${noteIndex}" type="checkbox" />
      <span class="todo-title">${note.title}</span>
      <span class="todo-desc grey">
        ${note.desc}
      </span>
    </div>
    <div class="right">
      <span class="todo-date">${note.date}</span>
    </div>
    `;

    article.querySelector('right').appendChild(deleteBtn);

    section.appendChild(article);
  });
}

export function createSection() {
  const section = document.createElement('section');
  section.classList.add('todo-notes', 'flex');

  return section;
}
