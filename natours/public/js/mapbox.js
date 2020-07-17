/* eslint-disable */

console.log('Hello from the client side');

const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoiamVkaXNhbW0iLCJhIjoiY2tjcGJwOGQwMDdhczJ6bGd5OTJxbHgyeSJ9.ZSetwKCQH1U9nnQAAMnjdA';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/jedisamm/ckcpc4w9s0bjg1imufaf4hlb0',
  scrollZoom: false,
  //   center: [38.7578, 8.9806],
  //   zoom: 10,
  //   interactive: false,
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach((loc) => {
  //Create Marker
  const el = document.createElement('div');
  el.className = 'marker';

  // add Marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // add popup
  new mapboxgl.Popup({
    offset: 30,
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  // Extend the map bound to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100,
  },
});
