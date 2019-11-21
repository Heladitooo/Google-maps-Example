function paintRoute(directionsService, directionsRenderer,geocoder, resultsMap)//PINTA EL MAPA
{
    var init = document.getElementById('init').value;//.value es el valor
    var end = document.getElementById('end').value;

    var INIT = {
        place: 'none',
        lat: 0,
        lng: 0
    }

    var END= {
        place: 'none',
        lat: 0,
        lng: 0
    }

    function createRoute(){
        directionsService.route({ 
            //Esto crea una ruta
            origin: {lat: INIT.lat, lng: INIT.lng},//4.635562  4.6349032
            destination: {lat: END.lat, lng: END.lng},
    
            travelMode: google.maps.TravelMode['DRIVING']//modo de viaje DRIVING (auto)
    
        }, function(response, status) {
            if (status == 'OK') {
            //Segun la documentacion de la api DIRECTIONS en REDERINGDIRECTION(renderisar direcciones) cuando es OK esque encontro los 2 puntos
              directionsRenderer.setDirections(response);
            }
            else if(status == 'ZERO_RESULTS') 
            {
                alert('cero resultados :(')
            }
            else {
              window.alert('algo fallo: ' + status);
            }
        });    
    }

    function geocodeAddress(geocoder, resultsMap)
    {
        function setEnd(){
            geocoder.geocode({'address': end}, function(results, status) {
                if (status === 'OK') {
                    resultsMap.setCenter(results[0].geometry.location);
                    END.place = end;
                    END.lat = resultsMap.center.lat();
                    END.lng = resultsMap.center.lng();
                    console.log(INIT, END)
                    createRoute()
                } else {
                alert('Geocode was not successful for the following reason: ' + status);
                }
                
            });
        }

        geocoder.geocode({'address': init}, function(results, status) {
            if (status === 'OK') {
                resultsMap.setCenter(results[0].geometry.location);
                INIT.place = init;
                INIT.lat = resultsMap.center.lat();
                INIT.lng = resultsMap.center.lng();
                setEnd()
            } else {
              alert('Geocode was not successful for the following reason: ' + status);
            }
            
        });

    }
        
    geocodeAddress(geocoder, resultsMap);
}