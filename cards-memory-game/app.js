// Creating const to work with DOM
const cardBoard = document.querySelector('.img-container');
const cardsOnTable = document.querySelectorAll('.card');
const cardsFlipped = document.querySelector('.flip');
const timer = document.querySelector('.time');

const modal = document.querySelector('.modal-background');
const modalGreet = document.querySelector('.greet');
const modalFlips = document.querySelector('.best-flips');
const modalTime = document.querySelector('.best-time');

const resetBtn = document.querySelector('.reset');
const resultsBtn = document.querySelector('.results');
const closeBtn = document.querySelector('.close-button');

// Introducing arrays to hold all results of time and flips
const allBestFlips = [];
const allBestTime = [];

// Introducing the array of object with all playing cards
const allCards = [
    {
        name: 'ace',
        src: './Images/Ace.png'
    },
    {
        name: 'king',
        src: './Images/King.png'
    },
    {
        name: 'queen',
        src: './Images/Queen.png'
    },
    {
        name: 'jack',
        src: './Images/Jack.png'
    },
    {
        name: 'ace',
        src: './Images/Ace.png'
    },
    {
        name: 'king',
        src: './Images/King.png'
    },
    {
        name: 'queen',
        src: './Images/Queen.png'
    },
    {
        name: 'jack',
        src: './Images/Jack.png'
    },
]

// Introducing global variables to work with functions
let r;
let uncoveredCards = new Set (allCards);
let compare = [];
let interval;
let flipCount = 0;
let seconds = 0;
let matches = 0;

// Creating function to place all cards to random positions on the table
const randomPosition = () => {
    let positionSet = new Set();

    while (positionSet.size <= 7) {
        let randomPosition = Math.floor(Math.random() * cardsOnTable.length);
        positionSet.add(randomPosition);
    }

    r = Array.from(positionSet);

    for (let i = 0; i < cardsOnTable.length; i++) {
        allCards[i].position = r[i];
    }
    
}

// Calling the function of cards random position for the first time upon loading the page
randomPosition();

// Inroducing Non operation and operation function to work with timer
const noop = () => {};
let opfunc;

// Creating function to start a timer and display seconds past since start og the game on a screen
opfunc = startTimer = () => {
    const secondsCounter = () => {
        seconds++;
        timer.innerHTML = `Time: ${seconds} seconds`;
    }
    interval = setInterval(secondsCounter, 1000);

    // Assisgning Non operation function to start timer function in order to call it only one time
    startTimer = noop;
};

// Creating function to show modal window
const showModal = () => {
    modal.classList.add('active');
};

// Creating function to show to the player window with greetings
const greetWinner = () => {
    showModal();
    modalGreet.innerHTML = `CONGRATULATION!!!<br>You Won with the result of ${flipCount} flips in ${seconds} seconds!`;
    allBestFlips.push(flipCount);
    allBestTime.push(seconds);
    topResults();
};

// Creating function to determine the best results in flips and time
const topResults = () => {
    let minFlips = allBestFlips[0];
    for (let flips of allBestFlips) {
        if (minFlips > flips) {
            minFlips = flips;
        }
    }
    modalFlips.innerHTML = `Best Flips<br>${minFlips}`;

    let minSeconds = allBestTime[0];
    for (let secs of allBestTime) {
        if (minSeconds > secs) {
            minSeconds = secs;
        }
    }
    modalTime.innerHTML = `Best Time<br>${minSeconds} seconds`;
};

// Creating function to display chosen cards to compare them to each other and attaching it to cardboard table
cardBoard.addEventListener('click', event => {
    for (let i = 0; i < cardsOnTable.length; i++) {
        if (event.path[0].id === `${i}`) {
            for (let k = 0; k < allCards.length; k++) {
                if (allCards[k].position === i) {
                    cardsOnTable[i].src = allCards[k].src;
                    if (uncoveredCards.has(allCards[k])) {
                        if (compare.length === 0) {
                            flipCount++;
                            compare.push(allCards[k]);
                        } else if (!compare.includes(allCards[k])) {
                            flipCount++;
                            compare.push(allCards[k]);
                        }
                    }
                }
            }
        }
    }

    cardsFlipped.textContent = 'Cards Flipped: ' + flipCount;

    if (compare.length === 2) {
        if (compare[0].name === compare[1].name) {
            uncoveredCards.delete(compare[0]);
            uncoveredCards.delete(compare[1]);
            compare = [];
        } 
    } else if (compare.length === 3) {
        cardsOnTable[compare[0].position].src = './Images/back-side.png';
        cardsOnTable[compare[1].position].src = './Images/back-side.png';
        compare.splice(0, 2);
    } 
    
    if (uncoveredCards.size === 0) {
        setTimeout(() => {
            greetWinner();
        }, 50);
        clearInterval(interval);
    }

    startTimer();
});

// Attaching show top results window to a "Top Results" function
resultsBtn.addEventListener('click', showModal);

// Creating function to close top results window and attaching it to "close" button
closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    modalGreet.innerHTML = '';
    reset();
});

// Creating reset game function and attaching it to "Reset" button
resetBtn.addEventListener('click', reset = () => {
    uncoveredCards = new Set (allCards);
    compare = [];
    flipCount = 0;
    matches = 0;
    seconds = 0;
    cardsFlipped.textContent = 'Cards Flipped: ' + flipCount;
    timer.innerHTML = `Time: ${seconds} seconds`;
    for (let i = 0; i < cardsOnTable.length; i++) {
        cardsOnTable[i].src = './Images/back-side.png';
    }

    clearInterval(interval);
    randomPosition();
    startTimer = opfunc;
})