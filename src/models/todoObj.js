import { updateLocalStorage } from '../storage/localStorage';

export class Todo {
  constructor(title, desc, date, priority) {
    this.title = title;
    this.desc = desc;
    this.date = date;
    this.priority = priority;
    this.complete = false;
  }

  toggleComplete() {
    this.complete = this.complete === false ? true : false;
    updateLocalStorage();
    return this.complete;
  }
}
