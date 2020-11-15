// Creating const to work with DOM
const input = document.querySelector('.text');
const addBtn = document.querySelector('.add-button');
const outputDiv = document.querySelector('.output');

// Introducing the array of vowel letters 
const vowels = ['a', 'e', 'i', 'o', 'u'];

// Intoducing variable to count all vowels 
let count;

// Creating function to output the result
const resultOutput = () => {
    let div = document.createElement('div');
    div.classList.add('text-output');
    outputDiv.appendChild(div);

    vowelsCount();

    div.innerHTML = 
    `<b>TEXT:</b> ${input.value}<br><br>
    <b>VOWELS:</b> ${count}`;
    input.value = '';
};

// Creating function to count all vowels in a given string
const vowelsCount = () => {
    count = 0;
    const string = (input.value).toLowerCase();
    for (let letter of string) {
        for (let vowel of vowels) {
            if (letter === vowel) {
                count++;
            }
        }
    }
};

// Attaching output function to "Result" button
addBtn.addEventListener('click', resultOutput);

// Creating function to remove specific element and attaching it to output area of the page
outputDiv.addEventListener('click', event => outputDiv.removeChild(event.target));