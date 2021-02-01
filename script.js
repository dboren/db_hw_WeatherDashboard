var APIkey = "2d5743245871b8e658d41b44bc1e6167";

var searchBtn = document.querySelector("#listen");
console.log(searchBtn);

var testInput =document.querySelector("#city-search");
console.log(testInput);

function getCurrentWeather(searchedCity) {
    console.log(searchedCity)
    var currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=" + APIkey;
    console.log(currentWeatherUrl);
  
    fetch(currentWeatherUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data);
            console.log(searchedCity);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to OpenWeather');
      });
  };

searchBtn.addEventListener("click", getCurrentWeather);