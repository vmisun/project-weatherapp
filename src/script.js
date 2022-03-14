function showDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];

  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  let month = months[now.getMonth()];
  let year = now.getFullYear();
  let date = now.getDate();
  if (date < 10) {
    date = `0${date}`;
  }

  let currentDate = document.querySelector("#date");
  currentDate.innerHTML = `${day}, ${date}.${month}.${year}`;
}

function showTime(now) {
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let seconds = now.getSeconds();

  let currentTime = document.querySelector("#time");
  currentTime.innerHTML = `${hour}:${minutes}:${seconds}`;
}

let now = new Date();
showDate(now);
showTime(now);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let teperatureElement = document.querySelector("#degrees");
  teperatureElement.innerHTML = `${temperature}`;

  let cityDisplay = document.querySelector("h1");
  cityDisplay.innerHTML = response.data.name;
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
