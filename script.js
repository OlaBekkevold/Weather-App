// The API key is stored in a separate untracked file
import {apiKey} from './config.js';

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
                
                const iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;
            })
        });
    }
});








