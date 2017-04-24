// Main Class that serves as Blueprint for each Location Marker
// Will show the desired information of each popup window for each markerInformation 
var markerInformation = function (title, lng, lat, wikipediaID, pageID, marker) {
	var self = this;
	this.title = title;
	this.lng = lng;
	this.lat = lat;
	this.wikipediaID = wikipediaID;
	this.pageID = pageID;
	this.marker = marker;
};

// viewModel for locations in knockout.js
// locations array added of Taipei subway stations
var viewModel = {
    locations: [
        new markerInformation('Taipei Main Station', 25.0464, 121.5176, 'Taipei_Railway_Station', 959045),
        new markerInformation('Nanjing Fuxing MRT Station', 25.0522, 121.5440, 'Nanjing_Fuxing_Station', 18443746),
        new markerInformation('Zhongxiao Fuxing MRT Station', 25.0410, 121.5438, 'Zhongxiao_Fuxing_Station', 14254937),
        new markerInformation('Ximen MRT Station ', 25.0422, 121.5083, 'Ximen_Station', 14254222),
        new markerInformation('Taipei 101', 25.0331, 121.5632, 'Taipei_101_/_World_Trade_Center_Station', 14254732),
    ],
    //ko observable for Menu with Navigation Bar Toggle Button
    visibleMenu: ko.observable(false),
    //ko observable used for running a search against locations array
    searchBox: ko.observable(''),
    //ko observable used for populateInfoWindow when list items are triggered/clicked
    clickEventHandlerFunction: function() {
        populateInfoWindow(this.marker);
    },
    //ko observable determining if error div should be shown
    mapUnavailable: ko.observable(false)
};
//Toggle Button / Side Menu Function when Clicked
    viewModel.clickMe = function() {
        var self = this;
        this.visibleMenu(!this.visibleMenu());
    };

// Search function for filtering through the list of locations based on the name of the location.
// Show or hide the associated markers on the map when searched.
    viewModel.search = ko.computed(function() {
        var self = this;
        var searchResult = this.searchBox().toLowerCase();
        var searchCompare = ko.utils.compareArrays(self.locations, self.search);

        return ko.utils.arrayFilter(self.locations, function(markerLocation) {
            var title = markerLocation.title.toLowerCase();
            var matched = title.indexOf(searchResult) >= 0;
            var marker = markerLocation.marker;
            if (marker) {
                marker.setVisible(matched);
            }
            return matched;
        });
    }, viewModel);


// Menu Toggle Script
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

// Menu Close and Toggle Script
$("#menu-toggled").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});


ko.applyBindings(viewModel);
