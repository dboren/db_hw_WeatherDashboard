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

var currDate;

var fd1;
var fd2;
var fd3;
var fd4;
var fd5;

var currIcon;

var d1icon;
var d2icon;
var d3icon;
var d4icon;
var d5icon;

//Function to get current weather for desired city. Runs when search button is clicked

function getCurrentWeather(searchedCity) {
    console.log(searchedCity)
    var currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput.value + "&units=imperial&appid=" + APIkey;
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

            currIcon = "http://openweathermap.org/img/wn/" + data.weather[0].icon +"@2x.png";

            // currDate = data.main. 

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
    currentCityEl.textContent = cityInput.value + " - Current conditions ";

    currIconEl = document.getElementById("current-icon").src = currIcon;
    currIconEl = document.getElementById("current-icon").style.visibility = "visible";
    // currIconEl.src = "currIcon";

    console.log("Current city: " + currentCityEl.textContent);
    console.log("current temp: " + currentTemp);

    currentTempEl = document.getElementById("current-temp");
    currentTempEl.textContent = "Temperature: " + currentTemp + " °F";

    currentHumEl = document.getElementById("current-humidity");
    currentHumEl.textContent = "Humidity: " + currentHum + "%";

    currentWindEl = document.getElementById("current-wind");
    currentWindEl.textContent = "Wind Speed: " + currentWind + " MPH";
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

           fd1 = forcData.list[3].dt_txt;
           console.log("Type: " + typeof(fd1));
           console.log("Day 1: " + fd1);

           fd2 = forcData.list[11].dt_txt;
           fd3 = forcData.list[19].dt_txt;
           fd4 = forcData.list[27].dt_txt;
           fd5 = forcData.list[35].dt_txt;

           displayForecast();
        
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
  day1TempEl = document.getElementById("d1t")
  day1TempEl.textContent = "Temp: " + day1Temp + " °F";
  day2TempEl = document.getElementById("d2t")
  day2TempEl.textContent = "Temp: " + day2Temp + " °F";
  day3TempEl = document.getElementById("d3t")
  day3TempEl.textContent = "Temp: " + day3Temp + " °F";
  day4TempEl = document.getElementById("d4t")
  day4TempEl.textContent = "Temp: " + day4Temp + " °F";
  day5TempEl = document.getElementById("d5t")
  day5TempEl.textContent = "Temp: " + day5Temp + " °F";

  day1HumEl = document.getElementById("d1h")
  day1HumEl.textContent = "Humidity: " + day1Hum + "%";
  day2HumEl = document.getElementById("d2h")
  day2HumEl.textContent = "Humidity: " + day2Hum + "%";
  day3HumEl = document.getElementById("d3h")
  day3HumEl.textContent = "Humidity: " + day3Hum + "%";
  day4HumEl = document.getElementById("d4h")
  day4HumEl.textContent = "Humidity: " + day4Hum + "%";
  day5HumEl = document.getElementById("d5h")
  day5HumEl.textContent = "Humidity: " + day5Hum + "%";

  day1DateEl = document.getElementById("date-1");
  day1DateEl.textContent = fd1;
  day2DateEl = document.getElementById("date-2");
  day2DateEl.textContent = fd2;
  day3DateEl = document.getElementById("date-3");
  day3DateEl.textContent = fd3;
  day4DateEl = document.getElementById("date-4");
  day4DateEl.textContent = fd4;
  day5DateEl = document.getElementById("date-5");
  day5DateEl.textContent = fd5;
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