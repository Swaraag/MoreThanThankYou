

document.addEventListener('DOMContentLoaded', function () {

  fetch('/getStories')
  .then(response => response.json())
  .then(data => {
    var markerList = []
    // Populate user list
    data.forEach(user => {

      function mapCreation() {

        markerList.push({coordLat: user.locationLat, coordLon: user.locationLon, title: user.actionName, desc: user.actionDesc, email: user.email, recEmail: user.recEmail})
      mapboxgl.accessToken =
        'pk.eyJ1Ijoic3dhcmFhZyIsImEiOiJjbGFpZ3JjMjMwMmRqM25wODhodHFjaXFqIn0.NhBGd2XWeKqYramdC8y8yQ';
      // title: [coordLon, coordLat, desc]

      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-120.7401, 47.3],
        zoom: 6.5,
      });
      
      for (var i = 0; i < markerList.length; i++) {
        const el = document.createElement('div');
        el.className = 'marker';

        new mapboxgl.Marker(el)
          .setLngLat([markerList[i].coordLon, markerList[i].coordLat])
          .setPopup(
            new mapboxgl.Popup({ className: "popup" }) // add popups
              .setHTML(
                `<h1>${markerList[i].title}</h1><p>${markerList[i].desc}</p><h4>Done by ${markerList[i].email} to ${markerList[i].recEmail}</h4>`
              )
          )
          .addTo(map);
      }

        const checkbox = document.getElementById('menu');
        const content = document.getElementById('map');
      
        checkbox.addEventListener('change', function () {
            if (checkbox.checked) {
                content.classList.remove('refocus');
                content.classList.add('unfocus');
                map.boxZoom.disable();
                map.scrollZoom.disable();
                map.dragPan.disable();
                map.dragRotate.disable();
                map.keyboard.disable();
                map.doubleClickZoom.disable();
                map.touchZoomRotate.disable();
                map.getCanvas().style.cursor = 'default';
            } else {
                content.classList.remove('unfocus');
                content.classList.add('refocus');
                map.setInteractive = true;
                map.boxZoom.enable();
                map.scrollZoom.enable();
                map.dragPan.enable();
                map.dragRotate.enable();
                map.keyboard.enable();
                map.doubleClickZoom.enable();
                map.touchZoomRotate.enable();
                map.getCanvas().style.cursor = 'grab';
            }
        });
      }
      mapCreation()
  
    });
  })
      .catch(error => console.error('Error:', error));
});
