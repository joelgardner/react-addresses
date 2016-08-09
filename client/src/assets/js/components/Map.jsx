import React from 'react'
//import { connect } from 'react-redux'

let Map = ({ addresses, selectedAddressId }) => {

  let query = 'San+Francisco+CA'
  if (selectedAddressId) {
    var address = !addresses || !addresses.length ? null : addresses.filter(a => {
      return a.id === selectedAddressId;
    })[0];

    if (address) {
      query = [
        address.street1,
        //address.street2,
        address.city,
        address.state,
        address.zip,
        address.country
      ].join('+')
    }
  }

  if (!addresses || !addresses.length || !addresses.filter(a => a.isOnMap).length) {
    return (
      <div className="o-panel  o-panel--nav-top">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          style={{border: 0}}
          src={"https://www.google.com/maps/embed/v1/place?key=AIzaSyDjRURQN7sT67RlMxfhnb09mrllTtoJ-VA&q=" + query}
          allowFullScreen>
        </iframe>
      </div>
    )
  }

  return (
    <div className="o-panel  o-panel--nav-top">
      <div id="map_panel" style={{width:"100%", height:"100%"}} ref={(e) => addresses.forEach((a) => initGoogleApi(e, a))}></div>
    </div>
  )
}

let toString = (address) => {
  return [
      address.street1,
      //address.street2,
      address.city,
      address.state,
      address.zip,
      address.country
    ].join(' ');
}

let map
let geocoder
//let initialized = false;
let markers = {};
let initGoogleApi = (e, address) => {

  // if we're not about to be put on the map...
  if (!address.isOnMap){
    // and we're not already on the map, nothing to do
    if (!markers[address.id]) return;

    // at this point we know we ARE on the map, but we shouldn't be, so we must remove our marker
    markers[address.id].setMap(null);
  }

  // if we

  if (!geocoder) {
    geocoder = new google.maps.Geocoder();
  }

  var str = toString(address);
  var options = {
    zoom: 8,
    center: new google.maps.LatLng(-34.397, 150.644),
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
    },
    navigationControl: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  if (!map) {
    map = new google.maps.Map(document.getElementById('map_panel'), options);
  }

  geocoder.geocode({
    'address': str
  }, function(results, status) {

    // do we have geocoder?
    if (status == google.maps.GeocoderStatus.OK) {
      if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
        map.setCenter(results[0].geometry.location);

        // create our info window
        let infowindow = new google.maps.InfoWindow({
          content: '<b>' + str + '</b>',
          size: new google.maps.Size(150, 50)
        });

        if (markers[address.id]) {
          return address.isOnMap ? markers[address.id].setMap(map) : undefined;
        }

        // create our marker
        let marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: map,
          title: str
        });

        markers[address.id] = marker;

        // open a window when clicked... it doesn't do much yet
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map, marker);
        });

      } else {
        debugger;
        console.log("No results found");
      }
    } else {
      console.log("Geocode was not successful for the following reason: " + status);
    }
  });
}


export default Map
