const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {

    if (city.trim() === "") {
        alert("Please enter city name");
        return;
    }

    const api_key = "5efdb2e36ad4c9f78729e68c72accdd9";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

    try {
        const response = await fetch(url);
        const weather_data = await response.json();

        console.log(weather_data);

        if (weather_data.cod != 200) {
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            return;
        }

        location_not_found.style.display = "none";
        weather_body.style.display = "flex";

        temperature.innerHTML = `${Math.round(weather_data.main.temp)}°C`;
        description.innerHTML = weather_data.weather[0].description;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${weather_data.wind.speed} Km/h`;

        const weatherMain = weather_data.weather[0].main;

        if (weatherMain === "Clouds") {
            weather_img.src = "assets/cloud.png";
        } else if (weatherMain === "Clear") {
            weather_img.src = "assets/clear.png";
        } else if (weatherMain === "Rain") {
            weather_img.src = "assets/rain.png";
        } else if (weatherMain === "Mist") {
            weather_img.src = "assets/mist.png";
        } else if (weatherMain === "Snow") {
            weather_img.src = "assets/snow.png";
        } else {
            weather_img.src = "assets/cloud.png";
        }

    } catch (error) {
        console.log("Error:", error);
        alert("Network ya API error!");
    }
}

// Button click
searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});

// Enter key
inputBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkWeather(inputBox.value);
    }
});