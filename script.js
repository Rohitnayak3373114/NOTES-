
let spaces = JSON.parse(
    localStorage.getItem("mySpaces")
) || ["Normal Space", "Professional Space"];

let notes = JSON.parse(
    localStorage.getItem("myNotes")
) || {};

let currentSpace = "";
let currentNote = null;

// SAVE DATA

function saveData() {
    localStorage.setItem("mySpaces", JSON.stringify(spaces));
    localStorage.setItem("myNotes", JSON.stringify(notes));
}

// DISPLAY SPACES

function renderSpaces() {
    const container = document.getElementById("spaces");
    container.innerHTML = "";

    spaces.forEach(space => {
        const div = document.createElement("div");
        div.className = "space";

        const title = document.createElement("h3");
        title.textContent = space;

        const description = document.createElement("p");
        description.textContent = "Open your workspace";

        div.append(title, description);
        div.onclick = () => openSpace(space);

        container.appendChild(div);
    });
}

// CREATE CUSTOM SPACE

function createSpace() {
    const name = prompt("Enter your custom space name:");

    if (!name || !name.trim()) return;

    if (spaces.some(s =>
        s.toLowerCase() === name.trim().toLowerCase()
    )) {
        alert("This space already exists!");
        return;
    }

    spaces.push(name.trim());
    saveData();
    renderSpaces();
}

// OPEN SPACE

function openSpace(name) {
    currentSpace = name;

    document.getElementById("home").classList.add("hidden");
    document.getElementById("spaceScreen").classList.remove("hidden");

    document.getElementById("spaceTitle").textContent = name;

    renderNotes();
}

// GO HOME

function goHome() {
    document.getElementById("spaceScreen").classList.add("hidden");
    document.getElementById("editorScreen").classList.add("hidden");
    document.getElementById("home").classList.remove("hidden");

    renderSpaces();
}

// DISPLAY NOTES

function renderNotes() {
    const container = document.getElementById("notesContainer");
    container.innerHTML = "";

    notes[currentSpace] = notes[currentSpace] || [];

    notes[currentSpace].forEach((note, index) => {
        const div = document.createElement("div");
        div.className = "note";

        const title = document.createElement("h4");
        title.textContent = note.title || "Untitled";

        const preview = document.createElement("p");
        preview.textContent =
            note.content.substring(0, 65) || "Empty note";

        div.append(title, preview);
        div.onclick = () => editNote(index);

        container.appendChild(div);
    });
}

// CREATE NEW NOTE

function newNote() {
    currentNote = null;

    document.getElementById("noteTitle").value = "";
    document.getElementById("noteContent").value = "";

    showEditor();
}

// EDIT NOTE

function editNote(index) {
    currentNote = index;

    const note = notes[currentSpace][index];

    document.getElementById("noteTitle").value = note.title;
    document.getElementById("noteContent").value = note.content;

    showEditor();
}

// OPEN EDITOR

function showEditor() {
    document.getElementById("spaceScreen").classList.add("hidden");
    document.getElementById("editorScreen").classList.remove("hidden");
}

// CLOSE EDITOR

function closeEditor() {
    document.getElementById("editorScreen").classList.add("hidden");
    document.getElementById("spaceScreen").classList.remove("hidden");

    renderNotes();
}

// SAVE NOTE

function saveNote() {
    const title = document.getElementById("noteTitle").value;
    const content = document.getElementById("noteContent").value;

    notes[currentSpace] = notes[currentSpace] || [];

    const note = { title, content };

    if (currentNote === null) {
        notes[currentSpace].push(note);
    } else {
        notes[currentSpace][currentNote] = note;
    }

    saveData();
    closeEditor();
}

// DELETE NOTE

function deleteNote() {
    if (currentNote === null) {
        closeEditor();
        return;
    }

    if (confirm("Delete this note?")) {
        notes[currentSpace].splice(currentNote, 1);
        saveData();
        closeEditor();
    }
}

// INITIAL SETUP

renderSpaces();