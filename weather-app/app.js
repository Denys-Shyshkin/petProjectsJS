// Creating global const to work with DOM
const choose = document.querySelector('.choose');
const randomBtn = document.querySelector('.random');
const metricBtn = document.querySelector('.metric');
const imperialBtn = document.querySelector('.imperial');
const locationBtn = document.querySelector('.location');

// Creating global variables to work with functions 
let longitude;
let latitude;
let temperature;
let wind;

// Creating the array to work with icons
const iconsList = [
    {
        desc: 'clear sky',
        owIconDay: '01d',
        owIconNight: '01n',
        afIcon: 'fa-sun',
    },
    {
        desc: 'few clouds',
        owIconDay: '02d',
        owIconNight: '02n',
        afIcon: 'fa-cloud-sun',
    },
    {
        desc: 'scattered clouds',
        owIconDay: '03d',
        owIconNight: '03n',
        afIcon: 'fa-cloud',
    },
    {
        desc: 'broken clouds',
        owIconDay: '04d',
        owIconNight: '04n',
        afIcon: 'fa-cloud',
    },
    {
        desc: 'shower rain',
        owIconDay: '09d',
        owIconNight: '09n',
        afIcon: 'fa-cloud-showers-heavy',
    },
    {
        desc: 'rain',
        owIconDay: '10d',
        owIconNight: '10n',
        afIcon: 'fa-cloud-sun-rain',
    },
    {
        desc: 'thunderstorm',
        owIconDay: '11d',
        owIconNight: '11n',
        afIcon: 'fa-poo-storm',
    },
    {
        desc: 'snow',
        owIconDay: '13d',
        owIconNight: '13n',
        afIcon: 'fa-snowflake',
    },
    {
        desc: 'mist',
        owIconDay: '50d',
        owIconNight: '50n',
        afIcon: 'fa-smog',
    },
];

// Creating the array of cities
const cities = [
    {
        id: 2643743,
        name: 'London',
    },
    {
        id: 3117735,
        name: 'Madrid',
    },
    {
        id: 4140963,
        name: 'Washington',
    },
    {
        id: 3530597,
        name: 'Mexico',
    },
    {
        id: 1850147,
        name: 'Tokyo',
    },
    {
        id: 1273294,
        name: 'Delhi',
    },
    {
        id: 292224,
        name: 'Dubai',
    },
    {
        id: 745044,
        name: 'Istanbul',
    },
];


// Creating function for fetch request and for outputting all necessary data
const weatherUpdate = (id = cities[0].id, longitude, latitude) => {

    // Checking with which parameters the function are called
    if (id !== null) {
        request = `id=${id}`;
    } else {
        request = `lat=${latitude}&lon=${longitude}`;
    }

    // As a result of if statement - sending the correspondent request
    fetch(`http://api.openweathermap.org/data/2.5/weather?${request}&appid=0dd428b4f1a94749103cf976bad0dbda`)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            temperature = Math.floor(data.main.temp - 273);
            wind = data.wind.speed;

            // Outputting the result for the chosen city
            // Checking the length of city name to change its size in case if users city will be too large
            if (data.name.length > 16) {
                document.querySelector('.city').style.fontSize = '25px';
            } else {
                document.querySelector('.city').style.fontSize = '40px';
            }
            
            document.querySelector('.city').textContent = data.name;
            document.querySelector('.weather').textContent = data.weather[0].main;
            document.querySelector('.humidity').innerHTML = `Humidity<br>${data.main.humidity}%`;

            // Checking which specific icon to display
            for (let icon of iconsList) {
                if (data.weather[0].icon === icon.owIconDay ||
                    data.weather[0].icon === icon.owIconNight) {
                    document.querySelector('.icon').innerHTML = `<i class="fas ${icon.afIcon} fa-3x"></i>`;
                }
            }

            // Checking which button is on in order to display all data in correct units of measurement
            if (metricBtn.classList.contains('active')) {
                document.querySelector('.temp').innerHTML = temperature + '&degC';
                document.querySelector('.wind').innerHTML = `Wind<br>${wind} m/s`;
            } else if (imperialBtn.classList.contains('active')) {
                document.querySelector('.temp').innerHTML = Math.floor((temperature * 9) / 5 + 32) + '&deg F';
                document.querySelector('.wind').innerHTML = `Wind<br>${Math.floor(wind * 2.237 * 10) / 10} mph`;
            }
        })
    .catch(function () {});
};

// Calling function to display London weather data on page load
weatherUpdate();


// Attaching to city list area function to update weather info
choose.addEventListener('click', (event) => {
    for (let city of cities) {
        if (event.target.id === city.name) {
            id = city.id;
        }
    }
    weatherUpdate(id);
});

// Attaching function of user position determination to "current location" button 
locationBtn.addEventListener('click', () => {
    const showPosition = (position) => {
        longitude = position.coords.longitude;
        latitude = position.coords.latitude;

        // Transfering the result as the parameters to the function
        weatherUpdate(null, longitude, latitude);
    };

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert('Geolocation is not supported');
    }
});

// Attaching to correspondent button function for displaying data in imperial units
imperialBtn.addEventListener('click', () => {
    document.querySelector('.temp').innerHTML =
        Math.floor((temperature * 9) / 5 + 32) + '&degF';
    document.querySelector('.wind').innerHTML = `Wind<br>${Math.floor(wind * 2.237 * 10) / 10} mph`;
    if (!imperialBtn.classList.contains('active')) {
        imperialBtn.classList.add('active');
        metricBtn.classList.remove('active');
    }
});

// Attaching to correspondent button function for displaying data in metric units
metricBtn.addEventListener('click', () => {
    document.querySelector('.temp').innerHTML = temperature + '&degC';
    document.querySelector('.wind').innerHTML = `Wind<br>${wind} m/s`;
    if (!metricBtn.classList.contains('active')) {
        metricBtn.classList.add('active');
        imperialBtn.classList.remove('active');
    }
});

// Attaching function to "random city" button
randomBtn.addEventListener('click', () => {
    const randomCity = Math.floor(Math.random() * cities.length);
    id = cities[randomCity].id;
    weatherUpdate(id);
});
