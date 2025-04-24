// Initialize the charts after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // WhatsApp Chart - Vertical left
    const whatsappCtx = document.getElementById('whatsappChart').getContext('2d');
    const whatsappChart = new Chart(whatsappCtx, {
        type: 'doughnut',
        data: {
            labels: ['Replied', 'Read'],
            datasets: [{
                data: [30, 70],
                backgroundColor: [
                    '#00c853',  // Green for replied
                    '#ffeb3b'   // Yellow for read
                ],
                borderWidth: 0,
                cutout: '70%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            },
            rotation: -90,
            circumference: 180, // Semi-circle
        }
    });
    
    // Calls Chart - Horizontal top right
    const callsCtx = document.getElementById('callsChart').getContext('2d');
    const callsChart = new Chart(callsCtx, {
        type: 'doughnut',
        data: {
            labels: ['Picked up', 'Missed'],
            datasets: [{
                data: [64, 36],
                backgroundColor: [
                    '#ffeb3b',  // Yellow for picked up
                    '#e0e0e0'   // Grey for missed
                ],
                borderWidth: 0,
                cutout: '75%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            }
        }
    });
    
    // Revenue Chart - Horizontal bottom right
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    const revenueChart = new Chart(revenueCtx, {
        type: 'doughnut',
        data: {
            labels: ['Inputs', 'Forward Link'],
            datasets: [{
                data: [30, 70],
                backgroundColor: [
                    '#2196f3',  // Blue for inputs
                    '#e0e0e0'   // Grey for forward link
                ],
                borderWidth: 0,
                cutout: '75%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            }
        }
    });
});