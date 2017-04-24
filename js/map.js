// the map variable is taken from Google Maps Javascript API
// https://developers.google.com/maps/documentation/javascript/examples/map-simple
var map;
// the infowindow variable is taken from the following Google Maps documentation: 
// https://developers.google.com/maps/documentation/javascript/infowindows
var infowindow;
// the populateInfoWindow code is taken from Project_Code_3_WindowShoppingPart1.html
// from my Google Maps API Project
var populateInfoWindow;
//mostRecentlyClickedMarker global scope variable used to select only the most recently clicked marker
// located in the populateInfoWindow function
var mostRecentlyClickedMarker;
// the initMap function was taken from the following Google Maps documentation. 
// https://developers.google.com/maps/documentation/javascript/adding-a-google-map
    function initMap() {
        // function initMap() executed after Google Maps API has loaded
        // https://stackoverflow.com/questions/9228958/how-to-check-if-google-maps-api-is-loaded
        // Use the following code: if (typeof google === 'object' && typeof google.maps === 'object') {...} to check if it loaded successfully.
        if (typeof window.google === 'object' && typeof window.google.maps === 'object') {
    // Google Maps custom styles array retro found at the following link: 
    // https://snazzymaps.com/style/18/retro
    var styles = [
        {
            "featureType": "administrative",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "water",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "landscape",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.local",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "water",
            "stylers": [
                {
                    "color": "#84afa3"
                },
                {
                    "lightness": 52
                }
            ]
        },
        {
            "stylers": [
                {
                    "saturation": -17
                },
                {
                    "gamma": 0.36
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#3f518c"
                }
            ]
        }
    ];
        // initMap function testing
        console.log(initMap);

    // Variable mapConfiguration creates a new map with the center location at Taipei Main Station
    // Only center and zoom are required
    var mapConstructor = {
        center: new google.maps.LatLng(25.0422, 121.5083),
        zoom: 12,
        styles: styles,
        mapTypeControl: false
    };
    // calling the global scope map variable
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
    map = new google.maps.Map(document.getElementById('map'), mapConstructor);
    // calling the global scope infowindow variable
    infowindow = new google.maps.InfoWindow();
    }
    else {
    // Knockout JS visible binding documentation linked below: 
    // http://knockoutjs.com/documentation/visible-binding.html
    // viewModel.mapUnavailable linked to index.html <div class="missing-map" data-bind="visible: mapUnavailable">
    // https://developers.google.com/maps/documentation/javascript/infowindows
    viewModel.mapUnavailable(true);
    }
    // mapConstructor testing
    console.log(mapConstructor);
    


    var zoomAutocomplete = new google.maps.places.Autocomplete(document.getElementById('search-bar-zoom'));
    //Bias the boundaries within the map for the zoom to area text.
    zoomAutocomplete.bindTo('bounds', map);

    var largeInfowindow = new google.maps.InfoWindow();

    // Style the markers a bit. This will be our listing marker icon.
    var defaultIcon = makeMarkerIcon('dadb36');

    // Create a "highlighted location" marker color for when the user
    // mouses over the marker.
    var highlightedIcon = makeMarkerIcon('1eeca8');

    // The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < locations.length; i++) {
        // Get the position from the location array.
        var position = locations[i].location;
        var title = locations[i].title;
        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            icon: highlightedIcon,
            id: i
        });
        // Push the marker to our array of markers.
        markers.push(marker);
        // Create an onclick event to open an infowindow at each marker.
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
        });
        // Two event listeners - one for mouseover, one for mouseout,
        // to change the colors back and forth.
        marker.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
        });
        marker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
        });
    }
    document.getElementById('show-listings').addEventListener('click', showListings);
    document.getElementById('hide-listings').addEventListener('click', hideListings);
    document.getElementById('zoom-to-area').addEventListener('click', function() {
        zoomToArea();
    });
}

// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.setContent('<div>' + marker.title + '</div>');
        infowindow.open(map, marker);
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
        });
    }
}

// This function takes in a COLOR, and then creates a new marker
// icon of that color. The icon will be 21 px wide by 34 high, have an origin
// of 0, 0 and be anchored at 10, 34).
function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
        '|40|_|%E2%80%A2',
        new google.maps.Size(21,34),
        new google.maps.Point(0,0),
        new google.maps.Point(10,34),
        new google.maps.Size(21,34));
    return markerImage;
}

// This function will loop through the markers array and display them all.
function showListings() {
    var bounds = new google.maps.LatLngBounds();
    // Extend the boundaries of the map for each marker and display the marker
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
        bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
}

// This function will loop through the listings and hide them all.
function hideListings() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}


// This function takes the input value in the find nearby area text input
// locates it, and then zooms into that area. This is so that the user can
// show all listings, then decide to focus on one area of the map.
function zoomToArea() {
    // Initialize the geocoder.
    var geocoder = new google.maps.Geocoder();
    // Get the address or place that the user entered.
    var address = document.getElementById('search-bar-zoom').value;
    // Make sure the address isn't blank.
    if (address == '') {
        window.alert('Please must enter an area or address in Taipei, Taiwan.');
    } else {
        // Geocode the address/area entered to get the center. Then, center the map
        // on it and zoom in
        geocoder.geocode(
            { address: address,
                componentRestrictions: {country: 'TW'}
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location);
                    map.setZoom(14);
                } else {
                    window.alert('Google could not find your location - try entering a more' +
                        ' specific place.');
                }
            });
    };
}
}
