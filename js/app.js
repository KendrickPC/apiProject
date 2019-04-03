// Foursquare API info:
// client ID: WD2PWD3XXQGUBSXDTKXVFE2Y3CNB03FRPTXSORFUHGUVVGPO
// client secret: YHLXV3YGUTIBM45TVR3AK1JZTTUURFZUKXMNKEOMXSFOQLXD
// v: <YEAR/MO/DY>

var foursquareUrl = 'https://api.foursquare.com/v2/venues/';
var foursquareParams = $.param({
    'client_id': 'WD2PWD3XXQGUBSXDTKXVFE2Y3CNB03FRPTXSORFUHGUVVGPO',
    'client_secret': 'YHLXV3YGUTIBM45TVR3AK1JZTTUURFZUKXMNKEOMXSFOQLXD',
    'v': '20190402'
});

var restObjArray = [
    {
        'name': 'Cuckoos Nest',
        'id': '4cd6bc2baeb1224b80df29ff',
        'notes': 'Cuckoos Nest'
    }
];

var Restaurant = function(restObj) {
    self = this;
    self.id = restObj.id;
    self.name = restObj.name;
    self.description = restObj.notes;

    self.api_url = foursquareUrl + self.id + '?' + foursquareParams;

    $.ajax({
        url: self.api_url,
        data: {format: 'json'},
        dataType: 'json'
    }).done(function(data){
        console.log(data);
        console.log('Successfully queried Foursquare API for ' + self.name);
    }).fail(function(){
        console.log('Foursquare API failed for ' + self.name);
    });

    self.coordinates = {lat: 37.780679, lng: -122.396086};
    self.img_url = 'https://fastly.4sqi.net/img/general/600x600/5523591_GPT3g8CEdK1oMe8bvXcGfBHAgSV65-zvuDAgsmtz23Q.jpg';
    self.url = 'https://foursquare.com/v/%E6%9D%9C%E9%B5%91%E7%AA%A9%E5%92%96%E5%95%A1-cockoos-nest/4cd6bc2baeb1224b80df29ff';
    self.rest_url = 'http://espn.com';

    var img_size = '100x100';

    var contentString = $( '#info-template' ).html();

    contentString = contentString.replace( '{{title}}', self.name )
                                 .replace( '{{img_url}}', self.img_url )
                                 .replace( '{{rest_url}}', self.rest_url)
                                 .replace( '{{url}}', self.url )
                                 .replace( '{{content}}', self.description );

    self.infoWindow = new google.maps.InfoWindow({
        content: contentString
    });

};

var ViewModel = function() {
    var self = this;

    self.kickoff = function() {
        self.rest = new Restaurant(restObjArray[0]);
        addMarker(self.rest, map);
    };
};

var viewM = new ViewModel();
ko.applyBindings( viewM );
