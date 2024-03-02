// one minute vide of design rich story of what more than thank you (ramya is the primary)
// design for the website (ramya is primary)
// finalize the tech stack (I am primary)
// content for the design pages (no current primary on that) (Aditri is the primary)
// signup form, login form, forgot password, enter stories are the 4 forms
// database to maintain user information
// maintains stories that is linked to the users (one-to-many connection I think)
// validation to check whether the story has been validated by one or zero or both parties

mapboxgl.accessToken =
  'pk.eyJ1Ijoic3dhcmFhZyIsImEiOiJjbGFpZ3JjMjMwMmRqM25wODhodHFjaXFqIn0.NhBGd2XWeKqYramdC8y8yQ';
// title: [coordLon, coordLat, desc]
var dict = {};
var markerList = [
  {
    coordLat: 47.6163,
    coordLon: -122.0356,
    title: 'User 1',
    desc: 'Helped User 2 with making lunch.',
  },
  {
    coordLat: 47.655548,
    coordLon: -122.3032,
    title: 'User 2',
    desc: 'Helped User 3 with an assignment deliverable.',
  },
];
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
          `<h1>${markerList[i].title}</h1><p>${markerList[i].desc}</p>`
        )
    )
    .addTo(map);
}

function createPopUp(currentFeature) {
    const popUps = document.getElementsByClassName('mapboxgl-popup');
    /** Check if there is already a popup on the map and if so, remove it */
    if (popUps[0]) popUps[0].remove();
  
    const popup = new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat(currentFeature.geometry.coordinates)
      .setHTML(`<h3>Sweetgreen</h3><h4>${currentFeature.properties.address}</h4>`)
      .addTo(map);
  }