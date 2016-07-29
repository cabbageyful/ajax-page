"use strict";


// PART 1: SHOW A FORTUNE

function showFortune(evt) {

    // TODO: get the fortune and show it in the #fortune-text div
    $.get('/fortune', function(results) {
        $('#fortune-text').html(results);
    });
}

$('#get-fortune-button').on('click', showFortune);





// PART 2: SHOW WEATHER
function parseWeatherResult(result){
    //grab only the forecast part of the returned JSON
    var forecast = result['forecast'];

    //show the forecast in #weather-info
    $('#weather-info').html(forecast);
}

function showWeather(evt) {
    evt.preventDefault();

    var url = "/weather.json?zipcode=" + $("#zipcode-field").val();
    $.get(url, parseWeatherResult );

}

$("#weather-form").on('submit', showWeather);




// PART 3: ORDER MELONS

function orderMelons(evt) {
    evt.preventDefault();

    var formInputs = {
        "qty": $('#qty-field').val(),
        "melon_type": $('#melon-type-field').val()
    };

    console.log(formInputs);
    
    $.post('/order-melons.json', formInputs, orderStatus);
    // TODO: show the result message after your form
    // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
}

function orderStatus(melons) {
    var code = melons['code'];
    var message = melons['msg'];

    $('#order-status').html(message);

    if (code === 'ERROR') {
        $('#order-status').addClass('order-error');
    } else {
        $('#order-status').removeClass('order-error');
    }

}

$("#order-form").on('submit', orderMelons);


