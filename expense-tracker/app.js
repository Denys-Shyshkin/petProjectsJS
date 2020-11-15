// Creating const to work with DOM
const description = document.querySelector('.description');
const date = document.querySelector('.date');
const amount = document.querySelector('.amount');
const addBtn = document.querySelector('.add-expense');
const placeholder = document.querySelector('.placeholder');
const parent = document.querySelector('tbody');
const table = document.querySelector('table');
const totalRow = document.querySelector('.total');
const modal = document.querySelector('.modal-content');

// Introducing array to place inside all expense
const allExpenses = [];

// Introducing variable to give a specific id to each expense
let i = 0;

// Creating function to output an expense on a screen
const renderExpense = () => {
    i++;
    if (description.value.trim() === '' || date.value === '' || amount.value === '' || amount.value < 0) {
        alert('Wrong Input!');
    } else {
        const tableRow = document.createElement('tr');
        parent.insertBefore(tableRow, totalRow);
        tableRow.innerHTML =
        `<td>${description.value}</td>
        <td>${date.value}</td>
        <td>${amount.value}$</td>
        <td id="${i}"><i title="Edit" class="fas fa-edit fa-lg"></i><i title="Delete" class="far fa-trash-alt fa-lg"></i></td>`;
    
        allExpenses.push({
            id: i,
            desc: description.value,
            date: date.value,
            price: amount.value
        });

        togglePlaceholder();
        totalExpenses();

        description.value = '';
        date.value = '';
        amount.value = '';
    }
};

// Creating function o calculate total sum of all expenses
const totalExpenses = () => {
    let sum = 0;
    if (allExpenses.length > 0) {
        for (let exp of allExpenses) {
            sum += +(exp.price)
        }
        document.getElementById('sum').textContent = sum + '$';
    }
};

// Creating function to output a placeholder when to expenses are displayed 
const togglePlaceholder = () => {
    if (allExpenses.length === 0) {
        placeholder.innerHTML = `<td colspan="4"><i>No Expenses Added Yet</i></td>`;
        totalRow.innerHTML = '';
    } else if (allExpenses.length > 0) {
        placeholder.innerHTML = '';
        totalRow.innerHTML = `<td colspan="2">Total:</td><td colspan="2" id="sum"></td>`;
    }
};

// Introducing global variable o work with table
let tr, path0, path1;

// Creating function for starting process of deleting specific row with expense 
const deleteExpense = event => {
    path0 = event.path[0];
    path1 = event.path[1];
    if (path0.title === 'Delete') {
        modal.classList.add('visible');
        tr = path0.parentElement.parentElement;

        // Creating function to hide modal window and attaching it to "cancel" button 
        document.getElementById('cancel-button').addEventListener('click', () => {
            modal.classList.remove('visible');
        });

        // Attaching function of complete deleting of expense to "Yes" button
        document.getElementById('yes-button').addEventListener('click', completeDeletion);
    }
};

// Creating function for complete deleting of expense element
const completeDeletion = () => {
    parent.removeChild(tr);
    modal.classList.remove('visible');
    allExpenses = allExpenses.filter(element => element.id !== +(path1.id));
    togglePlaceholder();
    totalExpenses();
}

// Creating function for editing a specific expense element 
const editExpense = (event) => {
    path0 = event.path[0];
    path1 = event.path[1];
    let row1, row2, row3, row4;

    if (path0.title === 'Edit') {
        row4 = path0.parentElement;
        row3 = row4.previousElementSibling;
        row2 = row3.previousElementSibling;
        row1 = row2.previousElementSibling;

        for (let exp of allExpenses) {
            if (+path1.id === exp.id) {
                row4.innerHTML = '<i title="Confirm" class="far fa-check-circle fa-lg"></i>'
                row3.innerHTML = `<input class="price-edit" type="number" value ="${exp.price}"></input>`;
                row2.innerHTML = `<input class="date-edit" type="date" value ="${exp.date}"></input>`;
                row1.innerHTML = `<input class="description-edit" type="text" value ="${exp.desc}"></input>`;
            }
        }    
    }

    if (path0.title === 'Confirm') {
        row4 = path0.parentElement;
        row3 = row4.previousElementSibling;
        row2 = row3.previousElementSibling;
        row1 = row2.previousElementSibling;

        const descriptionEdit = document.querySelector('.description-edit');
        const dateEdit = document.querySelector('.date-edit');
        const priceEdit = document.querySelector('.price-edit');

        row4.innerHTML = `<i title="Edit" class="fas fa-edit fa-lg"></i><i title="Delete" class="far fa-trash-alt fa-lg"></i>`;
        row3.textContent = priceEdit.value + '$';
        row2.textContent = dateEdit.value;
        row1.textContent = descriptionEdit.value;

        for (let exp of allExpenses) {
            if (+path1.id === exp.id) {
                exp.desc = descriptionEdit.value;
                exp.date = dateEdit.value;
                exp.price = priceEdit.value;
            }
        }
    }

    totalExpenses();
};


// Attaching function of output expenses on the screen to "ADD" button 
addBtn.addEventListener('click', renderExpense);

// Attaching function for starting process of deleting specific row with expense to table area
table.addEventListener('click', deleteExpense);

// Attaching function for editing specific expense to table area
table.addEventListener('click', editExpense);