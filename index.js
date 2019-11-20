
function paintRoute(directionsService, directionsRenderer)//PINTA EL MAPA
{
    var init = document.getElementById('init').value;//.value es el valor
    var end = document.getElementById('end').value;

    directionsService.route({ 
        //Esto crea una ruta
        origin: {lat: parseFloat(init), lng: -74.1563424},//4.635562  4.6349032
        destination: {lat: parseFloat(end), lng: -74.1576999},

        travelMode: google.maps.TravelMode['DRIVING']//modo de viaje DRIVING (auto)

    }, function(response, status) {
        if (status == 'OK') {
        //Segun la documentacion de la api DIRECTIONS en REDERINGDIRECTION(renderisar direcciones) cuando es OK esque encontro los 2 puntos
          directionsRenderer.setDirections(response);//DIBUJALO!
        }
        else if(status == 'ZERO_RESULTS') 
        {
            alert('Revisa que la coordenadas esten bien escritas')
        }
        else {
          window.alert('Directions request failed due to ' + status);
        }
    });
}

function initMap() {
    
    var directionsService = new google.maps.DirectionsService;//pide estas 2 cosas
    var directionsRenderer = new google.maps.DirectionsRenderer;
    var mapOptions = {
      zoom:8,
      center: {lat: 4.6486259, lng: -74.2478956}
    }
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);//genera un mapa
    directionsRenderer.setMap(map);//renderizalo!

    document.getElementById('letsGo').addEventListener('click', () => {//cuando le des click pinta el nuevo mapa
        paintRoute(directionsService, directionsRenderer);
        console.log('ok?')
    })
  }
  
