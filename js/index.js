
window.onload = function() {
    displayStores();
}

var map;
var markers = [];
var infoWindow;

function initMap() {
    var losAngeles = {
        lat: 34.063380, 
        lng: -118.358080
    };
    map = new google.maps.Map(document.getElementById('map'), {
        center: losAngeles,
        zoom: 11,
        mapTypeId: 'roadmap',
    });
    infoWindow = new google.maps.InfoWindow();
    showStoresMarkers();
}

function displayStores(){
    var storesHtml = '';
    for(var [index, store] of stores.entries()){
        var address = store['addressLines'];
        var phone = store['phoneNumber'];
        storesHtml += `
            <div class="store-container">
            <div class="store-address">
                <span>${address[0]}</span> <br>
                <span>${address[1]}</span> <i class="fa fa-store"></i>
            </div>
            <div class="store-phone-number">${phone}</div>
          
        </div>
        `
        document.querySelector('.stores-list').innerHTML = storesHtml;
    }
}


function showStoresMarkers(){
    var bounds = new google.maps.LatLngBounds();
    for(var [index, store] of stores.entries()){
        var latlng = new google.maps.LatLng(
            store["coordinates"]["latitude"],
            store["coordinates"]["longitude"]);
        var name = store["name"];
        var address = store["addressLines"][0];
        var closingTime = store["openStatusText"];
        var phoneNumber = store["phoneNumber"];

        bounds.extend(latlng);
        createMarker(latlng, name, address, index+1, closingTime, phoneNumber)
    }
    map.fitBounds(bounds);
}



function createMarker(latlng, name, address, index, closingTime){    
    // var html =  name + '<br>' + closingTime + '<br>' +'<hr>' + '<br>' + '<span><i class="fa fa-location-circle"></i> <span>' ;
    var html = `
        <span class="marker-info-header">${name}</span><br> 
        <span>${closingTime}</span>
        <hr>
        <span class="marker-location"> <i class="fa fa-location-arrow"></i> ${address}<span> <br>
        <span class="marker-location"> <i class="fa fa-phone-alt"></i><span>        
    `
    var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      label: index.toString()
    });
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(html);
      infoWindow.open(map, marker);
    });
    markers.push(marker);
}




