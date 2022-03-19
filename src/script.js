function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  if (seconds < 10) {
    seconds = `0${seconds}`;
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
  let day = days[date.getDay()];

  return `${day} ${hour}:${minutes}:${seconds}`;
}

function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  let teperatureElement = document.querySelector("#degrees");
  teperatureElement.innerHTML = Math.round(celsiusTemperature);

  let cityDisplay = document.querySelector("h1");
  cityDisplay.innerHTML = response.data.name;

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCityName(cityName) {
  let apiKey = "2470148643555d29aa7196388b7e0cac";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  axios
    .get(`${apiUrl}q=${cityName}&appid=${apiKey}&units=metric`)
    .then(showTemperature);
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-bar");
  if (searchInput.value) {
    searchCityName(searchInput.value);
  } else {
    let cityDisplay = document.querySelector("#search-bar");
    cityDisplay.innerHTML = null;
    alert("Search for a city.");
  }
}

let searchEngine = document.querySelector(".searchBar");
searchEngine.addEventListener("submit", searchCity);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}`;
  let apiKey = "2470148643555d29aa7196388b7e0cac";
  axios.get(`${apiUrl}&appid=${apiKey}&units=metric`).then(showTemperature);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#location");
locationButton.addEventListener("click", getCurrentLocation);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let currentTemperature = document.querySelector("#degrees");
  currentTemperature.innerHTML = Math.round(fahrenheitTemperature);

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#degrees");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);

  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  <div class="col-2 column">
    <img
      src="http://openweathermap.org/img/wn/01n@2x.png"
      alt="Clear Sky"
      class="icon"
    />
    <h3>${day}</h3>
    <p>
      7<span class="degrees">°C</span>
    </p>
  </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

searchCityName("London");
displayForecast();
