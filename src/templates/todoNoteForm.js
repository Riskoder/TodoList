import { createFormButtons } from '../components/Buttons';

export function createTodoFormTemplate() {
  const container = document.createElement('div');
  container.classList.add('flex-center');

  const formButtons = createFormButtons();

  container.innerHTML = `
    <form autocomplete="off" class="todo-form hover">
      <div class="flex">
        <label for="todo-form-title" class="form-label">Title</label>
        <input type="text" id="todo-form-title" class="todo-input todo-form-title" />
      </div>
      <div class="flex">
        <label for="todo-form-date" class="form-label">Date</label>
        <input type="date" id="todo-form-date" class="todo-input todo-form-date" />
      </div>
      <div class="flex">
        <label for="todo-form-priority" class="form-label">Priority</label>
        <select name="priority" id="todo-form-priority" class="todo-input todo-form-priority">
          <option value="low" class="low-option">Low</option>
          <option value="medium" class="medium-option">Moderate</option>
          <option value="high" class="high-option">High</option>
        </select>
      </div>
      <div class="flex">
        <label for="todo-form-description" class="form-label"
          >Description</label
        >
        <input type="text" id="todo-form-description" class="todo-input todo-form-description" />
      </div>
    </form>
  `;

  const form = container.querySelector('form');
  form.appendChild(formButtons);

  return container;
}
