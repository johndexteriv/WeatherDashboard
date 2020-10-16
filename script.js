$( document ).ready(function() {
    // If if no savedCities list, set to empty array
    if (!localStorage.getItem("savedCitiesList")){
        localStorage.setItem('savedCitiesList', JSON.stringify([]));
    }
    // defaultCity at postion 0 to be passed through currentLocationWeather upon opening of application
    var defaultCity = JSON.parse(localStorage.getItem("savedCitiesList"))[0] || " ";

    // Function to clear divs out
    function clear(){
        $('.city-name').text("");
        $('.currentWeatherIcon').html("");
        $('.tempDiv').text("");
        $('.humidityDiv').text("");
        $('.windDiv').text("");
        $('.uvDiv').text("");
        $('.card-body').empty();
    }

    // Empty array variable to .unshift city names into
    var savedCitiesList = [];
    // Function to query current weather conditions based on cityName value
    function currentLocationWeather(cityName){
        console.log('the city name being run is', cityName)
    
        var apiKey = "&appid=166a433c57516f51dfab1f7edaed8413"
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + apiKey;
        // Ajax call for current weather conditions
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function(response){
            // H1 of cityName with current date formatted from moment.js
            $('.city-name').html('<h1>' + response.name + " " + "(" + moment().format('L') + ")" + '</h1>');
            // Building weather icon to append
            var weatherIcon = $('<img>');
            var iconSrc = 'http://openweathermap.org/img/wn/' + response.weather[0].icon + '.png';
            weatherIcon.attr('src', iconSrc);
            weatherIcon.appendTo('.currentWeatherIcon');
            // Conversion from kelvin to fahrenheit
            var tempF = (response.main.temp - 273.15) * 1.80 +32
            $('.tempDiv').text("Temperature: " + tempF.toFixed(2) + " *F");
            // Setting humidity and wind speed
            $('.humidityDiv').text("Humidity: " + response.main.humidity + " %");
            $('.windDiv').text("Wind Speed: " + response.wind.speed + " MPH")
            // Building variables in order query for uvIndex
            var long = response.coord.lon
            var lat = response.coord.lat
            // Running uvIndex and fiveDay functions
            uvIndex(lat, long);
            fiveDay(cityName);
        })

    }
    // UV index function
    function uvIndex(lat, long){
        // queryURL developed with lat and long variables
        var apiKey = "&appid=166a433c57516f51dfab1f7edaed8413"
        var queryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + long + apiKey;
        // Ajax call
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function(response){
            console.log('this is the reponse', response);
            // UV index with button element built on
            $('.uvDiv').html("UV Index: " + '<button class= uVBtn>' + response.value + '</button>');
            // Setting background-color based off UV Index severity
            if (response.value >= 6){
                $('.uVBtn').css("background-color", "red")
            } else if (response.value >= 3){
                $('.uVBtn').css("background-color", "yellow")
            } else {
                $('.uVBtn').css("background-color", "green")
            }
        })
    }
    // fiveDay forecast function
    function fiveDay(cityName){

        var apiKey = "&appid=166a433c57516f51dfab1f7edaed8413"
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + apiKey;

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function(response){
            console.log('this is the five day reponse', response);

            var dayOneHeader = $('<h6>' + moment().add(1, 'days').format('L') + '</h6>')
            var weatherIconOne = $('<img>')
            var weatherIconOneSrc = 'http://openweathermap.org/img/wn/' + response.list[5].weather[0].icon + '.png';
            weatherIconOne.attr('src', weatherIconOneSrc);
            var dayOneTemp = (response.list[5].main.temp - 273.15) * 1.80 +32
            var dayOneTempP = $('<p>' + ("Temp: " + dayOneTemp.toFixed(2) + "*F") + '</p>');
            var dayOneHumidity = $('<p>' + ("Humidity: " + response.list[5].main.humidity + "%") + '</p>')
            $('.dayone').append(dayOneHeader, weatherIconOne, dayOneTempP, dayOneHumidity);

            var dayTwoHeader = $('<h6>' + moment().add(2, 'days').format('L') + '</h6>')
            var weatherIconTwo = $('<img>')
            var weatherIconTwoSrc = 'http://openweathermap.org/img/wn/' + response.list[13].weather[0].icon + '.png';
            weatherIconTwo.attr('src', weatherIconTwoSrc);
            var dayTwoTemp = (response.list[13].main.temp - 273.15) * 1.80 +32
            var dayTwoTempP = $('<p>' + ("Temp: " + dayTwoTemp.toFixed(2) + "*F") + '</p>');
            var dayTwoHumidity = $('<p>' + ("Humidity: " + response.list[13].main.humidity + "%") + '</p>')
            $('.daytwo').append(dayTwoHeader, weatherIconTwo, dayTwoTempP, dayTwoHumidity);

            var dayThreeHeader = $('<h6>' + moment().add(3, 'days').format('L') + '</h6>')
            var weatherIconThree = $('<img>')
            var weatherIconThreeSrc = 'http://openweathermap.org/img/wn/' + response.list[21].weather[0].icon + '.png';
            weatherIconThree.attr('src', weatherIconThreeSrc);
            var dayThreeTemp = (response.list[21].main.temp - 273.15) * 1.80 +32
            var dayThreeTempP = $('<p>' + ("Temp: " + dayThreeTemp.toFixed(2) + "*F") + '</p>');
            var dayThreeHumidity = $('<p>' + ("Humidity: " + response.list[21].main.humidity + "%") + '</p>')
            $('.daythree').append(dayThreeHeader, weatherIconThree, dayThreeTempP, dayThreeHumidity);

            var dayFourHeader = $('<h6>' + moment().add(4, 'days').format('L') + '</h6>')
            var weatherIconFour = $('<img>')
            var weatherIconFourSrc = 'http://openweathermap.org/img/wn/' + response.list[29].weather[0].icon + '.png';
            weatherIconFour.attr('src', weatherIconFourSrc);
            var dayFourTemp = (response.list[29].main.temp - 273.15) * 1.80 +32
            var dayFourTempP = $('<p>' + ("Temp: " + dayFourTemp.toFixed(2) + "*F") + '</p>');
            var dayFourHumidity = $('<p>' + ("Humidity: " + response.list[29].main.humidity + "%") + '</p>')
            $('.dayfour').append(dayFourHeader, weatherIconFour, dayFourTempP, dayFourHumidity);

            var dayFiveHeader = $('<h6>' + moment().add(5, 'days').format('L') + '</h6>')
            var weatherIconFive = $('<img>')
            var weatherIconFiveSrc = 'http://openweathermap.org/img/wn/' + response.list[37].weather[0].icon + '.png';
            weatherIconFive.attr('src', weatherIconFiveSrc);
            var dayFiveTemp = (response.list[37].main.temp - 273.15) * 1.80 +32
            var dayFiveTempP = $('<p>' + ("Temp: " + dayFiveTemp.toFixed(2) + "*F") + '</p>');
            var dayFiveHumidity = $('<p>' + ("Humidity: " + response.list[37].main.humidity + "%") + '</p>')
            $('.dayfive').append(dayFiveHeader, weatherIconFive, dayFiveTempP, dayFiveHumidity);  
        })

    };


    // On click function to add #search-city val to savedCitiesList and append to #city-list
    $('.btn-primary').on('click', function(event){
        
        // Prevents Default
        event.preventDefault();
        // Clears current city and lower card divs
        clear();
        // Set variable of cityName to value of #search-city
        var cityName = $('#search-city').val().toLowerCase().trim()
        // Retrieves savedCities and Parses it in order to push cityName
        var savedCitiesList = localStorage.getItem('savedCitiesList')
        savedCitiesList = JSON.parse(savedCitiesList)
        // pushes cityName into savedCitiesList
        savedCitiesList.unshift(cityName);
        // Saves new savedCitiesLisit to local storage as string
        localStorage.setItem('savedCitiesList', JSON.stringify(savedCitiesList))
        // Creates a li for cityName and adds class of 'list-group-item'
        var cityLi = $('<li>' + cityName + '</li>')
        cityLi.addClass('list-group-item')
        cityLi.attr("value", cityName)
        var cityButton = $('<button>' + 'Remove' + '</button>')
        cityButton.addClass('removebutton')
        
        cityLi.append(cityButton);
        //prepends cityLi to #city-list div
        $('#city-list').prepend(cityLi);
        // console.log('list item being prepended', cityName);
        // resets input form
        $('.form-inline')[0].reset();
        // Calls currentLocationWeather and passes cityName through it
        currentLocationWeather(cityName);
    })

    $(document).on("click", ".removebutton", function(event){
        if(event.target.matches('.removebutton')){

            var savedCitiesList = localStorage.getItem('savedCitiesList')
            console.log(savedCitiesList)
            savedCitiesList = JSON.parse(savedCitiesList);
            var indexOf = $(this).parent().index()
            // var removedLi = $(this).parent()
            console.log(indexOf);
            console.log(removedLi)
            savedCitiesList.splice(indexOf, 1);
            localStorage.setItem('savedCitiesList', JSON.stringify(savedCitiesList));

            var removedLi = $(this).parent()
            removedLi.remove();
            clear();
            
            
            
        }
    })

    $(document).on("click", ".list-group-item", function(event){

        console.log('event taking place', $(this).attr("value"))
        clear();
        var value = $(this).attr("value")
        currentLocationWeather(value);
    })


    function renderList(){
        var citiesListParse = JSON.parse(localStorage.getItem('savedCitiesList'));

        for(i = 0; i < citiesListParse.length; i++){
            var singleCityLi = $('<li>' + citiesListParse[i] + '</li>')
            singleCityLi.addClass('list-group-item')
            singleCityLi.attr("value", citiesListParse[i])
            var cityButton = $('<button>' + 'Remove' + '</button>')
            cityButton.addClass('removebutton')
            singleCityLi.append(cityButton)
            $('#city-list').append(singleCityLi);
            
        }
    }

    currentLocationWeather(defaultCity);
    renderList();
});