var denverMap;
var self = this;
var marker;



var ViewModel = function() {
    
    
    self.venues = ko.observableArray([
      
        {name: 'Bluebird Theater', lat: 39.7403, lng: -104.9484},
        {name: 'Ogden Theater', lat: 39.7403, lng: -104.9753},
        {name: 'Hi Dive', lat: 39.7163, lng: -104.9879},
        {name: 'Fillmore', lat: 39.7406, lng: -104.9772},
        {name: 'Paramount Theatre', lat: 39.7444, lng: -104.9903},
        {name: 'Larimer Lounge', lat: 39.7599, lng: -104.9838},
        {name: 'Summit Music Hall', lat: 39.7533, lng: -104.9951},
        {name: '3 Kings', lat: 39.7154, lng: -104.9873},
        {name: 'Cervantes', lat: 39.7545, lng: -104.9787},
        {name: 'Gothic Theatre', lat: 39.6577, lng: -104.9878}
       
        
        ]);
        
        // Define info window
        
        
        // Selected venues filter
        selectedVenues = ko.observableArray([]);
        
        // Return selected values
        
        // var concert = $.getJSON("https://api.songkick.com/api/3.0/venues/10459/calendar.json?apikey=XXXXXXXXXXXXXXXX")
        
        
         var concert = $.getJSON("https://api.songkick.com/api/3.0/venues/10459/calendar.json?apikey=XXXXXXXXXXX", function(data)
        {
            console.log(data.resultsPage.results.event[0].displayName)
        }); 
        
        // Loop through array to drop marker on each venue
        self.venues().forEach(function (venue) {
          
            self.venues.marker = new google.maps.Marker({
            map: denverMap,
            position: new google.maps.LatLng(venue.lat, venue.lng),
            title: venue.name,
            animation: google.maps.Animation.DROP
          })
          
          
          marker = self.venues.marker
          
          // Add listener for info windows on each map marker
          marker.addListener('click', (function() {
            infowindow.setContent(venue.name);
            infowindow.open(denverMap, this);
            
         }));
          
        return marker;
        });
        
        
         selected = ko.computed( function() {
          if (self.selectedVenues().length === 0) {
            return self.venues();
          } else {
            return ko.utils.arrayFilter(self.venues(), function(venue) {
              var filter = venue.name
              var match = self.selectedVenues().includes(filter)
              //console.log(match[0].name)
              //venue.marker.setVisible(match);
              return match;
              
            })
          }
        })
        
        
  
  /*  
     for (i = 0; i < selectedVenues().length; i++) {  
        console.log(selectedVenues()[i])
      };
 
*/

}



    function initMap() {
        // Styles a map in night mode via Google Maps API documentation
            
        denverMap = new google.maps.Map(document.getElementById('map'), {
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
        


        
        ko.applyBindings(new ViewModel());
    
     };

      
    // Uses multi select based on http://davidstutz.github.io/bootstrap-multiselect/
    $(document).ready(function() {
        $('#multiselect-includeSelectAllOption').multiselect({
            includeSelectAllOption: true,
            enableCaseInsensitiveFiltering: true
        });
    });

