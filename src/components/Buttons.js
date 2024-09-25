import deleteIcon from '../assets/icons/delete.svg';
import editIcon from '../assets/icons/edit.svg';

export function createTypeButton(type) {
  const img = document.createElement('img');
  switch (type) {
    case 'delete':
      img.classList.add('todo-folder-icon', 'scale');
      img.src = deleteIcon;
      img.alt = 'Delete Icon';
      break;
    case 'edit':
      img.classList.add('todo-folder-icon', 'scale');
      img.src = editIcon;
      img.alt = 'Edit Icon';
      break;
    default:
      img.src = '';
      img.alt = '';
      break;
  }

  return img;
}
