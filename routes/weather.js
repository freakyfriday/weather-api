var express = require('express');
var router = express.Router();
var weatherController = require("../controllers/weather");
var _ = require('lodash');

/* GET weather listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:latitude/:longitude', function(req, res, next) {
  
  let latitude = req.params.latitude;
  let longitude = req.params.longitude;
  
  if (!_.isEmpty(latitude) && !_.isEmpty(longitude)) {
    weatherController.getWeatherByLonLat(latitude, longitude, (err, data) => {
      if (!err){
        res.json(data)
      }else{
        next(err);
      }
    });
  }else{
    next(new Error('Longitude & Latitude cannot be empty'));
  }
});




module.exports = router;
