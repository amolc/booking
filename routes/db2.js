
var MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    mongoose = require('mongoose'),
    db;
  
mongoose.connect('mongodb://localhost/bookingtool');

var Schema = mongoose.Schema;  

var Product = new Schema({ 
	id:{type:Number, unique:false},
    title: { type: String, required: true },  
    description: { type: String, required: true },  
    style: { type: String, required: false }
});

var ProductModel = mongoose.model('Product', Product);
  
exports.addproduct = function (req, res){
  var product;
  console.log("POST: ");
  
  product = new ProductModel({
    title: "title",
    description:"desc",
    style: "nn"
  });
  product.save(function (err) {
    if (!err) {
      return console.log("created");
    } else {
      return console.log(err);
    }
  });
  return res.send(product);
};

// List products
exports.listproduct = function (req, res){
  return ProductModel.find(function (err, products) {
  	 res.jsonp(products);
    if (!err) {
      return res.send(products);
    } else {
      return console.log(err);
    }
  });
};

// remove a single product
exports.deleteproduct =  function (req, res) {
  
  return ProductModel.findById(req.params.id, function (err, product) {
    return product.remove(function (err) {
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
exports.deleteallproduct = function (req, res) {
  ProductModel.remove(function (err) {
    if (!err) {
      console.log("removed");
      return res.send('');
    } else {
      console.log(err);
    }
  });
};
 
 
 // lets get the cities here
 

var cities = new Schema({ 
	id:{type:Number, unique:false},
    city: { type: String, required: true },  
    country: { type: String, required: true },  
    continent: { type: String, required: false },
    timezone: { type: String, required: false }
});

var CitiesModel = mongoose.model('cities', cities);
  
exports.addcities = function (req, res){
  var cities;
  console.log("POST: ");
  
  cities = new CitiesModel({
  	id: "22",
    city: "title",
    country:"desc",
    continent:"asia",
    timezone: "SGT"
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
      return res.send(cities);
    } else {
      return console.log(err);
    }
  });
};

// remove a single city
exports.deletecities =  function (req, res) {
  
  return CitiesModel.findById(req.params.id, function (err, cities) {
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

/* Let's add the tour catefgories
 * Author : Amol C amolc
 */






