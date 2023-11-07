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
        });
    }
});








