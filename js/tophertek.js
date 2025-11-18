/**
 * Main dashboard module for TopherTek
 * Coordinates service status monitoring
 */

// Refresh interval in minutes
const REFRESH_INTERVAL_MINUTES = 5;

/**
 * Initialize dashboard and start monitoring
 */
function initDashboard() {
    const services = getServicesToMonitor();

    // Set all indicators to checking
    setAllIndicatorsChecking(services);

    // Perform initial status checks with staggered delays
    services.forEach((serviceId, index) => {
        const delay = index * 100;
        setTimeout(() => {
            checkServiceStatusViaProxy(serviceId).then(processStatusResponse);
        }, delay);
    });

    // Set up periodic refresh
    setInterval(() => {
        services.forEach((serviceId, index) => {
            const delay = index * 100;
            setTimeout(() => {
                checkServiceStatusViaProxy(serviceId).then(processStatusResponse);
            }, delay);
        });
    }, REFRESH_INTERVAL_MINUTES * 60 * 1000);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initDashboard);
