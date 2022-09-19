"use strict";
const temperature = document.querySelector(".temperature-degree");
const celsiusUnit = document.querySelector(".celsius");
const fahUnit = document.querySelector(".fah");
const city = document.querySelector(".city");
const hour = document.querySelector(".hr");
const min = document.querySelector(".min");
const day = document.querySelector(".day");
const date = document.querySelector(".date");
const month = document.querySelector(".month");
const year = document.querySelector(".year");
const weatherIcon = document.querySelector(".icon");
const weatherIconDesc = document.querySelector(".icon-desc");
const form = document.querySelector(".weather-form");
const weatherInput = document.querySelector("input");
const cityInput = document.querySelector("#search-city-input");
const searchBtn = document.querySelector(".searchButton");
const weatherStatCloudyData = document.querySelector(".cloudy-data");
const humidityData = document.querySelector(".humidity-data");
const windData = document.querySelector(".wind-data");

let currentDate = new Date();
const currentHr = currentDate.getHours();
hour.innerHTML = currentHr;

const currentMin = currentDate.getMinutes();
min.innerHTML = currentMin;

//days of the week
let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
const dayResult = days.map((i, day) => (day, i));

const currentDay = currentDate.getDay();
day.innerHTML = dayResult[currentDay];

//months
let months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Oct",
  "NOv",
  "Dec",
];

const monthInWords = months.map((i, month) => (month, i));

const currentMonth = currentDate.getMonth();
month.innerHTML = monthInWords[currentMonth];

const currentYear = currentDate.getFullYear();
year.innerHTML = currentYear;

const handleGetData = (res) => {
  celsiusTemperature = res.data.main.temp;

  temperature.innerHTML = Math.round(celsiusTemperature);
  weatherIcon.innerHTML = res.data.weather[0].icon;
  weatherIconDesc.innerHTML = res.data.weather[0].description;
  humidityData.innerHTML = res.data.main.humidity + "%";
  windData.innerHTML = Math.round(res.data.wind.speed) + "Km/hr";
  city.innerHTML = res.data.name;
  weatherIcon.setAttribute(
    "src",
    ` http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", res.data.weather[0].description);
};

function searchCity(city) {
  const apiKey = "203fa770242fcd2b9555d832a88ea567";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios
    .get(apiUrl)
    .then((res) => handleGetData(res))
    .catch((err) => console.log(err));
}

const handleSubmitSearchCity = (e) => {
  e.preventDefault();
  searchCity(cityInput.value);
};
form.addEventListener("submit", handleSubmitSearchCity);

function displayCelsiusTemp(e) {
  e.preventDefault();
  temperature.innerHTML = Math.round(celsiusTemperature);
}

function displayFahTemp(e) {
  e.preventDefault();
  let fahTemp = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahTemp);
}

let celsiusTemperature = null;

celsiusUnit.addEventListener("click", displayCelsiusTemp);
fahUnit.addEventListener("click", displayFahTemp);
searchCity("Lagos")