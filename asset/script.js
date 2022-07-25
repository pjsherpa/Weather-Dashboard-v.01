var searchforCity = document.getElementById("searchforCity");
var searchbtn = document.getElementsByClassName("btn");
var listBtn = document.getElementById("listBtn");
var currentWeather = document.getElementById("weatherContainer");
var forecast = document.getElementById("Forecast");
var apiKey = "f2c131fc5bc12a5320fc9c5062b3a515";
var previousSearch = [];

function renderSearch() {
  // Clear todoList element and update todoCountSpan
  var cityName = searchforCity.value.trim();

  // Render a new li for each todo
  for (var i = 0; i < previousSearch.length; i++) {
    var previousSearches = previousSearch[i];

    var li = document.createElement("li");
    li.classList = "btn btn-secondary data-city";
    li.style.marginTop = "30px";
    li.style.width = "18rem";
    li.textContent = previousSearches;
    li.value.trim = previousSearches;
    console.log(li);
    li.setAttribute("data-index", i);

    var newBtn = document.createElement("button");

    newBtn.appendChild(li);
    listBtn.appendChild(li);
  }
}
// This function is being called below and will run when the page loads.
function init() {
  // Get stored todos from localStorage
  var storedSearches = JSON.parse(localStorage.getItem("previousSearch"));
  // If todos were retrieved from localStorage, update the todos array to it
  if (storedSearches !== null) {
    previousSearch = storedSearches;
  }
  // This is a helper function that will render todos to the DOM
  renderSearch();
}

function storeSearches() {
  // Stringify and set key in localStorage to todos array
  localStorage.setItem("previousSearch", JSON.stringify(previousSearch));
}

var handleFormSubmit = function (event) {
  event.preventDefault();

  var cityName = searchforCity.value.trim();
  if (cityName) {
    getCitySearch(cityName);
    previousSearch.push(cityName);
    // searchforCity.value = "";
  } else {
    alert("Please enter a City name");
  }
  // renderSearch();
  storeSearches();
};

var buttonClickHandler = function (event) {
  event.preventDefault();
  var selectCity = event.target;
  console.log(selectCity);
  if (selectCity) {
    getCitySearch(selectCity);
  }
};
function getCitySearch(search) {
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=imperial&appid=${apiKey}`;
  //this clears out the weathercontainer when multipleclicks are made
  currentWeather.textContent = " ";
  forecast.textContent = " ";
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
          // current weather Display
          var hCity = document.createElement("h3");
          var city = searchforCity.value.trim();
          hCity.textContent = city;
          var htoday = document.createElement("h3");
          // converted dt to date
          var dtCon = data.daily[0].dt;
          var milliseconds = dtCon * 1000;
          var date = new Date(milliseconds);
          var humanDateFormattoday = date.toLocaleDateString("en-us");
          htoday.textContent = humanDateFormattoday;
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
          // 5 day weather foreacast display
          for (i = 1; i < 6; i++) {
            var div = document.createElement("div");
            div.classList.add("col-sm-2");
            var div2 = document.createElement("div");
            div2.classList.add("card");
            var div3 = document.createElement("div");
            div3.classList.add("card-body");
            var imgEl = document.createElement("img");
            var icon = data.daily[i].weather[0].icon;
            var iconurl = "http://openweathermap.org/img/wn/" + icon + ".png";
            imgEl.setAttribute("src", iconurl);
            console.log(iconurl);
            var pTemps = document.createElement("p");
            var temps = `Temp:${data.daily[i].temp} ℉`;
            pTemps.textContent = temp;
            var pWinds = document.createElement("p");
            var winds = `Wind:${data.daily[i].wind_speed}`;
            pWinds.textContent = winds;
            var phumiditys = document.createElement("p");
            var humiditys = `Humidity:${data.daily[i].humidity}`;
            phumiditys.textContent = humiditys;
            //ref https://coderrocketfuel.com/article/convert-a-unix-timestamp-to-a-date-in-vanilla-javascript converting dt to date
            var dtConvert = data.daily[i].dt;
            var milliseconds = dtConvert * 1000;
            var dates = new Date(milliseconds);
            var humanDateFormat = dates.toLocaleDateString("en-us");
            var pdates = document.createElement("p");
            console.log(humanDateFormat);
            pdates.textContent = humanDateFormat;
            div3.appendChild(pdates);
            div3.appendChild(imgEl);
            div3.appendChild(pTemps);
            div3.appendChild(pWinds);
            div3.appendChild(phumiditys);
            div2.appendChild(div3);
            div.appendChild(div2);
            forecast.appendChild(div);
          }
        });
    });
}

searchbtn[0].addEventListener("click", handleFormSubmit);
listBtn.addEventListener("click", buttonClickHandler);

init();
