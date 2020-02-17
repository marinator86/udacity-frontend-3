/* Global Variables */
const API_KEY = '6a24c42d694388188acea5c73afe1688';
const BASE = 'http://api.openweathermap.org/data/2.5/weather';
const SERVER = 'http://localhost:3000'

// Create a new date instance dynamically with JS

document.addEventListener('DOMContentLoaded', e => {
    const button = document.getElementById('generate');
    button.addEventListener('click', createEntry);
});

function createEntry(e) {
    getWeather()
    .then(postResponse)
    .then(getData)
    .then(update);
}

async function update (result) {
    console.log('Updateing UI: ' + JSON.stringify(result));
    const date = document.getElementById('date');
    const temp = document.getElementById('temp');
    const content = document.getElementById('content');
    const holder = document.getElementById('entryHolder');

    const d = holder.getAttribute('display');
    holder.setAttribute('display', 'none');

    date.textContent = result.date;
    temp.textContent = result.temperature;
    content.textContent = result.user_response;

    holder.setAttribute('display', d);
}

async function getData () {
    const url = SERVER+'/all';
    console.log(`Getting ${url}`);
    const response = await fetch(url);
    return await response.json();
}

async function postResponse (json) {
    const url = SERVER+'/data';
    console.log(`Posting ${JSON.stringify(json)} to ${url}`);
    return await fetch(url, data = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(json)
    });
}

async function getWeather(event) {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    const url =`${BASE}?zip=${zip},de&appid=${API_KEY}`;
    console.log(`getting weather data: ${url}`);
    const response = await fetch(url);
    const json = await response.json();
    const d = new Date();
    const newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

    return {
        temperature: json.main.temp,
        date: d,
        user_response: feelings
    };
}