var APIkey = "2d5743245871b8e658d41b44bc1e6167";

var searchBtn = document.querySelector("#listen");
console.log(searchBtn);

var cityInput =document.querySelector("#city-search");
console.log(cityInput.value);

var currentTemp;
var currentHum;
var currWind;

var cityLat;
var cityLon;

var currentUVI;

var day1Temp;
var day2Temp;
var day3Temp;
var day4Temp;
var day5Temp;

var day1Hum;
var day2Hum;
var day3Hum;
var day4Hum;
var day5Hum;

//Function to get current weather for desired city. Runs when search button is clicked

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

            getUVI(cityLat, cityLon);

            console.log(currentUVI);

            console.log("Temp type: " + typeof(currentTemp));
            console.log("Humidity type: " + typeof(currentHum));
            console.log("Wind type: " + typeof(currentWind));

            displayCurrent();

          
          });
        } else {
          alert("Error: " + response.statusText);
        }
      })
      .catch(function (error) {
        alert("Unable to connect to OpenWeather");
      });
  };

//Displays current weather conditions on screen in the html. Called within getCurrentWeather function

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

//Function to display UV Index onscreen. Called within getUVI function

function displayUVI() {
    currentUviEl = document.getElementById("current-uv")
    currentUviEl.textContent = "UV Index: " + currentUVI;
}

//Function to get UV index. Called within getCurrentWeather function

function getUVI(y, x) {
  var UVIURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + y + "&lon=" + x + "&cnt=0&appid=" + APIkey;
  console.log("Lat: " + cityLat);
  console.log("Lon: " + cityLon);
  console.log(UVIURL);

  fetch(UVIURL)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json()
          .then(function (uvData) {
            console.log(uvData);

            currentUVI = uvData[0].value;
            console.log("Current UVI: " + currentUVI);
            console.log(typeof(currentUVI));

            displayUVI();
          })

      
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to OpenWeather");
    })
}

//Function to get 5-day forecast data

function getForecast(searchedCity) {
  console.log(searchedCity)
  var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityInput.value + "&appid=" + APIkey;
  console.log(forecastURL);

  fetch(forecastURL)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json()
        .then(function (forcData) {
          console.log(forcData);
        
           day1Temp = forcData.list[3].main.temp;
           day2Temp = forcData.list[11].main.temp;
           day3Temp = forcData.list[19].main.temp;
           day4Temp = forcData.list[27].main.temp;
           day5Temp = forcData.list[35].main.temp;

           day1Hum = forcData.list[3].main.humidity;
           day2Hum = forcData.list[11].main.humidity;
           day3Hum = forcData.list[19].main.humidity;
           day4Hum = forcData.list[27].main.humidity;
           day5Hum = forcData.list[35].main.humidity;
        
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to OpenWeather");
    });
};


//Function to display 5 day forecast. Called within getForecast function

function displayForecast() {
  day1TempEl = document.getElementById("current-uv")
  day1TempEl.textContent = "UV Index: " + currentUVI;
}


console.log("Temp type: " + typeof(currentTemp));
console.log("Humidity type: " + typeof(currentHum));
console.log("Wind type: " + typeof(currentWind));
console.log("UVI: " + typeof(currentUVI));

searchBtn.addEventListener("click", getCurrentWeather);
// searchBtn.addEventListener("click", displayCurrent);
searchBtn.addEventListener("click", getForecast);

searchBtn.addEventListener("submit", getCurrentWeather);
// searchBtn.addEventListener("submit", displayCurrent);