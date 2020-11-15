//Creating const to work with DOM
const note = document.querySelector('.note');
const addBtn = document.querySelector('.add-button');
const outputDiv = document.querySelector('.output');
const modalPar = document.getElementById('modal');
const modalWin = document.querySelector('.modal-content');
const cancelModal = document.querySelector('#cancel-button');

// Introducing array for all notes added by a user
let allNotes = [];

// Introducing variable to track all notes
let i = 0;

// Creating function to render a note on the screen
const renderNote = () => {
    i++;
    document.querySelector('.output').innerHTML += 
    `<div class="note-output" id="${i}">
        <div class="note-text">
            <h4>Note #${i}</h4>
            <p>${note.value}</p>
        </div>
        <button class="details-button">View Details</button>
        <button class="delete-button">Delete</button>
    </div>`;

    
    allNotes.push({
        id: i,
        text: note.value
    });
    
    note.value = '';
};

// Creating function to view all note text in modal window
const viewDetails = event => {
    if (event.target.className === 'details-button') {
        modalWin.classList.add('visible');
        for (let n of allNotes) {
            if (n.id === +(event.path[1].id)) {
                modalPar.textContent = n.text;
            }
        }
    }
};

// Creating function to delete specific note 
const deleteNote = event => {
    if (event.target.className === 'delete-button') {
        outputDiv.removeChild(event.target.parentElement);
        allNotes = allNotes.filter(el => el.id !== +(event.path[1].id));
    }
}

// Attaching function for adding a new note to "Add Note" button
addBtn.addEventListener('click', renderNote);

// Attaching function for viewing a full note to "View Details" button
outputDiv.addEventListener('click', viewDetails);

// Attaching function for deleting note to "Delete" button
outputDiv.addEventListener('click', deleteNote);

// Creating function to hide modal window to cancel button
cancelModal.addEventListener('click', () => modalWin.classList.remove('visible'))
