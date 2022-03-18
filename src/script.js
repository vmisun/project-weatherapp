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
  let temperature = Math.round(response.data.main.temp);
  let teperatureElement = document.querySelector("#degrees");
  teperatureElement.innerHTML = `${temperature}`;

  let cityDisplay = document.querySelector("h1");
  cityDisplay.innerHTML = response.data.name;

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
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
