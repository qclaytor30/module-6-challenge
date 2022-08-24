var cityResultText = $('#cityResult');
var windResultText = $('#windResult');
var humidityResultText = $('#humidityResult');
var tempResultText = $('#tempResult');
var UVResultText = $('#UVResult');
var cardTitle = $("h4");
var emptyDate = {}

var today = moment().format('DD' + "/" + 'MM' + "/" + 'YYYY');
$(".btn").on("click", function(event) {
    event.preventDefault();
    var userInput = $(".form-control").val().toLowerCase().replace(/ /g,'+');
        console.log("User Search: " + userInput);
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&units=metric&APPID=123babda3bc150d180af748af99ad173";
        console.log(queryURL);
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
        var UVindexURL = "http://api.openweathermap.org/data/2.5/uvi?" + "lat=" + lat + "&" + "lon=" + lon + "&APPID=123babda3bc150d180af748af99ad173";
        $.ajax({
            url: UVindexURL,
            method: "GET"
        }) .then(function(response){
                console.log(forecastURL);
            for (var i = 0; i < response.list.length; i += 8){

                emptyDate[i]= repsonse.list[i].dt_txt;
                var forecastDate = response.list[i].dt_txt;
                    console.log (forecastDate);
            };
        })
            console.log(valueOf(emptyDate));

        cityResultText.text(city + ", " + country + " " + today);
        windResultText.text("Wind Speed: " + wind + " MPH");
        humidityResult.text("Humidity: " + humidity + " %");
        tempResultText.text("Temperature: " + temp + " ºF");
    });
});