# Weather Dashboard

## Value Add Proposal

Application leverages the OpenWeather API to allow users to search by city name and receive current conditions for that city, as well as a brief 5 day forecast. Last searched city will immediately be searched upon page load.


## Functionality

### Searching and history

App includes search bar for users to enter city name. Search initiates a fetch function that calls the OpenWeather API to receive data on the requested city. It will also store the name searched to local storage. Initialization function is called upon page load which will retrieve this city name and call the search function with it.


### Current conditions

Search function reads data on current temperature, current humidity, current windspeed, and the associated png file for current conditions and saves these values to variables. Variables are fed to a display function that modifies the html of the page in order to display this information.

Because UV Index data is not included in the API's current conditions call url, a separate function called within the search function is used to retrieve this. The main search function retrieves the searched cities latitude and longitude coordinates, which are fed to the UVI search function to retrieve the current UV Index.

UVI display function works in the same way as the current conditions display function, but also includes conditional statements to apply a css class to color the UVI field according to the severity of the UV index.


### 5 day forecast

Once again, a separate call url within the API is needed to retrieve 5-day forecast data. The search function then retrieves the date, conditions-icon, temperature, and humidity values from selected indices within the returned object and assigns them to corresponding variables, a full set for all 5 upcoming days.

Another display function is called within the 5-day-forecast search function in order to modify the html elements, as with the prior current conditions display function.


## Reference 

![Screenshot of app](/Assets\WeatherDashboardSC.JPG)

App can be accessed at [https://dboren.github.io/db_hw_WeatherDashboard/](https://dboren.github.io/db_hw_WeatherDashboard/)