import { updateLocalStorage } from '../storage/localStorage';

const folderLibrary = [];

export class Folder {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.notes = [];
  }

  addNote(element) {
    this.notes.push(element);
    updateLocalStorage();
  }

  deleteNote(index) {
    this.notes.splice(index, 1);
    updateLocalStorage();
  }

  getNotes() {
    return this.notes;
  }

  static addFolder(folder) {
    folderLibrary.push(folder);
    updateLocalStorage();
  }

  static deleteFolder(index) {
    folderLibrary.splice(index, 1);
    updateLocalStorage();
  }

  static getAll() {
    return folderLibrary;
  }
}
