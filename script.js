var degreeInCel;
var degreeInFah;
var weatherId;

$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
        return this;
    }
});

var checkbox = function () {
    $("#degreeToggle").bootstrapToggle({
        on:"&#8457;",
        off:"&#8451",
        onstyle: "warning",
        offstyle: "info",
        size:"small"
    });
};

var tooltip = function () {
  $("[data-toggle = 'degree-tooltip']").tooltip({
      title:"Toggle to change temprature unit",
      placement:"right"
  });
};

var setLocation = function (coords) {
    var key = "AIzaSyBRLZtMjEBhcpe5X-wcldEXK4K6j3K2Yv4";
    var callback = function (response) {
        var location = response["results"][0]["address_components"][3]["long_name"];
        $(".location h3").text(location);
    };
    googleService(coords,key,callback);
};

var roundTemp = function (data) {
    return (parseInt(data)*2)/2;
};

var setImage = function(id) {
  var num = String(id).charAt(0);
  var url = "images/2.jpeg";

  if(id)
  var url = "images/" + num + ".jpeg";

    $("body").css("background-image","url('"+ url + "')");
};
var getweather = function (coords) {
  var  callback = function (response) {
      var weather = {
          id: response.weather[0].id,
          temp: response.main.temp,
          windDeg: response.wind.deg,
          windSpeed: response.wind.speed,
          weatherMain: response.weather[0].main,
          weatherDesc: response.weather[0].description,
          weatherIcon: response.weather[0].icon
      };
    $(".degree h2").html(roundTemp(weather.temp) + " &#8451");
    $(".weather-desc h5").text(weather.weatherMain);
    $(".weather-desc h6").text("(" + weather.weatherDesc + ")");
    $(".weather-image img").attr("src",weather.weatherIcon);
    $(".wind>span").eq(1).text(weather.windSpeed);
    $(".wind>span").eq(3).text(weather.windDeg);
    setImage(weather.id);
  };
  weatherService(coords,callback)
};

var calculateToFah = function (degree) {
    var result = (degree * 1.8) + 32;
    return Math.round(result*2)/2;
};

var cashTemp = function () {
    var degreeText = $(".degree h2").text();
    var degree = degreeText.split(" ")[0];
    degree = parseInt(degree);
    degreeInCel = degree;
    degreeInFah = calculateToFah(degree);
};

var convertDegree = function () {
    $("#degreeToggle").change(function () {
        if(!(degreeInFah || degreeInCel)) cashTemp();
        if($(this).prop("checked")){
            $(".degree h2").animateCss("flipInX").html(degreeInFah + " &#8457");
        }else{
            $(".degree h2").animateCss("flipInX").html(degreeInCel + " &#8451");
        }
    });
};