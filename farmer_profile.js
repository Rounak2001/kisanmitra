// Initialize the map after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create the map centered at the farm location
    const map = L.map('farm-map').setView([19.1759, 77.3089], 16); // Coordinates for Nanded area
    
    // Add the OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Sample GeoJSON for farm boundary
    // Replace these coordinates with the actual boundary of the farm
    const farmBoundary = {
        "type": "Feature",
        "properties": {
            "name": "Farm Boundary"
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [[
                [77.3079, 19.1749],
                [77.3099, 19.1752],
                [77.3101, 19.1762],
                [77.3089, 19.1767],
                [77.3076, 19.1759],
                [77.3079, 19.1749]
            ]]
        }
    };
    
    // Add the farm boundary to the map
    L.geoJSON(farmBoundary, {
        style: {
            "color": "#3e6b4e",
            "weight": 3,
            "opacity": 0.8,
            "fillColor": "#d8e8c2",
            "fillOpacity": 0.3
        }
    }).addTo(map);
});