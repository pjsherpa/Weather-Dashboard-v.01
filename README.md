# weather-dashboard
UCB Challenge 6

Note:The following will be provided in present tense.

This readme has the following:

1. Features
2. HTML
3. CSS
4. Javascript
5. Deployment
6. Screenshot of weather-dashboard(img1-img5)

Features:

1. The page displays a form input to search for a city name with a search and clear button presented(ref:img1).
2. Once city name provided(ref:img3) and search button clicked, then current and future weather conditions for that city is presented(ref:img2).
3. Presentation includes the city name, the date, an icon representation of weather conditions(3 in one line),then follows the temperature, the humidity, the wind speed, and the UV index(ref:img2).
4. Colour for UV index changes to indicate whether the conditions are favorable, moderate, or severe.(below 2 favourable(color:green)(ref:img2),between 2 above & 6 moderate(color:yellow)(ref:img5),6 above severe(color:red)(ref:img6).
5. Once page refreshed all searches are provided in a search list below the clear button.
6. Click on list button to see the weather condition again(ref:img2).
7. Click clear button to clear list(ref:img1). 

HTML:
1. HTML uses bootstrap to create web-page.
2. Unique Id and classes have been setup for Dom manipulation.
3. script.js & style.css has been linked and google fonts.
4. Create root elements for data and list display.
4. Comments present in index.html

CSS:

1. General font family create using google font..
2. UV index padding set to highlight color codes clearer.
3. Comments present in style.css.

Javascript:

1. Create variables for elements,classes and id's to be used in functions.
2. Create localStorage to save city list.
3. Function added to create new list and button within JS.
4. Addevent listener created for search,clear and for the city list.
5. Two API's used to fetch data. The first api used the city name which then uses the city name to provides the latitude and longitude data, which is then provided to the next api requesting for the latitude and longitude.
6. Once all requirements are met then we fetch data's required to fulfill webpage.
7. Using data create new elements and then append to the root element which was is in HTML.

Deployment:

live URL:https://pjsherpa.github.io/weather-dashboard-v.01/

GitHub URL:https://github.com/pjsherpa/weather-dashboard-v.01

Screenshot:

img1:

![Screen Shot 2022-07-25 at 12 10 04 AM](https://user-images.githubusercontent.com/105903416/180718748-da1f3ec9-5ebc-4882-8770-fa293ced5da2.png)

img2:

![Screen Shot 2022-07-25 at 1 11 52 PM](https://user-images.githubusercontent.com/105903416/180876393-8039e6a8-7bce-444d-981f-aee21a552666.png)

img3:

<img width="363" alt="Screen Shot 2022-07-24 at 11 32 03 PM" src="https://user-images.githubusercontent.com/105903416/180713374-060145d2-a6b6-45c8-bc48-d404022cadfc.png">


img4:

<img width="341" alt="Screen Shot 2022-07-24 at 11 38 19 PM" src="https://user-images.githubusercontent.com/105903416/180713796-78cd5af8-178c-4699-bc4e-9ee1d0c19308.png">

img 5:

<img width="293" alt="Screen Shot 2022-07-24 at 11 36 48 PM" src="https://user-images.githubusercontent.com/105903416/180713823-a5f374e1-ee24-4c7d-bf7f-609405c7af32.png">



