$( document ).ready(function() {
    
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

    function currentLocationWeather(cityName){

        console.log('the city name being run is', cityName)
    
        var apiKey = "&appid=166a433c57516f51dfab1f7edaed8413"
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + apiKey;

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function(response){
            // console.log('this is the reponse', response);

            $('.city-name').html('<h1>' + response.name + " " + "(" + moment().format('L') + ")" + '</h1>');
            var weatherIcon = $('<img>');
            var iconSrc = 'http://openweathermap.org/img/wn/' + response.weather[0].icon + '.png';
            weatherIcon.attr('src', iconSrc);
            weatherIcon.appendTo('.currentWeatherIcon');
            var tempF = (response.main.temp - 273.15) * 1.80 +32
            $('.tempDiv').text("Temperature: " + tempF.toFixed(2) + " *F");
            $('.humidityDiv').text("Humidity: " + response.main.humidity + " %");
            $('.windDiv').text("Wind Speed: " + response.wind.speed + " MPH")

            // display current weather info 
            var long = response.coord.lon
            var lat = response.coord.lat
            // console.log('longitude', long)
            // console.log('lat', lat);
            uvIndex(lat, long);
            fiveDay(cityName);

            // Create another call for five day forecast
            
        })

    }
    // UV index function
    function uvIndex(lat, long){

        var apiKey = "&appid=166a433c57516f51dfab1f7edaed8413"
        var queryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + long + apiKey;

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function(response){
            console.log('this is the reponse', response);
            $('.uvDiv').text("UV Index: " + response.value);
            
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
        //prepends cityLi to #city-list div
        $('#city-list').prepend(cityLi);
        // console.log('list item being prepended', cityName);
        // resets input form
        $('.form-inline')[0].reset();
        // Calls currentLocationWeather and passes cityName through it
        currentLocationWeather(cityName);
        


    })



    function renderList(){
        var citiesListParse = JSON.parse(localStorage.getItem('savedCitiesList'));
        // console.log('cities list parsed', citiesListParse)

        for(i = 0; i < citiesListParse.length; i++){
            var singleCityLi = $('<li>' + citiesListParse[i] + '</li>')
            singleCityLi.addClass('list-group-item')
            $('#city-list').append(singleCityLi);
        }

        $('.list-group-item').on("click", function(event){
            if(event.target.matches('.list-group-item')){
            var savedCitiesList = localStorage.getItem('savedCitiesList');
            savedCitiesList = JSON.parse(savedCitiesList);
            var cityName = $(this).val(savedCitiesList)

            console.log('this is a clicked list item', cityName)
            }
        })

        var firstCity = citiesListParse[0]
        // console.log('the first city is', firstCity);
    }


    currentLocationWeather(defaultCity);
    renderList();




});