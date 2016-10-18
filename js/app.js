var denverMap;
var self = this;
var marker;
var error;
venues = [];

var ViewModel = function() {


    self.venues = ko.observableArray([

        {name: "Bluebird Theater", lat: 39.7403, lng: -104.9484, id: 10459},
        {name: "Ogden Theater", lat: 39.7403, lng: -104.9753, id: 537},
        {name: "Hi Dive", lat: 39.7163, lng: -104.9879, id: 2951},
        {name: "Fillmore", lat: 39.7406, lng: -104.9772, id: 1009},
        {name: "Paramount Theatre", lat: 39.7444, lng: -104.9903, id: 1171},
        {name: "Summit Music Hall", lat: 39.7533, lng: -104.9951, id: 836146},
        {name: "3 Kings", lat: 39.7154, lng: -104.9873, id: 171428},
        {name: "Cervantes Ballroom", lat: 39.7545, lng: -104.9787, id: 5668},
        {name: "Gothic Theatre", lat: 39.6577, lng: -104.9878, id: 5229},
        {name: "Ophelia's Electric Soapbox", lat: 39.7526, lng: -104.9920, id:2944358}


    ]);

    // Venue names array for list view options
    this.venue_names = ko.observableArray(venues.slice(0));

    // Selected venues array
    selectedVenues = ko.observableArray([]);

    var infowindow = new google.maps.InfoWindow({});

    // Loop through array to drop marker at each venue
    self.venues().forEach(function (venue) {

        // Create markers
        marker = new google.maps.Marker({
            map: denverMap,
            position: new google.maps.LatLng(venue.lat, venue.lng),
            title: venue.name,
            animation: google.maps.Animation.DROP
        });


        // Songkick API - GET venue name, three upcoming concerts, and dates
        songkick_id = venue.id;
        var concert, concert1, concert2;

        // JSONP used via Songkick API docs: http://www.songkick.com/developer/event-search
        $.getJSON("https://api.songkick.com/api/3.0/venues/" + songkick_id + "/calendar.json?apikey=a3sNs8vQ4zpgjhCU&jsoncallback=?", function (data) {

            console.log("Success");

            concert = data.resultsPage.results.event[0].performance[0].artist.displayName;
            concert1 = data.resultsPage.results.event[1].performance[0].artist.displayName;
            concert2 = data.resultsPage.results.event[2].performance[0].artist.displayName;

            date = data.resultsPage.results.event[0].start.date;
            date1 = data.resultsPage.results.event[1].start.date;
            date2 = data.resultsPage.results.event[2].start.date;

        }).fail(function() {
             error = true;

        });


        venue.marker = marker;


        // Add listener for info windows on each map marker
        marker.addListener('click', function () {
            venue.marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function(){ venue.marker.setAnimation(null); }, 1450);

            if (error === true) {
                contentString =
                    '<h1>' + venue.name + '</h1>' +
                    '<p> Error loading Songkick data... </p>' +
                    '<p>Click<a href=http://www.songkick.com/venues/' + venue.id + ' target="_blank"> here </a> for upcoming events</p>';
            } else {
                contentString =
                    '<h1><a href=http://www.songkick.com/venues/' + venue.id + ' target="_blank">' + venue.name + '</a></h1>' +
                    '<p><strong>' + date + '</strong>' + ' ' + concert + '</p>' +
                    '<p><strong>' + date1 + '</strong>' + ' ' + concert1 + '</p>' +
                    '<p><strong>' + date2 + '</strong>' + ' ' + concert2 + '</p>';
            }

            infowindow.setContent(contentString);
            infowindow.open(denverMap, this);


        });


        return marker;
    });


    selected = ko.computed( function() {
        // If there are no selected venues make all map markers visible
        if (self.selectedVenues().length === 0) {
            return ko.utils.arrayFilter(self.venues(), function(venue) {

                venue.marker.setVisible(true);
                return true;

            });
        } else {
            // Filter selected venues to make only selected map markers visible
            ko.utils.arrayFilter(self.venues(), function(venue) {
                var filter = venue.name;
                var match = self.selectedVenues().includes(filter);

                venue.marker.setVisible(match);

                return match;

            });

        }

    });


    $( ".jumbotron" ).click(function() {
        alert( "Keep trucking along! :)" );
    });


    self.openInfo = function(venue) {

        console.log("Click binding works...");

        venue.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function(){ venue.marker.setAnimation(null); }, 1450);

        self.infoWindow.setContent(venue.contentString);
        self.infoWindow.open(denverMap, venue.marker);


        //google.maps.event.trigger(venue.marker, 'click');


    };

};



function initMap() {
    // Styles a map in dark theme via Google Maps API documentation

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

}


// Uses multi select based on http://davidstutz.github.io/bootstrap-multiselect/
$(document).ready(function() {
    $('#multiselect-includeSelectAllOption').multiselect({
        enableCaseInsensitiveFiltering: true
    });
});
