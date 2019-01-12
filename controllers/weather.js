var request = require("request");

var dark_sky_uril= "https://api.darksky.net";
var dark_sky_key = "eb51f2eb91f67935501b543af49ff39b";

exports.getWeatherByLonLat = (latitude, longitude, done) => {

    //get weather forecast
    request({
        method : 'GET',
        url    : `${dark_sky_uril}/forecast/${dark_sky_key}/${latitude},${longitude}`
    }, function(err,httpResponse,body){

        if (!err &&  httpResponse.statusCode === 200){

            try
            {
                let forecastJSON = JSON.parse(body);
                let dailyForecast = forecastJSON.daily;

                let focastResults = {
                    dailyForecast
                }

                done(null, focastResults);
            }
            catch(e)
            {
                done(e);
            }

        }else{
            done(new Error('Weather Forecast API Error: ' + (httpResponse && httpResponse.statusMessage) ? httpResponse.statusMessage : err))
        }
    });

}