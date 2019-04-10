// Find Place from Query takes a text input and returns a place.
// The input can be any kind of Place data, for example a business
// name or address. To make a Find Place from Query request, call
// the PlaceService's findPlaceFromQuery() method, which takes the
// following parameters:

// * query (required) A text string on which to search.
// * fields (required) One or more fields specifying the types of Place
//   data to return. 
// * locationBias (optional) Coordinates defining the area to search.
//   This can be one of the following:

    // A set of lat/lng coordinates specified as LatLngLiteral or LatLng object.
    // Rectangular bounds (two lat/lng pairs, or a LatLngBounds object).
    // Radius (in meters) centered on a lat/lng.

// You must also pass a callback method to findPlaceFromQuery(), to handle
// the results object and google.maps.places.PlacesServiceStatus response.

// Google Maps Places Search Javascript API
// https://developers.google.com/maps/documentation/javascript/examples/place-search

var map = {};
var marker = {};
var infoWindow = {}

window.initMap = function() {

if (typeof window.google === 'object' && typeof window.google.maps === 'object') {

    var styles = [{
            "featureType": "administrative",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": "-100"
                }
            ]
        },
        {
            "featureType": "administrative.province",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 65
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": "50"
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": "-100"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "all",
            "stylers": [
                {
                    "lightness": "30"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [
                {
                    "lightness": "40"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "hue": "#ffff00"
                },
                {
                    "lightness": -25
                },
                {
                    "saturation": -97
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [
                {
                    "lightness": -25
                },
                {
                    "saturation": -100
                }
            ]
        }
    ]

        var myLatLng = new google.maps.LatLng({lat: 25.042420, lng: 121.532770});
        var zoom = viewM.isMobile() ? 12.5 : 13;

        map = new google.maps.Map(document.getElementById('map'), {
            zoom: zoom,
            center: myLatLng,
            styles: styles
        });

        map.addListener( 'click', function(){
            viewM.closeWindows();
        });
    }
};
// Google Maps and Knockout JS
// https://stackoverflow.com/questions/12722925/google-maps-and-knockoutjs

// BikeInCity 2 - KnockoutJS, JQuery, Google Maps
// https://www.codeproject.com/Articles/387626/BikeInCity-2-KnockoutJS-JQuery-Google-Maps

var Neighborhood = function ( neighborhood ) {
    var self = this;
    self.districtName = neighborhood;
    self.visible = ko.observable( true );
}

var Restaurant = function( restObj, venue_data ) {
    var self = this;
    self.id = restObj.id;
    self.name = restObj.name;
    self.address = restObj.address;
    self.description = restObj.notes;
    // self.description = restObj.address;
    self.neighborhood = restObj.neighborhood;
    self.is_visible = false;

    self.coordinates = {};
    self.img_url = '';
    self.url = '';
    self.rest_url = '';

    var img_size = '100x100';
    var contentString = $( '#info-template' ).html();

    // Populating restaurant object values with Foursquare API data.
    self.coordinates.lat = parseFloat(venue_data.location.lat);
    self.coordinates.lng = parseFloat(venue_data.location.lng);
    self.img_url = venue_data.bestPhoto.prefix + img_size + venue_data.bestPhoto.suffix;
    self.url = venue_data.canonicalUrl;
    self.rest_url = venue_data.url;

    // Modifying template with restObj values.
    contentString = contentString.replace( '{{title}}', self.name )
                                 .replace( '{{address}}', self.address )
                                 .replace( '{{img_url}}', self.img_url )
                                 .replace( '{{rest_url}}', self.rest_url)
                                 .replace( '{{url}}', self.url )
                                 .replace( '{{content}}', self.description );

    self.marker = new google.maps.Marker({
        position: self.coordinates,
        title: self.name
    });

    self.infoWindow = new google.maps.InfoWindow({
        content: contentString
    });

};



var ViewModel = function() {
    var self = this;
    var foursquareUrl = 'https://api.foursquare.com/v2/venues/';
    var foursquareParams = $.param({
        'client_id': 'WD2PWD3XXQGUBSXDTKXVFE2Y3CNB03FRPTXSORFUHGUVVGPO',
        'client_secret': 'YHLXV3YGUTIBM45TVR3AK1JZTTUURFZUKXMNKEOMXSFOQLXD',
        'v': '20190401'
    });

    self.windowOpen = ko.observable( false );
    self.hasFiltered = ko.observable( false );
    self.restList = ko.observableArray( [] );
    self.neighborhoodList = ko.observableArray( [] );

    // detects if @media CSS responsive styles have been triggered
    // Assumes user is on mobile.  Currently only impacts initial maps zoom.
    self.isMobile = function (){
        var navSize = $('.navbar-nav').css('width');
        return navSize === "200px" ? true : false;
    };

    // Unique list of neighborhoods from the basic input data.
    var reducedList = restObjArray.reduce(function ( outList, rest ){
        if (outList.indexOf(rest.neighborhood) === -1) {
            outList.push( rest.neighborhood );
        }
       return outList
    }, []);

    // Building the neighborhoodList and each model.
    reducedList.forEach(function ( name ) {
        self.neighborhoodList.push( new Neighborhood( name ) );
    });

    // Simple dictionary to show which neighbood(s) are visible.
    self.neighborhoodDict = ko.computed(function(){
        var dictObj = {};
        self.neighborhoodList().forEach(function ( neighborhood ){
            dictObj[neighborhood.districtName] = neighborhood.visible();
        });

        return dictObj
    });

    // Run AJAX calls for each venue in the restObjArray
    // Builds the Restaurant and Neighborhood models
    restObjArray.forEach(function ( restObj ){
        var api_url = foursquareUrl + restObj.id + '?' + foursquareParams;

        $.ajax({
            url: api_url,
            data: {format: 'json'},
            dataType: 'json'
        }).done(function(data){

            var venue_data = data.response.venue;
            self.restList.push( new Restaurant( restObj, venue_data ) );

        }).fail(function(){
            console.log( 'Foursquare API failed for ' + restObj.name );
            self.errorMessage( 'Foursquare', 'Failed request for ' + restObj.name )
        });

    });

    // Check (and closes) if another window was previously called.
    self.closeWindows = function() {
        if ( self.windowOpen() ) {
            self.windowOpen().close();
            self.windowOpen( false );
        }
    }

    self.toggleMarker = function( rest ) {
        if (self.windowOpen() !== rest.infoWindow) {
            self.closeWindows();
            rest.marker.setAnimation( 4 );
            rest.infoWindow.open( map, rest.marker );
            self.windowOpen( rest.infoWindow );
        } else {
            self.closeWindows();
        }
    };

    // Returns list of Restaurants based on neighborhood visibility.
    // Is called every time the neighborhood visibility is changed.
    self.getMarkers = ko.computed(function() {
        return self.restList().filter(function ( rest ) {
            if ( self.neighborhoodDict()[rest.neighborhood] ) {
                if ( rest.is_visible == false ) {
                    rest.marker.setMap( map );
                    rest.marker.setAnimation( google.maps.Animation.DROP );

                    // prevents constant stacking of event listeners.
                    google.maps.event.clearInstanceListeners(rest.marker);
                    rest.marker.addListener( 'click', function(){
                        self.toggleMarker( rest );
                    });
                }
                rest.is_visible = true;

                return true;

            } else {
                rest.marker.setMap( null );
                rest.is_visible = false;

                return false;
            }
        });
    }, self);

    self.selectNeighborhood = function( neighborhood ) {
        self.closeWindows();
        self.clearAll();
        neighborhood.visible( true );
    }

    self.clearAll = function() {
        self.neighborhoodList().forEach(function ( neighborhood ) {
            neighborhood.visible( false );
        });

        self.hasFiltered( true );
    };

    self.selectAll = function() {
        self.neighborhoodList().forEach(function ( neighborhood ) {
            neighborhood.visible( true );
        });

        self.hasFiltered( false );
    };

    // Navbar toggle logic taken from bootsnipp, with modifications.
    // http://bootsnipp.com/snippets/featured/admin-side-menu
    self.toggleNavbar = function() {
        $('.navbar-nav').toggleClass('slide-in');
        $('.side-body').toggleClass('body-slide-in');
    };

    self.closeNavbar = function() {
        $('.navbar-nav').removeClass('slide-in');
        $('.side-body').removeClass('body-slide-in');
    };

    self.errorMessage = function ( source, additionalInfo ) {
        additionalInfo = additionalInfo || ''
        var errorMessage = $('#error-template').html();
        errorMessage = errorMessage.replace( '{{apiSource}}', source )
                                   .replace( '{{additionalInfo}}', additionalInfo);
        $('.side-body').prepend(errorMessage);
    };
};

// Activates Knockout JS
// http://learn.knockoutjs.com/#/?tutorial=intro
var viewM = new ViewModel();
ko.applyBindings( viewM );
