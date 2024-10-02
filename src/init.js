import * as comp from './components/index.js';
import * as temp from './templates/index.js';
import { Folder } from './models/folderObj.js';
import { Todo } from './models/todoObj.js';
import { loadDataFromLocalStorage } from './storage/localStorage.js';

const projectSection = document.getElementById('folder-section');
const sectionList = document.getElementById('folder-list');
const main = document.getElementById('main-content');
let isActive = false;

export function initApp() {
  loadDataFromLocalStorage();

  if (Folder.getAll().length === 0) {
    createDefaultsProjects();
  }
  renderFolderLibrary();
  const createFolderBtn = document.getElementById('create-folder');
  createFolderBtn.addEventListener('click', () => {
    if (isActive) return;
    isActive = true;
    generateFolderForm();
  });
}

function renderFolder(folder, folderIndex) {
  const folderItem = temp.createFolderTemplate();

  folderItem.querySelector('.title').textContent = folder.title;
  folderItem.querySelector('.delete-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    removeFromFolderLibrary(folderIndex);
  });

  folderItem.addEventListener('click', (e) => {
    activeFolder(e);
    generateMainContent(folder);
  });

  sectionList.appendChild(folderItem);
}

function removeFromFolderLibrary(index) {
  Folder.deleteFolder(index);
  console.log(Folder.getAll());
  renderFolderLibrary();
  renderMain();
}

function addToFolderLibrary(folder) {
  Folder.addFolder(folder);
  console.log(Folder.getAll());
  renderFolder(folder, Folder.getAll().length - 1);
}

function renderFolderLibrary() {
  sectionList.textContent = '';
  Folder.getAll().forEach(renderFolder);
}

function activeFolder(event) {
  const itemList = document.querySelectorAll('.folder');

  itemList.forEach((folder) => folder.classList.remove('active'));
  event.target.classList.add('active');
}

export function generateFolderForm() {
  const form = temp.createForm();
  projectSection.appendChild(form);

  //No por ID ya que dara error de referencia seria Document

  const addButton = form.querySelector('.add-btn');
  addButton.addEventListener('click', (e) => {
    let folderTitle = form.querySelector('.input-title').value;
    let folderDesc = form.querySelector('.input-description').value;
    e.preventDefault();
    if (folderTitle === '') {
      for (let i = 1; i <= Folder.getAll().length + 1; i++) {
        folderTitle = `Untitled ${i}`;
      }
    }
    if (folderDesc === '') {
      folderDesc = '//';
    }
    const newFolder = new Folder(folderTitle, folderDesc);
    addToFolderLibrary(newFolder);
    form.querySelector('form').reset();
    projectSection.removeChild(form);
    isActive = false;
  });

  const cancelButton = form.querySelector('.cancel-btn');
  cancelButton.addEventListener('click', () => {
    projectSection.removeChild(form);
    isActive = false;
  });
}

//FOLDER CONTENT SECTION (TODOS ARTICLES)

function generateMainContent(folder) {
  renderMain();

  const header = comp.createTodoHeader(folder);
  const section = comp.createSection();

  main.appendChild(header);
  main.appendChild(section);

  const notes = folder.getNotes();
  if (notes.length > 0) {
    notes.forEach((note, index) => {
      renderSingleTodo(folder, note, index);
    });
  }

  const addTodoBtn = comp.createAddButton();
  main.appendChild(addTodoBtn);
  addTodoBtn.classList.add('add-todo', 'btn', 'hover', 'add-folder');

  addTodoBtn.addEventListener('click', () => {
    addTodoBtn.disabled = true;

    const todoForm = temp.createTodoFormTemplate();

    const todoTitle = todoForm.querySelector('.todo-form-title');
    const todoDate = todoForm.querySelector('.todo-form-date');
    const todoPriority = todoForm.querySelector('.todo-form-priority');
    const todoDescription = todoForm.querySelector('.todo-form-description');

    const addBtn = todoForm.querySelector('.add-btn');
    addBtn.addEventListener('click', function (e) {
      e.preventDefault();
      addTodoBtn.disabled = false;

      const todoObj = new Todo(
        todoTitle.value,
        todoDescription.value,
        todoDate.value,
        todoPriority.value
      );

      addNoteToFolder(folder, todoObj);
      section.removeChild(todoForm);
      addTodoBtn.disabled = false;
    });

    const cancelBtn = todoForm.querySelector('.cancel-btn');
    cancelBtn.addEventListener('click', () => {
      section.removeChild(todoForm);
    });

    section.appendChild(todoForm);
  });
}

function addNoteToFolder(folder, todoNote) {
  folder.addNote(todoNote);
  const lastIndex = folder.getNotes().length - 1;
  renderSingleTodo(folder, todoNote, lastIndex);
}

function renderSingleTodo(folder, note, noteIndex) {
  const section = document.querySelector('.todo-notes');

  const todoNote = temp.createTodoItemTemplate();
  todoNote.querySelector('.todo-title').textContent = note.title;
  todoNote.querySelector('.todo-desc').textContent = note.desc;
  todoNote.querySelector('.todo-date').textContent = note.date;
  todoNote.classList.add(`${note.priority}`);

  if (note.complete) {
    todoNote.classList.add('completed');
    todoNote.querySelector('.todo-check').checked = true;
  } else {
    todoNote.classList.remove('completed');
    todoNote.querySelector('.todo-check').checked = false;
  }

  todoNote.querySelector('.delete-btn').addEventListener('click', () => {
    folder.deleteNote(noteIndex);
    section.removeChild(todoNote);

    console.log(Folder.getAll());
  });

  console.log(Folder.getAll());
  section.appendChild(todoNote);
  todoNote.querySelector('.todo-check').addEventListener('input', () => {
    const check = note.toggleComplete();
    console.log(check);
    if (check) {
      todoNote.classList.add('completed');
    } else {
      todoNote.classList.remove('completed');
    }
  });
}

function renderMain() {
  main.textContent = '';
}

function createDefaultsProjects() {
  const myFolder = new Folder(
    'Implementaciones',
    'Features para integrar y/o elementos a mejorar del projecto'
  );

  const myTodos = [
    {
      title: 'Mejorar la Interfaz',
      desc: 'Darle otro estilo a las forms y los inputs',
      date: '',
      priority: 'low',
    },
    {
      title: 'Folder Item',
      desc: 'Mantener el estado de activo al momento de borrar otro elemento y no quitar su contenido',
      date: '',
      priority: 'medium',
    },
    {
      title: 'Mejorar La App',
      desc: 'Cambiar el estilo completo de la app',
      date: '',
      priority: 'high',
    },
    {
      title: 'Add Edite Option',
      desc: 'Agregar a los folder y las notes la opcion de poner editar su informacion',
      date: '',
      priority: 'high',
    },
  ];

  myTodos.forEach((note) => {
    const newTodo = new Todo(note.title, note.desc, note.date, note.priority);
    myFolder.addNote(newTodo);
  });

  addToFolderLibrary(myFolder);
}
