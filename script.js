var APIkey = "2d5743245871b8e658d41b44bc1e6167";

var searchButton = document.getElementById("searchBtn");



function getCurrentWeather(searchedCity) {
    var currentWeatherUrl = "api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=" + APIkey;
  
    fetch(currentWeatherUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to OpenWeather');
      });
  };

searchButton.addEventListener("submit", searchedCity, getCurrentWeather);