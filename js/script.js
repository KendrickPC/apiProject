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
    marker = new google.maps.Marker({
        position: restObj.coordinates,
        animation: google.maps.Animation.DROP,
        map: map,
        title: 'Hello Kenneth!'
    });

    // marker.addListener('click', toggleBounce);
    marker.addListener('click', function(){
        marker.setAnimation(4);
        restObj.infoWindow.open(map, marker);
    });

    map.addListener('click', function(){
        restObj.infoWindow.close();
    });
}
