var APIkey = "2d5743245871b8e658d41b44bc1e6167";

var searchBtn = document.querySelector("#listen");
console.log(searchBtn);

var cityInput =document.querySelector("#city-search");
console.log(cityInput.value);

var currentTemp;

function getCurrentWeather(searchedCity) {
    console.log(searchedCity)
    var currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput.value + "&appid=" + APIkey;
    console.log(currentWeatherUrl);
  
    fetch(currentWeatherUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data);
            console.log(searchedCity);
          });
          currentTemp = data.main.temp;
          console.log(currentTemp);
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

    currentTemp = document.getElementById("current-temp");
    // currentTemp.textContent = data.main.temp;
}

searchBtn.addEventListener("click", getCurrentWeather);
searchBtn.addEventListener("click", displayCurrent);

searchBtn.addEventListener("submit", getCurrentWeather);
searchBtn.addEventListener("submit", displayCurrent);