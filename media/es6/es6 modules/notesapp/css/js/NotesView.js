export default class NotesView {

    constructor(root, { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}) {
        //lets initilize the variables
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteDelete = onNoteDelete;
        this.onNoteEdit = onNoteEdit;

        //lets inialize the innerhtml
        this.root.innerHTML = `
        <div class="notes_sidebar">
        <button class="notes_add" type="button">Add Note</button>
        <div class="notes_list"></div>

        <div class="notes_preview">
        <input class="notes_title" type="text" placeholder="New note..">
        <textarea class="notes_body>Take note...</textarea>
        </div>
        `;

        const btnAddNote = this.root.querySelector(".notes_add");
        const inptTitle = this.root.querySelector(".notes_title");
        const inpBody = this.root.querySelector(".notes_body");


        //lets define a function to handle button click
        btnAddNote.addEventListener("click", () => {
            this.onNoteAdd();
        });
        [inptTitle, inpBody].forEach(inputField => {
            inputField.addEventListener("blur", () => {
                const updatedTitle = inptTitle.value.trim();
                const updatedBody = inpBody.value.trim();

                this.onNoteEdit(updateTitle, updateBody);
            });
        });

        this.updateNotePreviewVisibility(false);
    }

    //lets create html items
    _createListItemHIML(id, title, body, update) {
        const MAX_BODY_LENGTH = 60;
        return `
          <div class="notes_list-item" data-note-id="${id}">
          <div class="notes_small-title>${title}</div>
          <div class="notes_small-body">
          ${body.substring(0,MAX_BODY_LENGTH)}
          ${body.length>MAX_BODY_LENGTH ? "...":""}
          </div>
          <div class="notes_small-updates">
          ${update.toLocaleString(undefined,{dataStyle:"full",timeStyle:"short"})}
          </div>
          </div>
        `;


    }

    //lets define a method to updateNotelist
    updateNoteList(notes) {
        const notesListContainer = this.root.querySelector(".notes_list");
        //empty list
        notesListContainer.innerHTML = "";

        for (const note of notes) {
            const html = this._createListItemHtml(note.id, note.title, note.body, new Date(note.updated));

            notesListContainer.insertAdjacentHTML()
        }

        //lets add select or delete events for each list item
        notesListContainer.querySelectorAll(".notes_list-item").forEach(noteListItem => {
            noteListItem.addEventListener("click", () => {
                this.onNoteSelect(noteListItem.dataset.noteId);
            });
            noteListItem.addEventListener("dbClick", () => {
                const doDelete = confirm("Are you sure you want to delete this note?");

                if (doDelete) {
                    this.onNoteDelete(noteListItem.dataset.noteId);
                }
            });
        });
    }

    //lets update the active note
    updateActiveNote(note) {
        this.root.querySelector(".notes_title").value = note.title;
        this.root.querySelector(".notes_body").value = note.body;

        this.root.querySelectorAll(".notes_list-item").forEach(noteListItem => {
            noteListItem.classList.remove("notes_list-item--selected");

        });
        this.root.querySelector('.notes_list-item[data-note-id="${note.id}"]').classList.add("notes_list-item--selected");

    }
    updateNotePreviewVisibility(visible) {
        this.root.querySelector(".notes_preview").style.visiblity = visible ? "visible" : "hidden";
    }
}