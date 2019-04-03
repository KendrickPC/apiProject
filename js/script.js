var map = {};
var marker = {};

function initMap() {
  var myLatLng = {lat: 25.083390, lng: 121.551250};

   var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15.5,
      center: myLatLng
  });
  viewM.kickoff();
}

function addMarker(restObj, map){
    var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">Taipei</h1>'+
        '<div id="bodyContent">'+
        '<p><b>Taipei</b> is my<br><br>' +
        'home.</p>'
        '</div>'+
        '</div>';

    marker = new google.maps.Marker({
        position: restObj.coordinates,
        animation: google.maps.Animation.DROP,
        map: map,
        // label: 'What up?',
        title: 'Hello Kenneth!'
    });

    var infoWindow = new google.maps.InfoWindow({
        content: contentString
    });

    // marker.addListener('click', toggleBounce);
    marker.addListener('click', function(){
        marker.setAnimation(4);
        infoWindow.open(map, marker);
    });

    map.addListener('click', function(){
        infoWindow.close();
    });
}
