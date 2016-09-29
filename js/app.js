var ViewModel = function() {
    
    this.venuesArray = ko.observableArray([
        {name: 'Bluebird Theater', lat: 39.7403, lng: -104.9484},
        {name: 'Ogden Theater', lat: 39.7403, lng: -104.9484},
        {name: 'Hi Dive', lat: 39.7163, lng: -104.9879},
        {name: 'Fillmore', lat: 39.7406, lng: -104.9772},
        {name: 'Paramount Theatre', lat: 39.7444, lng: -104.9903},
        {name: 'Larimer Lounge', lat: 39.7599, lng: -104.9838},
        {name: 'Summit Music Hall', lat: 39.7533, lng: -104.9951},
        {name: '3 Kings', lat: 39.7154, lng: -104.9873},
        {name: 'Cervantes', lat: 39.7545, lng: -104.9787},
        {name: 'Gothic Theatre', lat: 39.6577, lng: -104.9878}
        
    ]);
    
   
    selectedVenues = ko.observableArray([]);
    
    var xyz = selectedVenues()[0]
    
         var infowindow = new google.maps.InfoWindow({
  });
  
 

   for (i = 0; i < selectedVenues.length; i++) {  
        marker = new google.maps.Marker({
        position: new google.maps.LatLng(selectedVenues[i][1], selectedVenues[i][2]),
        map: map
      });
      
      
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(this.selectedVenues[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }  
    
    //console.log(selectedVenues().length)
}

ko.applyBindings(new ViewModel())

      

    $(document).ready(function() {
        $('#multiselect-includeSelectAllOption').multiselect({
            includeSelectAllOption: true,
            enableCaseInsensitiveFiltering: true
        });
    });

