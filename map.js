document.addEventListener('DOMContentLoaded', function() {
    // Fallback map solution
    initializeFallbackMap();
    
    // Initialize the Crops Chart
    initializeCropsChart();
    
    // Setup event handlers
    setupEventHandlers();
    
    // Initialize modals
    initializeModals();
});

function initializeFallbackMap() {
    // Get the map container
    const mapContainer = document.getElementById('map');
    
    if (!mapContainer) return;
    
    // Add fallback map markers
    const markers = [
        {position: {top: '25%', left: '22%'}, count: 189, color: '#ffae00'},
        {position: {top: '35%', left: '55%'}, count: 20, color: '#ff7800'},
        {position: {top: '65%', left: '30%'}, count: 59, color: '#ff7800'},
        {position: {top: '70%', left: '60%'}, count: 50, color: '#ff7800'},
        {position: {top: '45%', left: '65%'}, count: 150, color: '#ffae00'},
        {position: {top: '50%', left: '80%'}, count: 109, color: '#ffae00'}
    ];
    
    // Create and add markers to the map
    markers.forEach(marker => {
        const markerElement = document.createElement('div');
        markerElement.className = 'map-marker';
        markerElement.style.position = 'absolute';
        markerElement.style.top = marker.position.top;
        markerElement.style.left = marker.position.left;
        markerElement.style.zIndex = '100';
        
        const markerCircle = document.createElement('div');
        markerCircle.className = 'marker-circle';
        markerCircle.style.width = '40px';
        markerCircle.style.height = '40px';
        markerCircle.style.backgroundColor = marker.color;
        markerCircle.style.color = 'white';
        markerCircle.style.fontWeight = 'bold';
        markerCircle.style.borderRadius = '50%';
        markerCircle.style.display = 'flex';
        markerCircle.style.alignItems = 'center';
        markerCircle.style.justifyContent = 'center';
        markerCircle.style.border = '2px solid white';
        markerCircle.style.boxShadow = '0 0 5px rgba(0,0,0,0.3)';
        markerCircle.textContent = marker.count;
        
        markerElement.appendChild(markerCircle);
        mapContainer.appendChild(markerElement);
    });
    
    // Handle layer buttons
    const layerButtons = document.querySelectorAll('.layer-btn');
    layerButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            layerButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // In a real implementation, this would change the map layer
            // For the fallback, we just update the UI
        });
    });
}

function initializeCropsChart() {
    const cropsChartCtx = document.getElementById('cropsChart');
    if (!cropsChartCtx) return;
    
    const ctx = cropsChartCtx.getContext('2d');
    const cropsChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Wheat', 'Paddy', 'Gram', 'Banana'],
            datasets: [{
                data: [50, 30, 15, 5],
                backgroundColor: [
                    '#007bff',  // Wheat - Blue
                    '#ffc107',  // Paddy - Yellow
                    '#20c997',  // Gram - Teal
                    '#e0e42b'   // Banana - Light yellow
                ],
                borderWidth: 0,
                hoverOffset: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            cutout: '70%',
            plugins: {
                legend: {
                    display: false,
                    position: 'right'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            let value = context.raw || 0;
                            return label + ': ' + value + '%';
                        }
                    }
                }
            }
        }
    });
}

