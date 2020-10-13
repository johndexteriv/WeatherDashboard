$( document ).ready(function() {
    
    if (!localStorage.getItem("savedCitiesList")){
        localStorage.setItem('savedCitiesList', JSON.stringify([]));
    }
    // defaultCity at postion 0 to be passed through currentLocationWeather upon opening of application
    var defaultCity = JSON.parse(localStorage.getItem("savedCitiesList"))[0] || " ";
    // Function to clear divs out
    function clear(){
        $('#current-city').empty();
        $('.lowerCard').empty();
    }
    // Empty array variable to .unshift city names into
    var savedCitiesList = [];

    function currentLocationWeather(cityName){
    
        var apiKey = "&appid=166a433c57516f51dfab1f7edaed8413"
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + apiKey;

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function(response){
            console.log('this is the reponse', response);

            // display current weather info 
            var long = response.coord.lon
            var lat = response.coord.lat
            console.log('longitude', long)
            console.log('lat', lat);
            // another ajax call -> display five day 

            // create another call to pass longitude and latitude through for UV Index
            // Create another call for five day forecast


            
        })

    }
    // UV index function
    function uvIndex(){

    }
    // fiveDay forecast function
    function fiveDay(){

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
        console.log('list is the list item being prepended', cityLi);
        // resets input form
        $('.form-inline')[0].reset();
        // Calls currentLocationWeather and passes cityName through it
        currentLocationWeather(cityName);


    })



    function renderList(){
        var citiesListParse = JSON.parse(localStorage.getItem('savedCitiesList'));
        console.log(citiesListParse)

        for(i = 0; i < citiesListParse.length; i++){
            var singleCityLi = $('<li>' + citiesListParse[i] + '</li>')
            singleCityLi.addClass('list-group-item')
            $('#city-list').append(singleCityLi);
        }

        var firstCity = citiesListParse[0]
        console.log('the first city is', firstCity);
    }


    currentLocationWeather(defaultCity);
    renderList();




});