let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let now = new Date();
let formattedDayTime = document.querySelector("#date-time");
let currentDay = days[now.getDay()];
let currentHour = now.getHours();
let currentMinutes = now.getMinutes();

formattedDayTime.innerHTML = `${currentDay}, ${currentHour}:${currentMinutes}`;

let cityInput = document.querySelector("#city-search");

function currentWeather(response) {
  let cityElement = document.querySelector("#city");
  document.querySelector("#temp-now").innerHTML = Math.round(
    response.data.main.temp
  );
  cityElement.innerHTML = cityInput.value;
}

function searchCity(response) {
  let apiKey = "29ed711e6c528e8877439d3d2d9efee4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(currentWeather);
}
function search(event) {
  event.preventDefault();
  searchCity();
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("click", search);

function displayCurrentWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp-now").innerHTML = Math.round(
    response.data.main.temp
  );
}

function searchLocation(position) {
  let apiKey = "29ed711e6c528e8877439d3d2d9efee4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayCurrentWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#btn-current");
currentLocationButton.addEventListener("click", getCurrentLocation);
