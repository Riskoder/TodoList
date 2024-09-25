import { createIcon, createButton } from './Buttons';
import { Folder } from '../storage';

const folderSection = document.getElementById('todo-projects-list');
const addTodoFolder = document.getElementById('add-project');

export function createFolderForm() {
  let isActive = false;
  addTodoFolder.addEventListener('click', () => {
    if (isActive) return;

    isActive = true;

    const form = document.createElement('form');
    form.action = '#';
    form.classList.add('todo-folder', 'flex-column', 'flex-center');
    form.autocomplete = 'off';

    const folderInputTitle = document.createElement('input');
    folderInputTitle.maxLength = '14';
    folderInputTitle.id = 'folder-title';
    folderInputTitle.type = 'text';
    folderInputTitle.classList.add('input-title');
    folderInputTitle.placeholder = 'Add a Title';

    const divButtonContainer = document.createElement('div');

    const addFolderButton = createButton('add');

    addFolderButton.addEventListener('click', (e) => {
      e.preventDefault();
      addForm(folderInputTitle.value);
      const newFolder = new Folder(folderInputTitle.value);
      Folder.addFolder(newFolder);
      folderSection.removeChild(form);
      form.reset();
      isActive = false;
    });

    const cancelFolderButton = createButton('cancel');

    cancelFolderButton.addEventListener('click', () => {
      folderSection.removeChild(form);
      isActive = false;
    });

    divButtonContainer.appendChild(addFolderButton);
    divButtonContainer.appendChild(cancelFolderButton);

    form.appendChild(folderInputTitle);
    form.appendChild(divButtonContainer);

    folderSection.appendChild(form);
    folderInputTitle.focus();
  });
}

function addForm(title) {
  const projectFolder = document.createElement('article');
  projectFolder.classList.add('todo-folder', 'flex');

  const projectTitle = document.createElement('span');
  projectTitle.classList.add('todo-folder-name');
  projectTitle.textContent = title;

  const projectDeleteButton = createIcon('delete');
  projectDeleteButton.addEventListener('click', () => {
    Folder.deleteFolder(title);
    folderSection.removeChild(projectFolder);
  });

  projectFolder.appendChild(projectTitle);
  projectFolder.appendChild(projectDeleteButton);

  folderSection.appendChild(projectFolder);
}
