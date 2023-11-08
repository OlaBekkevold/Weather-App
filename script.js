// The API key is stored in a separate untracked file
import {apiKey} from './config.js';

const cityName = document.getElementById('cityName');
const countryName = document.getElementById('country');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weatherDescription');
const highLow = document.getElementById('highestLowest');
const weatherIcon = document.getElementById('weatherIcon');
const wind = document.getElementById('wind');
const background = document.getElementById('backgroundImg');

// This function will activate when the page is loaded
window.addEventListener('load', () => {
    let long;
    let lat;
    // Checks if the user's location is available
    if (navigator.geolocation) {
        // If the user's location is available, the position is stored in the variables long and lat
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            // Calls the API with the user's location
            const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
            console.log(base);
            // Fetches the data from the API 
            fetch(base)
            .then((response) => {
                return response.json();
            })
            // Stores selected data from the API in variables
            .then((data) => {
                console.log(data);
                const {temp} = data.main;
                const place = data.name;
                const {description, icon} = data.weather[0];
                const {country} = data.sys;
                const {temp_min, temp_max} = data.main;
                const {speed} = data.wind;
                const {main} = data.weather[0];
                
                const iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;

                // Displays the data on the page
                cityName.textContent = place;
                countryName.textContent = country;
                temperature.textContent = `${temp.toFixed(2)} °C`;
                weatherDescription.textContent = description;
                highLow.textContent = `${temp_min.toFixed(2)} °C / ${temp_max.toFixed(2)} °C`;
                weatherIcon.src = iconUrl;
                wind.textContent = `🍃: ${speed} m/s`;
                // Changes the background image based on the weather
                switch(main) {
                    case "Clouds":
                        background.src = "img/cloudy.jpg";
                        break;
                    case "Clear":
                        background.src = "img/clear.jpg";
                        break;
                    case "Rain":
                        background.src = "img/rain.jpg";
                        break;
                    case "Snow":
                        background.src = "img/snow.jpg";
                        break;
                    case "Thunderstorm":
                        background.src = "img/thunderstorm.jpg";
                        break;
                    case "Drizzle":
                        background.src = "img/drizzle.jpg";
                        break;
                    default:
                        background.src = "img/default.jpg";

                }
            });

            const forecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
            console.log(forecast);

            fetch(forecast)
            .then((response) => {
                return response.json();
            })

            .then((data) => {
                console.log(data);
            });

        });
    }
});








