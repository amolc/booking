var MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    Join = require('mongo-join').Join,
    db;
    
var mongoClient = new MongoClient(new Server('localhost', 27017));
mongoClient.open(function(err, mongoClient) {
    db = mongoClient.db("tourbooking");
    
    db.collection('tours', function(err, collection) {
        if (err) {
            console.log("The 'populateTourType' collection doesn't exist. Creating it with sample data...");
           // populateTours();
        }
    });
});
 
/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// This code is to populate the city
var populateCity = function() {
 
    console.log("Populating City database...");
    var cities = [
        {"id": 1, "city": "Singapore", "Country": "Singapore", "Area": "Asia", "Timezone": "SGT"},
        {"id": 2, "city": "Bangkok",  "Country": "Thaland", "Area": "Asia", "Timezone": "SGT"},
        {"id": 3, "city": "Kula Lumpur",  "Country": "Malaysia", "Area": "Asia", "Timezone": "SGT"}
         ];
 
 	//db.createCollection("cities");
    db.collection('cities', function(err, collection) {
    collection.insert(cities, {safe:true}, function(err, result) {});
    });
 
};

exports.cities = function(req, res) {
   
    db.collection('cities', function(err, collection) {
            collection.find().toArray(function(err, cities) {
                res.jsonp(cities);
            });      
    });
};


/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// This code is to populate the city
var populateTourType = function() {
 
    console.log("Populating Tourtype database...");
    var tourType = [
        {"id": 1, "name": "Outdoor Activities"},
        {"id": 2, "name": "Tours & Sightseeing"},
        {"id": 3, "name": "Cultural & Theme Tours"},
        {"id": 4, "name": "Day Trips & Excursions "},
        {"id": 5, "name": "Theme Parks"},
        {"id": 6, "name": "Sightseeing Tickets & Passes"},
        {"id": 7, "name": "Transfers & Ground Transport"}
         ];
 
 	db.createCollection("tourType");
    db.collection('tourType', function(err, collection) {
    collection.insert(tourType, {safe:true}, function(err, result) {});
    });
 
};

exports.tourtype = function(req, res) {
   
    db.collection('tourType', function(err, collection) {
            collection.find().toArray(function(err, tourType) {
                res.jsonp(tourType);
            });      
    });
};

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// This code is to populate the city
var populateTours = function() {
 
    console.log("Populating Tours database...");
    var tours = [
        {"id": 1, "name": "Singapore Sentosa Island Afternoon Trip","name_pic":"11111","pricing_adult":"100","pricing_child":"100","overview":"1","schedule":"11","hotel_pickup":"100","city":"1"},
        {"id": 2, "name": "Singapore Sentosa Island Afternoon Trip","name_pic":"11111","pricing_adult":"100","pricing_child":"100","overview":"1","schedule":"11","hotel_pickup":"100","city":"1"},
        {"id": 3, "name": "Singapore Sentosa Island Afternoon Trip","name_pic":"11111","pricing_adult":"100","pricing_child":"100","overview":"1","schedule":"11","hotel_pickup":"100","city":"1"},
        {"id": 4, "name": "Singapore Sentosa Island Afternoon Trip","name_pic":"11111","pricing_adult":"100","pricing_child":"100","overview":"1","schedule":"11","hotel_pickup":"100","city":"1"},
        {"id": 5, "name": "Singapore Sentosa Island Afternoon Trip","name_pic":"11111","pricing_adult":"100","pricing_child":"100","overview":"1","schedule":"11","hotel_pickup":"100","city":"1"}
       
         ];
 
 	db.createCollection("tours");
   db.collection('tours', function(err, collection) {
    collection.insert(tours, {safe:true}, function(err, result) {});
    });
 
};

exports.tours = function(req, res) {
	
    db.collection('tours', function(err, collection) {
            collection.find().toArray(function(err, tours) {
                res.jsonp(tours);
            });      
    });
};

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// This code is to populate the city
var populateOverview = function() {
 
    console.log("Populating Overview database...");
    var tour_overview = [
        {"id": 1,"tour_id": 1, "overview": "Overview - Tour Opertors Overview - Tour OpertorsOverview - Tour OpertorsOverview - Tour OpertorsOverview - Tour OpertorsOverview - Tour Opertors "},
        {"id": 1,"tour_id": 2, "overview": "Overview - Tour Opertors Overview - Tour OpertorsOverview - Tour OpertorsOverview - Tour OpertorsOverview - Tour OpertorsOverview - Tour Opertors "},
        {"id": 1,"tour_id": 3, "overview": "Overview - Tour Opertors Overview - Tour OpertorsOverview - Tour OpertorsOverview - Tour OpertorsOverview - Tour OpertorsOverview - Tour Opertors "}
         ];
 
 	db.createCollection("tourOverview");
    db.collection('tourOverview', function(err, collection) {
    collection.insert(tour_overview, {safe:true}, function(err, result) {});
    });
 
};

exports.overview = function(req, res) {
	
    db.collection('tourOverview', function(err, collection) {
            collection.find().toArray(function(err, tourOverview) {
                res.jsonp(tourOverview);
            });      
    });
};


/* lets look at a join query to joining the data */

exports.tourdetail = function(req, res) {
	
      db.collection('tours', function(err, tourdetail) {
        tourdetail.find({}, function(err, cursor) {
          var join = new Join(db).on({
           	field: 'id', // <- field in employee doc
           	to: "tour_id",           // <- field in contact doc
            as: 'overviewtext',     // <- new field in employee for contact doc
            from: 'tourOverview'       // <- collection name for contact doc
          });         
          join.toArray(cursor, function(err, tourdetail) {
            res.jsonp(tourdetail);
          });
        });
      });   
};


var removecollections = function() {
	
	
	db.collection('cities',function(err, collection){
   		 collection.remove({},function(err, removed){
        		console.log(removed);
    		});
		});
		
    db.collection('tourType',function(err, collection){
   		 collection.remove({},function(err, removed){
        		console.log(removed);
    		});
		});
	 db.collection('tours',function(err, collection){
   		 collection.remove({},function(err, removed){
        		console.log(removed);
    		});
		});
	 db.collection('tour_overview',function(err, collection){
   		 collection.remove({},function(err, removed){
        		console.log(removed);
    		});
		});
 	
 	
 	
   
};



exports.populate = function(req, res) {
	
	 console.log("Removing collections");
	
	 //removecollections();
	 
	console.log("Removed collections");
	populateCity();
	populateTourType();
	populateTours();
	populateOverview();
	     
};