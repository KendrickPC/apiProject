// Main Class that serves as Blueprint for each Location Marker
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
var viewModel = {
    locations: [
        new markerInformation('Taipei Main Station', 25.0464, 121.5176, 'Taipei_Railway_Station', 959045),
        new markerInformation('Nanjing Fuxing MRT Station', 25.0522, 121.5440, 'Nanjing_Fuxing_Station', 18443746),
        new markerInformation('Zhongxiao Fuxing MRT Station', 25.0410, 121.5438, 'Zhongxiao_Fuxing_Station', 14254937),
        new markerInformation('Ximen MRT Station ', 25.0422, 121.5083, 'Ximen_Station', 14254222),
        new markerInformation('Taipei 101', 25.0340, 121.5645, 'Taipei_101', 203801),
    ]
}

// Model View Controller knockout.js

var ViewModel = function () {
    this.title = ko.observable('Taipei Main Station MRT');
    this.lat = ko.observable(25.0464);
    this.lng = ko.observable(121.5176);

}
ko.applyBindings(new ViewModel());

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
