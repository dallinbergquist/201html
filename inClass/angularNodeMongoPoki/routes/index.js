var express = require('express');
var router = express.Router();
var request = require('request');
var mongodb = require('mongodb');

// We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var dbUrl = 'mongodb://localhost:27017/pokemon';

// we will use this variable later to insert and retrieve a "collection" of data
var coll

// Use connect method to connect to the Server
MongoClient.connect(dbUrl, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    // HURRAY!! We are connected. :)
    console.log('Connection established to', dbUrl);

    // do some work here with the database.
    coll = db.collection('pokemon');
    coll.remove(); // Remove anything that was there before
    coll.insert(pokemon, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('Inserted documents into the "pokemon" collection. The documents inserted with "_id" are:', result.length, result);
      }
    });
  }
});

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile('index.html', { root: 'public' });
});

router.get('/pokemon', function(req, res) {
  console.log("In Pokemon");
  coll.find().toArray(function(err, result) {
    if(err) {
      console.log(err);
    } else if (result.length) {
      console.log("Query Worked");
      console.log(result);
      res.send(result);
    } else {
      console.log("No Documents found");
    }
  });
});

router.search('/pokemon',  function(name, building, floor, wifi, cell, light, res){
  console.log("In pokemon");
  coll.find( {"name": name, "building": building, "floor": floor, "wifi": wifi, "cell": cell, "light": light } ).toArray(function(err, result) {
    if(err) {
      console.log(err)
    } else if (result.length) {
      console.log("Query worked");
      console.log(result);
    } else {
      console.log("No matches found with name: ",name,"building: ",building,"floor: ",floor,"wifi :",wifi,"cell: ",cell,"light: ",light);
    }
  });
});

router.post('/pokemon', function(req, res) {
    console.log("In Pokemon Post");
    console.log(req.body);
    coll.insert(req.body, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('Inserted %d documents into the "pokemon" collection. The documents inserted with "_id" are:', result.length, result);
        res.end('{"success" : "Updated Successfully", "status" : 200}');
      }
    });
}); 

module.exports = router;


// * This array of pokemon will represent a piece of data in our 'database'

var pokemon = [
  {
    name: 'Periodicals',
    building: 'HBLL',
    floor: '2nd Floor',
    wifi: true,
    cell: false,
    light: true
  },
  {
    name: 'Joseph Smith Building',
    building: 'JSB',
    floor: '1st Floor',
    wifi: true,
    cell: true,
    light: true
  }
];
