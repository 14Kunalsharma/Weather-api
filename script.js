const apiKey = '916756255419e96ef61bf9ae2389515e';

document.getElementById("search-btn").addEventListener("click", () => {
    const city = document.getElementById("city-input").value.trim();
    if(city) getWeather(city);
});

document.getElementById("city-input").addEventListener("keypress", (e) => {
    if(e.key === "Enter"){
        const city = document.getElementById("city-input").value.trim();
        if(city) getWeather(city);
    }
});

async function getWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        const data = await response.json();

        if(data.cod === 200){
            document.getElementById("city-name").textContent = `${data.name}, ${data.sys.country}`;
            document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
            document.getElementById("description").textContent = `Weather: ${data.weather[0].description}`;
            document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
            document.getElementById("wind").textContent = `Wind Speed: ${data.wind.speed} m/s`;
            changeBackground(data.weather[0].main);
        } else {
            document.getElementById("city-name").textContent = "City not found";
            document.getElementById("temperature").textContent = "";
            document.getElementById("description").textContent = "";
            document.getElementById("humidity").textContent = "";
            document.getElementById("wind").textContent = "";
            document.body.style.backgroundImage = '';
        }
    } catch (error) {
        console.log("Error fetching weather data:", error);
    }
}

function changeBackground(weather) {
    let url = '';
    switch(weather.toLowerCase()){
        case 'clear':
            url = 'url("images/clear.jpg")';
            break;
        case 'clouds':
            url = 'url("images/clouds.jpg")';
            break;
        case 'rain':
        case 'drizzle':
            url = 'url("images/rain.jpg")';
            break;
        case 'thunderstorm':
            url = 'url("images/thunderstorm.jpg")';
            break;
        case 'snow':
            url = 'url("images/snow.jpg")';
            break;
        case 'mist':
        case 'fog':
        case 'haze':
            url = 'url("images/mist.jpg")';
            break;
        default:
            url = 'url("images/default.jpg")';
    }
    document.body.style.backgroundImage = url;
}

const themeBtn = document.getElementById("theme-btn");
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if(document.body.classList.contains("dark-mode")){
        themeBtn.textContent = "Switch to Light Mode";
    } else {
        themeBtn.textContent = "Switch to Dark Mode";
    }
});
