var denverMap;
var self = this;
var marker;
venues = [];



var ViewModel = function() {
    
    
    self.venues = ko.observableArray([
      
        {name: 'Bluebird Theater', lat: 39.7403, lng: -104.9484, id: 10459},
        {name: 'Ogden Theater', lat: 39.7403, lng: -104.9753, id: 537},
        {name: 'Hi Dive', lat: 39.7163, lng: -104.9879, id: 2951},
        {name: 'Fillmore', lat: 39.7406, lng: -104.9772, id: 1009},
        {name: 'Paramount Theatre', lat: 39.7444, lng: -104.9903, id: 1171},
        {name: 'Larimer Lounge', lat: 39.7599, lng: -104.9838, id: 11428},
        {name: 'Summit Music Hall', lat: 39.7533, lng: -104.9951, id: 836146},
        {name: '3 Kings', lat: 39.7154, lng: -104.9873, id: 171428},
        {name: 'Cervantes Ballroom', lat: 39.7545, lng: -104.9787, id: 5668},
        {name: 'Gothic Theatre', lat: 39.6577, lng: -104.9878, id: 5229}
       
        
        ]);

    // Selected venues filter
    selectedVenues = ko.observableArray([]);

    var infowindow = new google.maps.InfoWindow({

    });


    // Songkick API

    /*
    $.getJSON("https://api.songkick.com/api/3.0/venues/10459/calendar.json?apikey=a3sNs8vQ4zpgjhCU", function(data)
    {

        concert = data.resultsPage.results.event[0].displayName
        //console.log(data.resultsPage.results.event[1].displayName)
        //console.log(data.resultsPage.results.event[2].displayName)
    });

    */
    var markers = [];

    // Loop through array to drop marker on each venue
        self.venues().forEach(function (venue) {

            marker = new google.maps.Marker({
            map: denverMap,
            position: new google.maps.LatLng(venue.lat, venue.lng),
            title: venue.name,
            animation: google.maps.Animation.DROP
          });


            // SONGKICK API
            songkick = venue.id
            var concert, concert1, concert2;

            $.getJSON("https://api.songkick.com/api/3.0/venues/" + songkick + "/calendar.json?apikey=a3sNs8vQ4zpgjhCU", function(data)
            {

                concert = data.resultsPage.results.event[0].displayName
                //concert1 = data.resultsPage.results.event[1].displayName
                //concert2 = data.resultsPage.results.event[2].displayName
                //console.log(concert)

            });


          // Add listener for info windows on each map marker
          marker.addListener('click', (function() {
              contentString =
                  '<h1>' + venue.name + '</h1>' +
                  '<p>' + concert + '</p>'

                  infowindow.setContent(contentString);
              infowindow.open(denverMap, this);

         }));


            venue.marker = marker
        return marker;
        });

    // Return selected values
    selected = ko.computed( function(venue) {
        if (self.selectedVenues().length === 0) {
            return ko.utils.arrayFilter(self.venues(), function(venue) {

                venue.marker.setVisible(true);


                //console.log(match)
                return true;

            })
        } else {
            return ko.utils.arrayFilter(self.venues(), function(venue) {
                var filter = venue.name
                var match = self.selectedVenues().includes(filter);
                venue.marker.setVisible(match);

                return match;

            })
        }
    });




    /*
     for (i = 0; i < selected().length; i++) {
     console.log(selected()[i].name)
     };

  */

};



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
            enableCaseInsensitiveFiltering: true
        });
    });

