var request = require("request");
var fs = require("fs");

var dark_sky_uril= "https://api.darksky.net";
var dark_sky_key = "eb51f2eb91f67935501b543af49ff39b";

exports.getWeatherByLonLat = (latitude, longitude, done) => {

    //check cache for data
    let latCache = ((latitude < 0) ? 'neg': '') + Math.abs(latitude);
    let lonCache = ((longitude < 0) ? 'neg': '') + Math.abs(longitude);
    let cachePath = `./cache/${latCache}-${lonCache}.json`;

    fs.readFile(cachePath, 'utf8', (err, data) => {
        if (err){
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

                        //store in cache
                        fs.writeFile(cachePath, JSON.stringify(focastResults), (err) => {
                            if (err) {
                                done(err)
                            }else{
                                done(null, focastResults);

                            }
                        });
                        
                    }
                    catch(e)
                    {
                        done(e);
                    }

                }else{
                    done(new Error('Weather Forecast API Error: ' + (httpResponse && httpResponse.statusMessage) ? httpResponse.statusMessage : err))
                }
            });
        }else{

            if (data){
                try{
                    let cachedForecastResults = JSON.parse(data);
                    done(null, cachedForecastResults);
                }catch(e){
                    done(e);
                }
            }else{
                done(null, null)
            }
           
        }
        
      });



}