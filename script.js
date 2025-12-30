const apiKey = '916756255419e96ef61bf9ae2389515e';
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const cityName = document.getElementById('cityName');
const temp = document.getElementById('temp');
const description = document.getElementById('description');
const container = document.querySelector('.container');
const modeBtn = document.getElementById('modeBtn');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (!city) return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(res => res.json())
        .then(data => {
            cityName.textContent = data.name + ', ' + data.sys.country;
            temp.textContent = Math.round(data.main.temp) + '°C';
            description.textContent = data.weather[0].description;
            container.className = 'container';
            const weatherMain = data.weather[0].main.toLowerCase();
            if (weatherMain.includes('clear')) container.classList.add('clear');
            else if (weatherMain.includes('cloud')) container.classList.add('clouds');
            else if (weatherMain.includes('rain') || weatherMain.includes('drizzle')) container.classList.add('rain');
            else if (weatherMain.includes('snow')) container.classList.add('snow');
            else if (weatherMain.includes('thunder')) container.classList.add('thunderstorm');
        });
});

modeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
    modeBtn.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
});

document.body.classList.add('light-mode');
