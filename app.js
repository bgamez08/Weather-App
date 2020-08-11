window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureSection = document.querySelector('.temperature-section');
    let temperatureSpan = document.querySelector('.temperature-section span');
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let icon = document.getElementById('icon');
    let preLoadSec = document.querySelector('.preload_sec');


    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;


            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=6c7c7efe91c40a3dc975c1c8782ed1a9
            `;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {temp} = data.main;
                    const description = data.weather[0].description;
                    //Set DOM Elements from the API
                    temperatureDegree.textContent = Math.floor(temp);
                    temperatureDescription.textContent = description;
                    locationTimezone.textContent = data.name;

                    let celsius = (temp - 32) * (5 / 9);

                    const icon_id = data.weather[0].icon;
                    icon.src = "http://openweathermap.org/img/wn/" + icon_id + "@2x.png";

                    temperatureSection.addEventListener("click", () => {
                        if(temperatureSpan.textContent === 'F') {
                            temperatureSpan.textContent = 'C';
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = 'F';
                            temperatureDegree.textContent = Math.floor(temp);
                        }
                    });

                    temperatureSpan.style.display = 'block';
                    preLoadSec.style.display = 'none';
                });
        });
    }
});