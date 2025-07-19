const map = L.map('map').setView([0, 0], 2);

        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                    attribution: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye',
                    maxZoom: 100,
                }).addTo(map);


        const trailCoords = [];
        let trailLine;

        const speedEl = document.getElementById('speed');
        const headingEl = document.getElementById('heading');
        const glitch = document.getElementById('glitchEffect');

        const lat = 12.98572;
        const lng = 80.18158;
        // Display static coords
        document.querySelector('.coords').innerText =
          `Latitude : ${lat.toFixed(5)}\nLongitude: ${lng.toFixed(5)}`;

// Simulate speed & heading
speedEl.innerText = '0.0';
headingEl.innerText = 'N';

// Place static trail marker
trailCoords.push([lat, lng]);
trailLine = L.polyline(trailCoords, {
  color: '#00ffcc',
  weight: 2,
  opacity: 0.6,
  dashArray: '4,4'
}).addTo(map);

// Center map on locked target
map.setView([lat, lng], 17, { animate: true });

// Add locked pulse marker
const pulse = L.divIcon({
  className: '',
  html: '<div class="pulse-marker"></div>',
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});
L.marker([lat, lng], { icon: pulse }).addTo(map);

// Show glitch effect once
glitch.style.display = 'block';
setTimeout(() => glitch.style.display = 'none', 300);


const bootOverlay = document.getElementById('bootOverlay');
const bootText = document.getElementById('bootText');

const hudElements = document.querySelectorAll('.hidden-hud');

const bootSteps = [
  'POWER ON...',
  'SENSORS INITIALIZING...',
  'RADAR SWEEP ONLINE...',
  'TARGETING SYSTEM READY...',
  'SATELLITE LINK STABLE...',
  'SYSTEM ONLINE'
];

let step = 0;

function showNextBootStep() {
  if (step < bootSteps.length) {
    bootText.innerText = bootSteps[step];
    step++;
    setTimeout(showNextBootStep, 800);
  } else {
    bootOverlay.style.opacity = 0;
    setTimeout(() => bootOverlay.style.display = 'none', 1000);

    // Reveal HUD one by one
    hudElements.forEach((el, i) => {
      setTimeout(() => {
        el.style.opacity = 1;
      }, i * 500);
    });
  }
}

// Start boot sequence
setTimeout(showNextBootStep, 1000);

setTimeout(() => {
  document.getElementById('bioOverlay').classList.add('active');
}, 10000); // Delay in milliseconds (e.g., 5 seconds)

