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
