// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
function AppViewModel() {
    this.firstName = ko.observable("Kendrick");
    this.lastName = ko.observable("Chang");
    this.fullName = ko.computed(function() {
    return this.lastName() + ", " + this.firstName();    
}, this);
	  this.capitalizeLastName = function() {
	    var currentVal = this.lastName();        // Read the current value
	    this.lastName(currentVal.toUpperCase()); // Write back a modified value
	};
}

// Activates knockout.js
ko.applyBindings(new AppViewModel());





