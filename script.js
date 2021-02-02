var APIkey = "2d5743245871b8e658d41b44bc1e6167";

var searchBtn = document.querySelector("#listen");
console.log(searchBtn);

var cityInput =document.querySelector("#city-search");
console.log(cityInput.value);

var currentTemp;
var currentHum;
var currWind;

function getCurrentWeather(searchedCity) {
    console.log(searchedCity)
    var currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput.value + "&appid=" + APIkey;
    console.log(currentWeatherUrl);
  
    fetch(currentWeatherUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json()
          .then(function (data) {
            console.log(data);
            currentTemp = data.main.temp;
            console.log(data.main.temp);
            console.log("current temp: " + currentTemp);
            currentHum = data.main.humidity;
            console.log(data.main.humidity);
            console.log("current humidity: " + currentHum);
            currentWind = data.wind.speed;
            console.log(data.wind.speed);
            console.log("current wind: " + currentWind);

            cityLat = data.coord.lat;
            console.log("Lat: " + cityLat);

            cityLon = data.coord.lon;
            console.log("Lon: " + cityLon);

            console.log("Temp type: " + typeof(currentTemp));
            console.log("Humidity type: " + typeof(currentHum));
            console.log("Wind type: " + typeof(currentWind));

            displayCurrent();
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to OpenWeather');
      });
  };

function displayCurrent() {
    currentCityEl = document.getElementById("current-city");
    currentCityEl.textContent = cityInput.value;
    console.log("Current city: " + currentCityEl.textContent);
    console.log("current temp: " + currentTemp);

    currentTempEl = document.getElementById("current-temp");
    currentTempEl.textContent = "Temperature: " + currentTemp;

    currentHumEl = document.getElementById("current-humidity");
    currentHumEl.textContent = "Humidity: " + currentHum;

    currentWindEl = document.getElementById("current-wind");
    currentWindEl.textContent = "Wind Speed: " + currentWind;
}

// function getUVI() {

// }

console.log("Temp type: " + typeof(currentTemp));
console.log("Humidity type: " + typeof(currentHum));
console.log("Wind type: " + typeof(currentWind));

searchBtn.addEventListener("click", getCurrentWeather);
// searchBtn.addEventListener("click", displayCurrent);

searchBtn.addEventListener("submit", getCurrentWeather);
// searchBtn.addEventListener("submit", displayCurrent);