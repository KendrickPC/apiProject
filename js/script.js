var marker = {}

function initMap() {
  var myLatLng = {lat: 25.083390, lng: 121.551250};

   var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15.5,
      center: myLatLng
  });

   marker = new google.maps.Marker({
      position: myLatLng,
      animation: google.maps.Animation.DROP,
      map: map,
      title: 'Taipei is AMAZING!'
  });

   // marker.addListener('click', toggleBounce);
  marker.addListener('click', function(){
      marker.setAnimation(4);
  });

}

 function toggleBounce() {
  if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
  } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

// https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
  addEventListener(document, "touchstart", function(e) {
    console.log(e.defaultPrevented);  // will be false
    e.preventDefault();   // does nothing since the listener is passive
    console.log(e.defaultPrevented);  // still false
  }, Modernizr.passiveeventlisteners ? {passive: true} : false);