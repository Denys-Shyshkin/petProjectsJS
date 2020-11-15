// Creating const to work with DOM
const input = document.querySelector('.input');
const verifyBtn = document.querySelector('.add-button');
const output = document.querySelector('.output');

// Creating function to verify credit card number
const verify = () => {
    const cardNumber = Array.from(input.value);

    if (cardNumber.length !== 13 && cardNumber.length !== 15 && cardNumber.length !== 16) {
        alert("Wrong input");
        return;

    } else {
        const multipliedDigits = [];
        
        cardNumber.reverse();
        for (let i = 1; i < cardNumber.length; i += 2) {
            multipliedDigits.push(cardNumber[i] * 2);
        }
        const digits = multipliedDigits.join('');
        
        let sum = 0;
        for (let digit of digits) {
            sum += +digit;
        }

        for (let i = 0; i < cardNumber.length; i += 2) {
            sum += +cardNumber[i];
        }

        cardNumber.reverse();
        if (sum % 2 === 0 && +cardNumber[0] === 4) {
            result = 'VISA';
            link = './img/visa.png';
        } else if (sum % 2 === 0 && +cardNumber[0] === 3 && +cardNumber[1] === 4 || +cardNumber[1] === 7) {
            result = 'AMEX';
            link = './img/amex.jpg';
        } else if (sum % 2 === 0 && +cardNumber[0] === 5 && +cardNumber[1] === 1 || +cardNumber[1] === 2 || +cardNumber[1] === 3 || +cardNumber[1] === 4 || +cardNumber[1] === 5) {
            result = 'MASTERCARD';
            link = './img/master.png';
        }
    }
    outputResult(result, link);
    input.value = '';
};

// Creating function to output the result on a screen
const outputResult = (result, link) => {
    const div = document.createElement('div');
    div.classList.add('text-output');
    output.appendChild(div);
    div.innerHTML = 
    `<button class="close-button">
        <i class="fas fa-times fa-lg"></i>
        </button>
    <div class="img-container">
        <img src=${link}>
    </div>
    <div class="text-container">
        <h4>${result}</h4>
        <p>${input.value}</p>
    </div>`;
};

// Attaching verification function to "Verify" button
verifyBtn.addEventListener('click', verify);

// Creating function to delete specific element and attaching it to "close" button
output.addEventListener('click', event => {
    if (event.target.classList.contains('fa-times')) {
        output.removeChild(event.target.parentElement.parentElement);
    }
});