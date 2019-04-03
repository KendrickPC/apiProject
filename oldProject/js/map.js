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
        // Google Maps custom styles array found at the following link: 
        // https://snazzymaps.com/
        var styles = [{
                "featureType": "all",
                "elementType": "labels",
                "stylers": [{
                        "visibility": "on"
                    },
                    {
                        "hue": "#ff0000"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text",
                "stylers": [{
                        "visibility": "on"
                    },
                    {
                        "hue": "#ff0000"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "hue": "#ff0000"
                }]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [{
                        "hue": "#ff0000"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "on"
                }]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [{
                        "color": "#f9ddc5"
                    },
                    {
                        "lightness": -7
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "on"
                }]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "labels",
                "stylers": [{
                        "visibility": "off"
                    },
                    {
                        "color": "#ff0000"
                    }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "poi.business",
                "elementType": "all",
                "stylers": [{
                        "color": "#645c20"
                    },
                    {
                        "lightness": 38
                    }
                ]
            },
            {
                "featureType": "poi.government",
                "elementType": "all",
                "stylers": [{
                        "color": "#9e5916"
                    },
                    {
                        "lightness": 46
                    }
                ]
            },
            {
                "featureType": "poi.medical",
                "elementType": "geometry.fill",
                "stylers": [{
                        "color": "#813033"
                    },
                    {
                        "lightness": 38
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "all",
                "stylers": [{
                        "color": "#645c20"
                    },
                    {
                        "lightness": 39
                    }
                ]
            },
            {
                "featureType": "poi.school",
                "elementType": "all",
                "stylers": [{
                        "color": "#a95521"
                    },
                    {
                        "lightness": 35
                    }
                ]
            },
            {
                "featureType": "poi.sports_complex",
                "elementType": "all",
                "stylers": [{
                        "color": "#9e5916"
                    },
                    {
                        "lightness": 32
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [{
                        "lightness": 43
                    },
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#cc7578"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [{
                        "visibility": "on"
                    },
                    {
                        "invert_lightness": true
                    },
                    {
                        "color": "#ff0000"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text",
                "stylers": [{
                    "color": "#ffffff"
                }]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [{
                        "visibility": "on"
                    },
                    {
                        "color": "#cc7578"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [{
                        "color": "#f19f53"
                    },
                    {
                        "weight": 1.3
                    },
                    {
                        "visibility": "on"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.stroke",
                "stylers": [{
                        "color": "#f19f53"
                    },
                    {
                        "lightness": -10
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [{
                    "lightness": 38
                }]
            },
            {
                "featureType": "transit.line",
                "elementType": "all",
                "stylers": [{
                        "color": "#813033"
                    },
                    {
                        "lightness": 22
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [{
                        "color": "#1994bf"
                    },
                    {
                        "saturation": -69
                    },
                    {
                        "gamma": 0.99
                    },
                    {
                        "lightness": 43
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [{
                        "visibility": "on"
                    },
                    {
                        "color": "#000000"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text",
                "stylers": [{
                    "visibility": "on"
                }]
            }
        ];

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
    } else {
        // Knockout JS visible binding documentation linked below: 
        // http://knockoutjs.com/documentation/visible-binding.html
        // viewModel.mapUnavailable linked to index.html <div class="missing-map" data-bind="visible: mapUnavailable">
        // https://developers.google.com/maps/documentation/javascript/infowindows
        viewModel.mapUnavailable(true);
    }
    // For Loop through the viewModel.locations: [...] array located in my app.js file
    // Run a test with console.log(self);
    for (var i = 0; i < viewModel.locations.length; i++) {
        var self = viewModel.locations[i];
        // Marker and functions drawn from Sample Code on Google Maps API Course on Udacity
        // https://www.udacity.com/course/google-maps-apis--ud864
        // This function takes in a COLOR, and then creates a new marker
        // icon of that color. The icon will be 20 px wide by 30 high, have an origin
        // of 0, 0 and be anchored at 20, 30).
        function makeMarkerIcon(markerColor) {
            var markerImage = new google.maps.MarkerImage(
                'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
                '|40|_|%E2%80%A2',
                new google.maps.Size(20, 30),
                new google.maps.Point(0, 0),
                new google.maps.Point(10, 30),
                new google.maps.Size(20, 30));
            return markerImage;
        }
        // The defaultIcon variable is taken from Udacity's google-maps-api course
        // https://www.udacity.com/course/google-maps-apis--ud864
        // Style the markers a bit. This will be our listing marker icon.
        var defaultIcon = makeMarkerIcon('FF0000');
        // The highlightedIcon variable is taken from Udacity's google-maps-api course
        // https://www.udacity.com/course/google-maps-apis--ud864
        // Create a "highlighted location" marker color for when the user
        // mouses over the marker.
        var highlightedIcon = makeMarkerIcon('FFFF00');
        // Knockout JS creating a marker per location, and placed into markerInformation array
        viewModel.locations[i].marker = new google.maps.Marker({
            position: new google.maps.LatLng(self.lng, self.lat),
            map: map,
            title: self.title,
            icon: defaultIcon,
            wikipediaID: self.wikipediaID
        });
        // Two event listeners - one for mouseover, one for mouseout,
        // to change the colors back and forth.
        // code taken from Udacity's google-maps-api course
        // https://www.udacity.com/course/google-maps-apis--ud864
        viewModel.locations[i].marker.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
        });
        viewModel.locations[i].marker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
        });
        // Populates an infowindow for a marker when clicked
        // This function populates the infowindow when the marker is clicked. We'll only allow
        // one infowindow which will open at the marker that is clicked, and populate based
        // on that markers position.
        populateInfoWindow = function(marker) {
            //mostRecentlyClickedMarker Variable used to select only the most recently clicked marker
            // Javascript undefined and null
            // http://stackoverflow.com/questions/2647867/how-to-determine-if-variable-is-undefined-or-null
            if (mostRecentlyClickedMarker != null || mostRecentlyClickedMarker != undefined) {
                mostRecentlyClickedMarker.setIcon(defaultIcon);
            }
            mostRecentlyClickedMarker = marker;
            // Highlights the marker when clicked. 
            // marker.setIcon code found from the following Google Documentation:
            // https://developers.google.com/maps/documentation/javascript/markers
            marker.setIcon(highlightedIcon);
            // Google Maps panTo code found from the following stackoverflow resource:
            // http://stackoverflow.com/questions/6191714/google-maps-panto-onclick
            map.panTo(marker.getPosition());

            // Animates (bounce effect) set to stop after 750ms
            // code for the marker animation is found at the following stackoverflow link:
            // http://stackoverflow.com/questions/7339200/bounce-a-pin-in-google-maps-once
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() {
                marker.setAnimation(null);
            }, 1400);
            // infowindow.setContent code found from the following stackoverflow resource:
            // http://stackoverflow.com/questions/7402667/google-maps-multiple-markers-1-infowindow-problem
            infowindow.setContent(marker.title);
            infowindow.open(map, marker);
            // URL of Wikipedia Articles for Content Reference
            // http://stackoverflow.com/questions/8555320/is-there-a-clean-wikipedia-api-just-for-retrieve-content-summary
            // Query: Getting Stack Overflow's intro in plain text:
            // https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=Stack%20Overflow
            var wikipediaSource = 'https://en.wikipedia.org/wiki/' + marker.wikipediaID;
            // Clean wikipedia api content summary retrieve URL
            // http://stackoverflow.com/questions/8555320/is-there-a-clean-wikipedia-api-just-for-retrieve-content-summary
            var wikipediaURL = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' + marker.wikipediaID;
            // Wikipedia API instructions to show data
            // http://carolflyjs.github.io/how-to-guide/display-data.html
            $.ajax({
                method: 'GET',
                url: wikipediaURL,
                dataType: 'jsonp',
            }).done(function(response) {

                var extract = response.query.pages[Object.keys(response.query.pages)[0]].extract;
                // change
                infowindow.setContent('<div>' + '<h3 class="marker-title">' + marker.title + '</h3>' + extract + '<br>(Source: ' + '<a href=' + wikipediaSource + '>Wikipedia)</a>' + '</div>');

                //Set Content if failure of AJAX request
            }).fail(function(jqXHR, textStatus, errorThrown) {
                infowindow.setContent('<div>' + 'No Service/ Connection Detected (Please try again later)' + '</div>');
            });
        };

        // Event listener to  populateInfoWindow when clicked.
        this.addListener = google.maps.event.addListener(self.marker, 'click', function() {
            populateInfoWindow(this);
        });
    }
}
// Fallback error handling method for Google Maps
mapError = function() {
    viewModel.mapUnavailable(true);
};