var ViewModel = function() {
    this.name = ko.observable('Denver Concerts Tonight');
    this.imgSrc = ko.observable('http://svcdn.simpleviewinc.com/v3/cache/www_denver_org/0F2C4CC295D7D062AF82C1078420EB26.jpg');
    
    
}

ko.applyBindings(new ViewModel())
