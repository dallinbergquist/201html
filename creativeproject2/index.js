var client_id = 'DNAN2RQAHMVDXWSQLQ1M4QRL1IDVC1V52DNSL2XMQMYHVJGI';
var client_secret = 'D3XATFFORTW31NEXU120XJF012YFJRLTR0L4EHSCU5HK3QYC&v=20130815';
var allPhotos = [];
var allVenues = [];

var storePhotos = function (venue_name, photos) {
	allPhotos.push({venue_name: photos});
	console.log('all photos: ', allPhotos.length);
}

function storeVenues(venues){
	allVenues = venues
	//console.log('all venues: ', allVenues);
}

var handlePhotos = function (photos, venue_name) {
	storePhotos(venue_name, photos);
	displayPhotos(venue_name, photos);
}

function displayPhotos(venue_name, photos){
	console.log('photos: ', photos);
	if (photos.length > 0) $('#photos').append('<h1 class="myheading">'+venue_name+'</h1>');
	for (var i = 0; i < photos.length; i++){
		$('#photos').append("<img  src='"+photos[i].prefix+'220x220'+photos[i].suffix+"' >");
	}
}

function getPictures(venue){
	//console.log('venue id ', venue_id);
	var endpoint = 'venues/'+venue.id+'/photos';
	var url = makeUrl(endpoint);

	return getJSON(url).then(function(response) {
		return response.response.photos.items;
	}).then(function(photos){
		handlePhotos(photos, venue.name);
	}).catch(function(err){
		console.log('Could not load photos', err);
	});

}

function makeUrl(endpoint, param){

	var base_url = 'https://api.foursquare.com/v2/';
	var url = null;

	if (param != undefined){
		url = base_url + endpoint + '?' + param[0] + '=' + param[1] + '&client_id=' + client_id + '&client_secret=' + client_secret;
	}
	else {
		url = base_url + endpoint + '?' + 'client_id=' + client_id + '&client_secret=' + client_secret;
	}

	return url;
}


function get(url) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = function() {
      // This is called even on 404 etc
      // so check the status
      if (req.status == 200) {
        // Resolve the promise with the response text
        resolve(req.response);
      }
      else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = function() {
      reject(Error("Network Error"));
    };

    // Make the request
    req.send();
  });
}


function getJSON(url) {
  return get(url).then(JSON.parse);
}


function downloadPhotosByLocation(loc){

  // find venues and get the pictures from each one
	var endpoint = 'venues/search';
	var url = makeUrl(endpoint, ['near', loc]);

	return getJSON(url).then(function(response) {
	  return response.response.venues;
	}).then(function(venues){
		return venues;
	}).catch(function(err){
		console.log('Error!', err);
	}).then(function(venues){
		storeVenues(venues);
		//getPictures(venues[0]);

		for(var i = 0; i < venues.length; i++){
			//storeVenue(venues[i]);
			getPictures(venues[i]);

		};
	});
}

$(document).ready(function(){
   $("#button").click(function(e){
      $("#photos").empty();
      var loc=$("#location").val();
      //console.log('Location 'loc' found!');
      e.preventDefault();
      downloadPhotosByLocation(loc);
   });
});

