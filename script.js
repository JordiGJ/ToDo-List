// get elements
const userInput = document.querySelector("#userInput");
const noteContainer = document.querySelector(".note-container");

// variables
const keyToListen = "Enter";
let notesLocal = JSON.parse(localStorage.getItem("notesDB")) || [];

// functions
function saveToLocalStorage() {
  localStorage.setItem("notesDB", JSON.stringify(notesLocal));
}

function handleKeyDown(e) {
  const target = e.key;
  // if Enter is pressed
  if (target === keyToListen) {
    let random6nums = "";
    for (let i = 0; i <= 5; i++) {
      random6nums += Math.floor(Math.random() * 10);
    }
    // our id will be timestamp+6random number characters
    const id = +new Date() + random6nums;
    const text = userInput.value;
    // object note to store in notesLocal
    const obj = { id, text, checked: false };
    notesLocal.push(obj);
    saveToLocalStorage();
    renderNote(obj.text, obj.checked, obj.id, noteContainer);
    userInput.value = "";
  }
}

function handleCheck(id) {
  // we identify the note by its id, and modify it
  const target = notesLocal.filter((note) => note.id === id);
  target[0].checked = !target[0].checked;
  saveToLocalStorage();
  // renderNotes();
  const note = document.getElementById(id);
  note.classList.toggle("done");
}
function handleDelete(id) {
  // find note to delete
  const toDelete = notesLocal.find((note) => note.id === id);
  // check for user confirmation
  let ok = confirm(`delete ${toDelete.text}?`);
  if (ok) {
    // get all notes but the one to be deleted
    const target = notesLocal.filter((note) => note.id !== id);
    notesLocal = target;
    saveToLocalStorage();
    renderNotes();
  }
}

function renderNote(text, checkedStatus, id, parent) {
  const note = document.createElement("li");
  note.classList.add("note");
  checkedStatus ? note.classList.add("done") : note.classList.remove("done");
  note.id = id;
  const textP = document.createElement("p");
  textP.textContent = text;
  const icons = document.createElement("div");
  icons.classList.add("icons");
  const checkInput = document.createElement("input");
  checkInput.setAttribute("type", "checkbox");
  checkInput.setAttribute("name", "done");
  checkInput.classList.add("done");
  checkedStatus ? checkInput.setAttribute("checked", true) : "";
  const img = document.createElement("img");
  img.src = "./icons/trash-solid.svg";
  icons.append(checkInput, img);
  note.append(textP, icons);
  parent.append(note);
  checkInput.addEventListener("click", () => handleCheck(id));
  img.addEventListener("click", () => handleDelete(id));
}

function renderNotes() {
  noteContainer.innerHTML = "";
  notesLocal.forEach((note) => {
    renderNote(note.text, note.checked, note.id, noteContainer);
  });
}
// eventListeners
userInput.addEventListener("keydown", handleKeyDown);

// init
renderNotes();
