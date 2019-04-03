var Restaurant = function() {
    self = this;
    self.marker = {};
    self.coordinates = {lat: 25.083390, lng: 121.551250};
};

var ViewModel = function() {
    var self = this;
    self.kickoff = function() {
        this.rest = new Restaurant();
        addMarker(this.rest, map);
    };
};

var viewM = new ViewModel();
ko.applyBindings( viewM );
