var cityResultText = $('#cityResult');
var windResultText = $('#windResult');
var humidityResultText = $('#humidityResult');
var tempResultText = $('#tempResult');
//var UVResultText = $('#UVResult');
var mainIcon = $('#mainIcon');
var cardTitle = $("h4");

var rowCards = $("#rowCards");
var cardBody = $("#card");
var h2Forecast = $(".forecast")
var weatherCard = $("#weatherCard");
var forecastDate = {};
var forecastIcon = {};
var forecastTemp = {};
var forecastHum = {};


var today = moment().format('MM' + "/" + 'DD' + "/" + 'YYYY');
$(".btn").on("click", function(event) {
    event.preventDefault();
var userInput = $(".form-control").val().toLowerCase().replace(/ /g,'+');
        console.log("User Search: " + userInput);
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&units=metric&APPID=123babda3bc150d180af748af99ad173";
        console.log(queryURL);
        weatherCard.attr("style", "display: block");
        $(".container-fluid").attr("style", "height: auto");
    $.ajax ({
        url: queryURL,
        method: "GET"
    }) .then(function(response){
var city = response.name;
var country = response.sys.country;
var wind = response.wind.speed;
var humidity = response.main.humidity;
var temp = response.main.temp;
var lon = response.coord.lon;
var lat = response.coord.lat;
var icon = response.weather[0].icon;
var UVindexURL = "http://api.openweathermap.org/data/2.5/uvi?" + "lat=" + lat + "&" + "lon=" + lon + "&APPID=123babda3bc150d180af748af99ad173";
var newImgMain = $("<img>").attr("class", "card-img-top").attr("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png");
        mainIcon.append(newImgMain);
        $.ajax({
            url: UVindexURL,
            method: "GET"
        }) .then(function(UVindex){
var UV = UVindex.value;
var colorUV;
            console.log(UV);
            if (UV <= 3) {
                colorUV = "green";
            } else if (UV >= 3 & UV <= 6) {
                colorUV = "yellow";
            } else if (UV >= 6 & UV <= 8) {
                colorUV = "orange";
            } else {
                colorUV = "red";
            }

var UVResultText = $("<p>").attr("class", "card-text").text("UV Index: ");
            UVResultText.append($("<span>").attr("class", "uvindex").attr("style", ("background-color: " + colorUV)).text(UV))
            cardBody.append(UVResultText);
        });
            h2Forecast.attr("style", "display: block");

var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&units=metric&APPID=123babda3bc150d180af748af99ad173";
        $.ajax({
            url: forecastURL,
            method: "GET"
        }).then(function (response) {
            console.log(forecastURL);
            for (var i = 0; i < response.list.length; i += 8) {
                forecastDate[i] = response.list[i].dt_txt;
                forecastIcon[i] = response.list[i].weather[0].icon;
                forecastTemp[i] = response.list[i].main.temp;
                forecastHum[i] = response.list[i].main.humidity;

var newCol2 = $("<div>").attr("class", "col-2");
rowCards.append(newCol2);

var newDivCard = $("<div>").attr("class", "card text-white bg-primary mb-3");
newDivCard.attr("style", "max-width: 18rem;")
newCol2.append(newDivCard);

var newCardBody = $("<div>").attr("class", "card-body");
newDivCard.append(newCardBody);

var newH5 = $("<h5>").attr("class", "card-title").text(moment(forecastDate[i]).format("MMM Do"));
newCardBody.append(newH5);

var newImg = $("<img>").attr("class", "card-img-top").attr("src", "https://openweathermap.org/img/wn/" + forecastIcon[i] + "@2x.png");
newCardBody.append(newImg);

var newPTemp = $("<p>").attr("class", "card-text").text("Temp: " + Math.floor(forecastTemp[i]) + "ºC");
newCardBody.append(newPTemp);

var newPHum = $("<p>").attr("class", "card-text").text("Humidity: " + forecastHum[i] + " %");
newCardBody.append(newPHum);
};
        })

        cityResultText.text(city + ", " + country + " " + today);
        windResultText.text("Wind Speed: " + wind + " MPH");
        humidityResult.text("Humidity: " + humidity + " %");
        tempResultText.text("Temperature: " + temp + " ºF");
    });
});