// The API key is stored in a separate untracked file
import {apiKey} from './config.js';

// If you don't have config.js, you need to get your own API key from https://openweathermap.org/api and insert it under this line. And comment out the import line above.
// const apiKey = "";


// global variables
const cityName = document.getElementById('cityName');
const countryName = document.getElementById('country');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weatherDescription');
const highLow = document.getElementById('highestLowest');
const weatherIcon = document.getElementById('weatherIcon');
const wind = document.getElementById('wind');
const background = document.getElementById('backgroundImg');
const currentLoc = document.getElementById('currentLoc');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const mainInfo = document.getElementById('mainInfo');
const forecastMenu = document.getElementById('forecast');

const itemTime = document.querySelectorAll('.itemTime');
const itemImg = document.querySelectorAll('.itemImg');
const itemTemp = document.querySelectorAll('.itemTemp');




// Function that uses the user's location to call the API
function userLoc() {
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
            
            // Fetches the data from the API 
            fetch(base)
            .then((response) => {
                return response.json();
            })
            // Stores selected data from the API in variables
            .then((data) => {
                
                const {temp} = data.main;
                const place = data.name;
                const {description, icon} = data.weather[0];
                const {country} = data.sys;
                const {temp_min, temp_max} = data.main;
                const {speed} = data.wind;
                const {main} = data.weather[0];
                
                const iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;

                // Displays the data on the page
                mainInfo.style.backgroundColor = "rgba(128, 128, 128, 0.70)";
                forecastMenu.style.backgroundColor = "rgba(128, 128, 128, 0.70)";
                cityName.textContent = place;
                countryName.textContent = country;
                temperature.textContent = `${temp.toFixed(0)} °C`;
                weatherDescription.textContent = description;
                highLow.textContent = `${temp_min.toFixed(0)} °C / ${temp_max.toFixed(0)} °C`;
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
            

            fetch(forecast)
            .then((response) => {
                return response.json();
            })

            .then((data) => {
                
                // Iterates through the first 9 list of forecasts and stores the data in variables
                for (let i = 0; i < 9; i++) {
                    const {temp} = data.list[i].main;
                    const {icon} = data.list[i].weather[0];
                    const {dt_txt} = data.list[i];
                    const time = dt_txt.slice(11, 16);

                    // Also iterates through the HTML elements and displays the data
                    itemTemp[i].textContent = `${temp.toFixed(0)} °C`;
                    itemImg[i].src = `http://openweathermap.org/img/wn/${icon}.png`;
                    itemTime[i].textContent = time;
                }


            });

        });
    }
}

currentLoc.addEventListener('click', userLoc);

// Function that uses the user's input to call the API
function searchLoc() {
    const location = searchInput.value;
    // Checks if the user has entered a location
    if(location.trim() === "") {
        alert("Please enter a location");
        
    } else {
        const base = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
        
        // Fetches the data from the API 
            fetch(base)
            .then((response) => {
                return response.json();
            
            })
            // Stores selected data from the API in variables
            .then((data) => {
                
                const {temp} = data.main;
                const place = data.name;
                const {description, icon} = data.weather[0];
                const {country} = data.sys;
                const {temp_min, temp_max} = data.main;
                const {speed} = data.wind;
                const {main} = data.weather[0];
                
                const iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;

                // Displays the data on the page
                mainInfo.style.backgroundColor = "rgba(128, 128, 128, 0.70)";
                forecastMenu.style.backgroundColor = "rgba(128, 128, 128, 0.70)";
                cityName.textContent = place;
                countryName.textContent = country;
                temperature.textContent = `${temp.toFixed(0)} °C`;
                weatherDescription.textContent = description;
                highLow.textContent = `${temp_min.toFixed(0)} °C / ${temp_max.toFixed(0)} °C`;
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

            const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;
            

            fetch(forecast)
            .then((response) => {
                return response.json();
            })

            .then((data) => {
                
                // Iterates through the first 9 list of forecasts and stores the data in variables
                for (let i = 0; i < 9; i++) {
                    const {temp} = data.list[i].main;
                    const {icon} = data.list[i].weather[0];
                    const {dt_txt} = data.list[i];
                    const time = dt_txt.slice(11, 16);

                    // Also iterates through the HTML elements and displays the data
                    itemTemp[i].textContent = `${temp.toFixed(0)} °C`;
                    itemImg[i].src = `http://openweathermap.org/img/wn/${icon}.png`;
                    itemTime[i].textContent = time;
                }


            });
    searchInput.value = "";
    }
    
}

searchBtn.addEventListener('click', searchLoc);




