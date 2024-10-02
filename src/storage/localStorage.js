import { Folder } from '../models/folderObj.js';
import { Todo } from '../models/todoObj.js';

//set - get - update - load

const STORAGE_KEY = 'todoApp';

function setDataToLocalStore(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getDataFromLocalStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function updateLocalStorage() {
  const folders = Folder.getAll().map((folder) => ({
    title: folder.title,
    description: folder.description,
    notes: folder.getNotes().map((note) => ({
      title: note.title,
      desc: note.desc,
      date: note.date,
      priority: note.priority,
      complete: note.complete,
    })),
  }));

  setDataToLocalStore(folders);
}

export function loadDataFromLocalStorage() {
  const data = getDataFromLocalStorage();

  console.log(data);
  data.forEach((folderData) => {
    const folder = new Folder(folderData.title, folderData.description);
    folderData.notes.forEach((noteData) => {
      const todoNote = new Todo(
        noteData.title,
        noteData.desc,
        noteData.date,
        noteData.priority
      );
      todoNote.complete = noteData.complete;
      folder.addNote(todoNote);
    });
    Folder.addFolder(folder);
  });
}
