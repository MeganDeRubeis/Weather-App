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
  let apiKey = "t760b4d120976d8c733c3b90a42oe02f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherConditions);
}

searchCity(city);

let form = document.querySelector("#searchForm");
form.addEventListener("submit", handleSubmit);

//

function searchCity(city) {}

function displayWeatherConditions(response) {
  let heading = document.querySelector("h1");
  heading.innerHTML = response.data.city;
  let temperature = Math.round(response.data.temperature.current);
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${temperature}°C`;
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;

  let iconElement = document.querySelector(".weather-app-icon");

  iconElement.setAttribute("src", response.data.condition.icon_url);
  getForecast(response.data.coordinates);
}

search("Denton");

//

function searchLocation(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "t760b4d120976d8c733c3b90a42oe02f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherConditions);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let button = document.querySelector(".location-button");
button.addEventListener("click", getCurrentPosition);
//

function getForecast(coordinates) {
  console.log(coordinates);
  let lat = coordinates.latitude;
  let lon = coordinates.longitude;
  let apiKey = "t760b4d120976d8c733c3b90a42oe02f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}`;
  axios(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  console.log(response.data);
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
  <div class="weekly-forecast-day">
              <div class="weekly-forecast-date">${formatDay(day.time)}</div>
            <div class="weekly-forecast-icon"> 
            <img src= "${
              day.condition.icon_url
            }" class = "weather-forecast-icon" />
            </div>
              <div class="weekly-forecast-temperature">
                <span class="weekly-forecast-temperature-max"> ${Math.round(
                  day.temperature.maximum
                )} ° </span>
                <span class="weekly-forecast-temperature-min">${Math.round(
                  day.temperature.minimum
                )} ° </span>
              </div>
            </div>
          </div>
  `;
    }
  });

  forecast.innerHTML = forecastHtml;
}
