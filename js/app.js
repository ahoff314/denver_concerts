var ViewModel = function() {
    
    this.venuesArray = ko.observableArray([
            "Bluebird Theater",
            "Ogden Theater",
            "Hi Dive",
            "Fillmore",
            "Paramount Theatre",
            "Larimer Lounge",
            "Summit Music Hall",
            "3 Kings",
            "Cervantes",
            "Gothic Theater",
        
    ]);
    
    // If concert tonight, push venue into new array
 
    
}

ko.applyBindings(new ViewModel())

    function initMap() {
        // Styles a map in night mode via Google Maps API documentation
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 39.7392, lng: -104.9903},
          zoom: 13,
          styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
        });
        
    var locations = [
        
        ['Bluebird Theater', 39.7403, -104.9484],
        ['Ogden Theater', 39.7403, -104.9484],
        ['Hi Dive', 39.7163, -104.9879],
        ['Fillmore', 39.7406, -104.9772],
        ['Paramount Theatre', 39.7444, -104.9903],
        ['Larimer Lounge', 39.7599, -104.9838],
        ['Summit Music Hall', 39.7533, -104.9951],
        ['3 Kings', 39.7154, -104.9873],
        ['Cervantes', 39.7545, -104.9787],
        ['Gothic Theatre', 39.6577, -104.9878]
        
        ]    
    var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading"> BLUEBIRD THEATER</h1>'+
      '<div id="bodyContent">'+
      '<p> Todays date | Seat Geek // SongKick data goes here</p>'+
      '</div>'+
      '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
  

   for (i = 0; i < locations.length; i++) {  
        marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });
      
      
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }  
      
    //var marker = new google.maps.Marker({
    //position: {lat: 39.7403, lng: -104.9484},
    //map: map,
    //title: 'Bluebird Theater'
    
  //});
  
  

  //marker.addListener('click', function() {
    //infowindow.open(map, marker);
  //});
  
     }
      

    $(document).ready(function() {
        $('#multiselect-includeSelectAllOption').multiselect({
            includeSelectAllOption: true
        });
    });

    


// ko observable or array or for loop that 
// loops through each marker in array and attaches infowindow to it dynamically