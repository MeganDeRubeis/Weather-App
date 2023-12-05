//
function todaysDate() {
  let currentTime = new Date();
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = days[currentTime.getDay()];
  let month = months[currentTime.getMonth()];
  let date = currentTime.getDate();
  let year = currentTime.getFullYear();

  let today = document.querySelector("#todaysDate");
  today.innerHTML = `${hours}:${minutes}, ${day} ${month} ${date}, ${year}`;
}
todaysDate();

function handleSubmit(event) {
  event.preventDefault();
  let cityName = document.querySelector("#cityName");
  let heading = document.querySelector("h1");
  heading.innerHTML = cityName.value;
  search(cityName.value);
}

function search(city) {
  let apiKey = "e9fa3919fc5edf9342028b77dc81f90d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherConditions);
}

searchCity(city);

let form = document.querySelector("#searchForm");
form.addEventListener("submit", handleSubmit);

//

function searchCity(city) {}

function displayWeatherConditions(response) {
  let heading = document.querySelector("h1");
  heading.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${temperature}°C`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  let iconElement = document.querySelector(".weather-app-icon");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

search("Denton");

//

function searchLocation(position) {
  let apiKey = "e9fa3919fc5edf9342028b77dc81f90d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let button = document.querySelector(".location-button");
button.addEventListener("click", getCurrentPosition);
//

function getForecast(city) {
  let apiKey = "e9fa3919fc5edf9342028b77dc81f90d";
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast/daily?lat=44.34&lon=10.99&cnt=7&appid={API key}";
  axios(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

function displayForecast(response) {
  console.log(response.data);
  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
<div class="weekly-forecast-day">
            <div class="weekly-forecast-date"> ${day}</div>
          <div class="weekly-forecast-icon"> 🌞</div>
            <div class="weekly-forecast-temperature">
              <span class="weekly-forecast-temperature-max"> 18° </span>
              <span class="weekly-forecast-temperature-min"> 12° </span>
            </div>
          </div>
        </div>
`;
  });

  forecast.innerHTML = forecastHtml;
}

getForecast("Denton");
