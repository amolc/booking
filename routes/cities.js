
var MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    mongoose = require('mongoose'),
    db;
  
mongoose.connect('mongodb://localhost/bookingtool');


var Schema = mongoose.Schema;  

var Cities = new Schema({ 
	id:{type:Number, unique:false},
    city: { type: String, required: true },  
    country: { type: String, required: true },  
    continent: { type: String, required: false },
    timezone: { type: String, required: false }
});

var CitiesModel = mongoose.model('Cities', Product);
  
exports.addCities = function (req, res){
  var cities;
  console.log("POST: ");
  
  cities = new CitiesModel({
    title: "title",
    description:"desc",
    style: "nn"
  });
  cities.save(function (err) {
    if (!err) {
      return console.log("created");
    } else {
      return console.log(err);
    }
  });
  return res.send(Cities);
};

// List cities
exports.listcities = function (req, res){
  return CitiesModel.find(function (err, cities) {
  	 res.jsonp(cities);
    if (!err) {
      return res.send(products);
    } else {
      return console.log(err);
    }
  });
};

// remove a single product
exports.deletecities =  function (req, res) {
  
  return CitiesModel.findByid(req.params.id, function (err, cities) {
    return cities.remove(function (err) {
      if (!err) {
        console.log("removed");
        return res.send('');
      } else {
        console.log(err);
      }
    });
  });
  
};

// Bulk destroy all products
exports.deleteallcities = function (req, res) {
  CitiesModel.remove(function (err) {
    if (!err) {
      console.log("removed");
      return res.send('');
    } else {
      console.log(err);
    }
  });
};
 






