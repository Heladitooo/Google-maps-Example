var marker = 0;
var trueMarker = false;
function paintRoute(directionsService, directionsRenderer,geocoder, resultsMap)//PINTA EL MAPA
{
    var text = document.getElementById('information')

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

   
    var CONDUCTOR = {
        lat: 0,
        lng: 0,
        show: false
    }
    
    function calculateTime()
        {
            var service = new google.maps.DistanceMatrixService;
            service.getDistanceMatrix({
              origins: [INIT],
              destinations: [END],
              travelMode: 'DRIVING',
              unitSystem: google.maps.UnitSystem.METRIC,
              avoidHighways: false,
              avoidTolls: false
            },function(response, status) {
                if (status == 'OK') {
                  var origins = response.originAddresses;
                  var destinations = response.destinationAddresses;
                  for (var i = 0; i < origins.length; i++) {
                    var results = response.rows[i].elements;
                    for (var j = 0; j < results.length; j++) {
                      var element = results[j];
                      var distance = element.distance.text;
                      var duration = element.duration.text;
                      var from = origins[i];
                      var to = destinations[j];
                    }
                  }
                 
                  CONDUCTOR.lat = random(INIT.lat, END.lat);
                  CONDUCTOR.lng = random(INIT.lng, END.lng);
                  
                function addRemoveMarker(lat,lng)
                {
                    console.log(marker)
                    if(trueMarker == false)
                    {
                        marker = new google.maps.Marker({
                            position: {lat: lat, lng: lng},
                            map: resultsMap,
                          title: 'Conductor!',
                          icon: {
                            url: "http://rpmexperience.ca/wp-content/uploads/2015/01/unnamed-80x80.png"
                          }
                        })
                        trueMarker=true
                    }else{
                        marker.setMap(null);
                        marker = new google.maps.Marker({
                            position: {lat: lat, lng: lng},
                            map: resultsMap,
                          title: 'Conductor!',
                          icon: {
                            url: "http://rpmexperience.ca/wp-content/uploads/2015/01/unnamed-80x80.png"
                          }
                        })
                    }
                   

                }
                
                addRemoveMarker(CONDUCTOR.lat,CONDUCTOR.lng)

                
                  text.style.color = "black";
                randomUser()
                  text.innerHTML = `${element.distance.text}<br/>   ${element.duration.text} <br/>$${addCommas(element.distance.value /1.000 * 1.000)} COP`;
                }
              })
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
              calculateTime()
            }
            else {
                text.style.color = "red";
                text.innerHTML = 'algo fallo: ' + status
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
                } else if(status == 'ZERO_RESULTS') 
                {
                    text.style.color = "red";
                    text.innerHTML = "tu destino no existe :("
                }else {
                    text.style.color = "red";
                    text.innerHTML = 'algo fallo: ' + status
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
            } else if(status == 'ZERO_RESULTS') 
            {
                text.style.color = "red";
                text.innerHTML = "punto de inicio no existe :("
            }
            else {
                text.style.color = "red";
                text.innerHTML = 'algo fallo: ' + status
            }
            
        });

        
    }
        
    geocodeAddress(geocoder, resultsMap);
}