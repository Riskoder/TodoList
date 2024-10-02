import { createDeleteButton } from '../components';

export function createFolderTemplate() {
  const folderList = document.createElement('li');
  folderList.classList.add('folder', 'hover');
  const deleteButton = createDeleteButton();

  folderList.innerHTML = `
  <h4 class="title"></h4>
  `;
  folderList.appendChild(deleteButton);

  return folderList;
}
