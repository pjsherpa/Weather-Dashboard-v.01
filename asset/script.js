// create DOM so I can access my codes to the display section
// form-write a city's name and a local storage is waiting for this to store it
var searchforCity = document.getElementById("searchforCity");

// for addEventListener the local storage is activated once this addvenlistener is activated
var searchbtn = document.getElementsByClassName("btn");
// display new-btn here:We need to have an event target activated here so we can use this again
var listBtn = document.getElementById("listBtn");
//display current weather here
var currentWeather = document.getElementById("weatherContainer");
//display weather forecast here
var forecast = document.getElementById("Forecast");
//api Key to be added when we fetch the url
var apiKey = "f2c131fc5bc12a5320fc9c5062b3a515";

renderLastCityName();
var handleFormSubmit = function (event) {
  event.preventDefault();

  var cityName = searchforCity.value.trim();

  if (cityName) {
    var printCityname = function (City) {
      getCitySearch(City);
      var newBtn = document.createElement("button");
      newBtn.classList = "btn btn-secondary";
      newBtn.style.marginTop = "30px";
      newBtn.style.width = "18rem";
      var listDetail = City;
      newBtn.textContent = listDetail;
      listBtn.appendChild(newBtn);
      // reset form
      searchforCity.value.trim("");
      localStorage.setItem("cityName", listDetail);
    };
  } else {
    alert("Please enter a City name");
  }

  printCityname(cityName);
};
//create the buttons

function getCitySearch(search) {
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=imperial&appid=${apiKey}`;
  //this clears out the weathercotainer when multipleclicks are made
  currentWeather.textContent = " ";
  console.log(url);
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data, search) {
      var latitude = data.coord.lat;
      var longitude = data.coord.lon;

      var urlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}&cnt=5`;
      console.log(urlForecast);
      fetch(urlForecast)
        .then(function (response) {
          return response.json();
        })
        .then(function (data, search) {
          var hCity = document.createElement("h3");
          var city = searchforCity.value.trim();
          hCity.textContent = city;
          var htoday = document.createElement("h3");
          var today = moment();
          var date = today.format("MMM Do, YYYY");
          htoday.textContent = date;
          var ptemp = document.createElement("p");
          var temp = `Temp:${data.current.temp} ℉`;
          ptemp.textContent = temp;
          var pwind = document.createElement("p");
          var wind = `Wind:${data.current.wind_speed} MPH`;
          pwind.textContent = wind;
          var pHumidity = document.createElement("p");
          var wind = `Humidity:${data.current.humidity} %`;
          pHumidity.textContent = wind;
          var pUvi = document.createElement("p");
          var sUvi = document.createElement("span");
          var last = `UV Index:`;
          var uviInd = data.current.uvi;
          sUvi.textContent = uviInd;
          pUvi.textContent = last;
          currentWeather.appendChild(hCity);
          currentWeather.appendChild(htoday);
          currentWeather.appendChild(ptemp);
          currentWeather.appendChild(pwind);
          currentWeather.appendChild(pHumidity);
          pUvi.appendChild(sUvi);
          currentWeather.appendChild(pUvi);
          if (uviInd <= 2) {
            //favourable
            sUvi.style.background = "green";
          } else if (uviInd > 2 && uviInd <= 6) {
            //moderate
            sUvi.style.background = "yellow";
          } else {
            //severe
            sUvi.style.background = "red";
          }
          for (i = 1; i < 6; i++) {
            var div = document.createElement("div");
            var divC = div.classList.add("card-body");
            var pIcon = document.createElement("p");
            var icon = data.daily[i].weather.icon;
            pIcon.textContent = icon;
            var pTemps = document.createElement("p");
            var temps = `Temp:${data.daily[i].temp} ℉`;
            pTemps.textContent = temp;
            var pWinds = document.createElement("p");
            var winds = `Wind:${data.daily[i].wind_speed}`;
            pWinds.textContent = winds;
            var phumiditys = document.createElement("p");
            var humiditys = `Humidity:${data.daily[i].humidity}`;
            phumiditys.textContent = humiditys;
            div.appendChild(pIcon);
            div.appendChild(pTemps);
            div.appendChild(pWinds);
            div.appendChild(phumiditys);
            forecast.appendChild(div);
          }
        });
    });
}
function renderLastCityName(event) {
  lastCityName = localStorage.getItem("cityName");
  searchforCity.value.trim();
}

searchbtn[0].addEventListener("click", handleFormSubmit);
renderLastCityName();
