import { createFormButtons } from '../components';

export function createForm() {
  const formContainer = document.createElement('div');
  formContainer.classList.add('flex-center');

  const buttons = createFormButtons();

  formContainer.innerHTML = `
    <form class="form-folder flex-center" novalidate autocomplete="off">
      <h2 class="form-title">Folder Information</h2>
      <input
        type="text"
        class="folder-input  input-title"
        maxlength="30"
        placeholder="Add a Title" />
      <input
        type="text"
        class="folder-input input-description"
        maxlength="350"
        placeholder="Add a Description" />
    </form>
  `;

  const form = formContainer.querySelector('.form-folder');
  form.appendChild(buttons);

  return formContainer;
}
