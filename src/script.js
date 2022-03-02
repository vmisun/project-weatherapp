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

function showCity(event) {
  event.preventDefault();
  let searchBar = document.querySelector("#search-bar");
  let city = document.querySelector("h1");
  city.innerHTML = `${searchBar.value}`;
}

let formCity = document.querySelector(".searchBar");
formCity.addEventListener("submit", showCity);

function changeUnitToC(event) {
  event.preventDefault();
  let degrees = document.querySelector("#degrees");
  degrees.innerHTML = 9;
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeUnitToC);

function changeUnitToF(event) {
  event.preventDefault();
  let degrees = document.querySelector("#degrees");
  degrees.innerHTML = 66;
}
let fahrenheitButton = document.querySelector("#fahrenheit-link");
fahrenheitButton.addEventListener("click", changeUnitToF);