function setupEventHandlers() {
    // Handle filter tabs
    const filterTabs = document.querySelectorAll('.filter-tab');
    const filterContents = document.querySelectorAll('.filter-content');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all content sections
            filterContents.forEach(content => {
                content.style.display = 'none';
            });
            
            // Show the selected content section
            const tabType = this.getAttribute('data-tab');
            const contentElement = document.getElementById(`${tabType}-content`);
            if (contentElement) {
                contentElement.style.display = 'block';
            }
        });
    });
    
    // Handle tool buttons
    const toolButtons = document.querySelectorAll('.tool-btn');
    toolButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Toggle active class for this button
            this.classList.toggle('active');
        });
    });
    
    // Handle Clear All and Apply buttons
    const clearAllBtn = document.querySelector('.filter-actions .btn-outline-secondary');
    const applyBtn = document.querySelector('.filter-actions .btn-success');
    
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', function() {
            // Clear all selections
            document.querySelectorAll('select').forEach(select => {
                select.selectedIndex = 0;
            });
            document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
            });
            document.querySelectorAll('input[type="date"]').forEach(date => {
                date.value = '';
            });
        });
    }
    
    if (applyBtn) {
        applyBtn.addEventListener('click', function() {
            // Here you would implement the filter logic
            console.log('Applying filters...');
            // Simulate filter applied feedback
            const filterInfo = document.querySelector('.filter-info');
            if (filterInfo) {
                filterInfo.textContent = 'Filters applied successfully!';
                setTimeout(() => {
                    filterInfo.textContent = 'Select location filters below';
                }, 2000);
            }
        });
    }
    
    // Handle AI quick action buttons
    const quickActionButtons = document.querySelectorAll('.ai-quick-actions .btn');
    const messageInput = document.querySelector('.ai-input-box input');
    
    quickActionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const actionText = this.textContent;
            if (messageInput) {
                messageInput.value = actionText;
            }
        });
    });
    
    // Handle send message button
    const sendMessageBtn = document.querySelector('.ai-input-box .btn-success');
    
    if (sendMessageBtn && messageInput) {
        sendMessageBtn.addEventListener('click', function() {
            const message = messageInput.value.trim();
            if (message) {
                // Add user message to chat
                const userMessage = document.createElement('div');
                userMessage.classList.add('user-message', 'text-end', 'mt-3');
                userMessage.innerHTML = `<p class="bg-light d-inline-block p-2 rounded">${message}</p>`;
                document.querySelector('.ai-chat-container').appendChild(userMessage);
                
                // Clear input
                messageInput.value = '';
                
                // Simulate AI response
                setTimeout(() => {
                    const aiResponse = document.createElement('div');
                    aiResponse.classList.add('ai-response', 'mt-3');
                    aiResponse.innerHTML = '<p class="bg-primary text-white d-inline-block p-2 rounded">I\'ll check that information for you.</p>';
                    document.querySelector('.ai-chat-container').appendChild(aiResponse);
                }, 1000);
            }
        });
        
        // Send message on Enter key
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessageBtn.click();
            }
        });
    }
    
    // Table pagination handling
    const paginationPrev = document.querySelector('.pagination-info .fa-chevron-left')?.parentElement;
    const paginationNext = document.querySelector('.pagination-info .fa-chevron-right')?.parentElement;
    let currentPage = 1;
    const totalPages = 3; // This would be dynamic in a real application
    
    if (paginationPrev && paginationNext) {
        paginationPrev.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                updatePaginationInfo();
            }
        });
        
        paginationNext.addEventListener('click', function() {
            if (currentPage < totalPages) {
                currentPage++;
                updatePaginationInfo();
            }
        });
    }
    
    // Handle rows per page change
    const rowsPerPageSelect = document.querySelector('.table-info select');
    if (rowsPerPageSelect) {
        rowsPerPageSelect.addEventListener('change', function() {
            currentPage = 1; // Reset to first page
            updatePaginationInfo();
        });
    }
    
    function updatePaginationInfo() {
        const rowsPerPage = document.querySelector('.table-info select')?.value || 10;
        const start = ((currentPage - 1) * rowsPerPage) + 1;
        const end = Math.min(currentPage * rowsPerPage, 13); // 13 is total items from the image
        const paginationInfo = document.querySelector('.pagination-info span');
        if (paginationInfo) {
            paginationInfo.textContent = `${start}-${end} of 13`;
        }
    }
    
    // Export and Create Whatsapp Campaign buttons
    const exportBtn = document.getElementById('exportBtn');
    const createWhatsappBtn = document.getElementById('createWhatsappBtn');
    
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            // Show export modal
            const exportModal = new bootstrap.Modal(document.getElementById('exportModal'));
            if (document.getElementById('exportModal')) {
                exportModal.show();
            } else {
                alert('Export functionality will be implemented here');
            }
        });
    }
    
    if (createWhatsappBtn) {
        createWhatsappBtn.addEventListener('click', function() {
            // Show Whatsapp campaign modal
            const whatsappModal = new bootstrap.Modal(document.getElementById('whatsappModal'));
            if (document.getElementById('whatsappModal')) {
                whatsappModal.show();
            } else {
                alert('Whatsapp campaign creation will be implemented here');
            }
        });
    }
}

function initializeModals() {
    // Create Export Modal if it doesn't exist
    if (!document.getElementById('exportModal')) {
        const exportModalHTML = `
        <div class="modal fade" id="exportModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-light">
                        <h5 class="modal-title">Export Data</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="form-label">Export Format</label>
                            <select class="form-select">
                                <option>Excel (.xlsx)</option>
                                <option>CSV (.csv)</option>
                                <option>PDF (.pdf)</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Data to Export</label>
                            <div class="form-check mb-2">
                                <input class="form-check-input" type="checkbox" id="exportFarmers" checked>
                                <label class="form-check-label" for="exportFarmers">Farmer Details</label>
                            </div>
                            <div class="form-check mb-2">
                                <input class="form-check-input" type="checkbox" id="exportCrops" checked>
                                <label class="form-check-label" for="exportCrops">Crop Information</label>
                            </div>
                            <div class="form-check mb-2">
                                <input class="form-check-input" type="checkbox" id="exportLocation">
                                <label class="form-check-label" for="exportLocation">Location Data</label>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-success">Export</button>
                    </div>
                </div>
            </div>
        </div>
        `;
        
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = exportModalHTML;
        document.body.appendChild(modalContainer);
    }
    
    // Create Whatsapp Campaign Modal if it doesn't exist
    if (!document.getElementById('whatsappModal')) {
        const whatsappModalHTML = `
        <div class="modal fade" id="whatsappModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-light">
                        <h5 class="modal-title">Create Whatsapp Campaign</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="form-label">Campaign Name</label>
                            <input type="text" class="form-control" placeholder="Enter campaign name">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Message Template</label>
                            <select class="form-select mb-3">
                                <option>Select template</option>
                                <option>Crop Advisory</option>
                                <option>Weather Alert</option>
                                <option>Market Price Update</option>
                                <option>Custom Template</option>
                            </select>
                            <textarea class="form-control" rows="4" placeholder="Hello {farmer_name}, this is a message about your {crop_type} cultivation..."></textarea>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Target Farmers</label>
                            <div class="alert alert-info">
                                <i class="fas fa-info-circle me-2"></i>
                                Current filter will target 1,965 farmers
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="sendToAllFarmers" checked>
                                <label class="form-check-label" for="sendToAllFarmers">
                                    Send to all farmers in the current filter
                                </label>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Schedule</label>
                            <div class="row">
                                <div class="col-md-6">
                                    <input type="date" class="form-control">
                                </div>
                                <div class="col-md-6">
                                    <input type="time" class="form-control">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-success">Create Campaign</button>
                    </div>
                </div>
            </div>
        </div>
        `;
        
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = whatsappModalHTML;
        document.body.appendChild(modalContainer);
    }
}