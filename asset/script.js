var searchforCity = document.getElementById("searchforCity");
var searchbtn = document.getElementsByClassName("main");

var clearbtn = document.getElementsByClassName("clear");
var listBtn = document.getElementById("listBtn");
var currentWeather = document.getElementById("weatherContainer");

var forecast = document.getElementById("Forecast");
var apiKey = "f2c131fc5bc12a5320fc9c5062b3a515";
var previousSearch = [];

function renderSearch() {
  // Render a new li for each todo
  listBtn.innerHTML = "";
  for (var i = 0; i < previousSearch.length; i++) {
    var previousSearches = previousSearch[i];
    var li = document.createElement("li");
    li.classList = "btn btn-secondary data-city";
    li.style.marginTop = "30px";
    li.style.width = "18rem";
    li.textContent = previousSearches;
    li.value.trim = previousSearches;
    console.log(li);

    var newBtn = document.createElement("button");
    li.setAttribute("data-index", i);

    newBtn.appendChild(li);
    listBtn.appendChild(li);
  }
}
// This function is being called below and will run when the page loads.
function init() {
  // Get stored searches from localStorage
  var storedSearches = JSON.parse(localStorage.getItem("previousSearch"));
  // If searches were retrieved from localStorage, update the previoussearch array to it
  if (storedSearches !== null) {
    previousSearch = storedSearches;
  }
  // This is a helper function that will render searches to the DOM
  renderSearch();
}

function storeSearches() {
  // Stringify and set key in localStorage to previoussea array
  localStorage.setItem("previousSearch", JSON.stringify(previousSearch));
}

var handleFormSubmit = function (event) {
  event.preventDefault();
  var cityName = searchforCity.value.trim();
  if (cityName) {
    getCitySearch(cityName);

    // pushing cityname to array to store for list this stops duplicate city list button to occur ref:https://bobbyhadz.com/blog/javascript-prevent-adding-duplicates-array
    if (!previousSearch.includes(cityName)) {
      previousSearch.push(cityName);
    }
  } else {
    alert("Please enter a City name");
  }
  renderSearch();
  storeSearches();
};

var buttonClickHandler = function (event) {
  event.preventDefault();
  var selectCity = event.target.textContent;
  console.log(selectCity);
  if (selectCity) {
    getCitySearch(selectCity);
    var cityTitle = document.createElement("i");
    cityTitle.textContent = selectCity.toUpperCase();
    currentWeather.appendChild(cityTitle);
  } else {
    currentWeather.innerHTML = " ";
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
          var cityTitle = document.createElement("i");
          var city = searchforCity.value.trim();
          cityTitle.textContent = city.toUpperCase();
          // converted dt to date
          var htoday = document.createElement("i");
          var dtCon = data.daily[0].dt;
          var milliseconds = dtCon * 1000;
          var date = new Date(milliseconds);
          var humanDateFormattoday = date.toLocaleDateString("en-us");
          htoday.textContent = `(${humanDateFormattoday})`;
          var imgElCurrent = document.createElement("img");
          var iconCurrent = data.daily[0].weather[0].icon;
          console.log(iconCurrent);
          var iconurlCurrent =
            "http://openweathermap.org/img/wn/" + iconCurrent + ".png";
          imgElCurrent.setAttribute("src", iconurlCurrent);
          hCity.appendChild(cityTitle);
          hCity.appendChild(htoday);
          hCity.appendChild(imgElCurrent);
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
            div3.classList.add("card-body-bg");
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
            //converting dt to date ref https://coderrocketfuel.com/article/convert-a-unix-timestamp-to-a-date-in-vanilla-javascript
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

clearbtn[0].addEventListener("click", function (event) {
  previousSearch = [];
  storeSearches();
});

searchbtn[0].addEventListener("click", handleFormSubmit);
listBtn.addEventListener("click", buttonClickHandler);

init();
