/**
 * UI module for dashboard interactions
 */

// Status class mappings
const STATUS_CLASSES = ['online', 'error-auth', 'error-notfound', 'error-server', 'error-network'];

/**
 * Update the visual status indicator for a service
 * @param {string} serviceId - The service identifier
 * @param {string} status - The status string
 */
function updateStatusIndicator(serviceId, status) {
    const indicatorElement = document.querySelector(`.status-indicator[data-service-id="${serviceId}"]`);
    if (!indicatorElement) return;

    // Remove any existing status classes
    indicatorElement.classList.remove(...STATUS_CLASSES);

    // Reset title
    indicatorElement.title = 'Status Unknown';

    // Add the new status class and update title
    switch (status) {
        case 'online':
            indicatorElement.classList.add('online');
            indicatorElement.title = 'Online';
            break;
        case 'error-auth':
            indicatorElement.classList.add('error-auth');
            indicatorElement.title = 'Authorization Error (Check API Key / Permissions)';
            break;
        case 'error-notfound':
            indicatorElement.classList.add('error-notfound');
            indicatorElement.title = 'Not Found Error (Check URL / API Path)';
            break;
        case 'error-server':
            indicatorElement.classList.add('error-server');
            indicatorElement.title = 'Server Error (Check Service Logs)';
            break;
        case 'error-network':
            indicatorElement.classList.add('error-network');
            indicatorElement.title = 'Network Error / CORS Issue / Unreachable';
            break;
        case 'checking':
            indicatorElement.title = 'Checking...';
            break;
        case 'skipped':
            indicatorElement.title = 'Skipped / Not Checked';
            break;
        default:
            break;
    }
}

/**
 * Set all service indicators to checking state
 * @param {Array<string>} serviceIds - Array of service identifiers
 */
function setAllIndicatorsChecking(serviceIds) {
    serviceIds.forEach(serviceId => {
        updateStatusIndicator(serviceId, 'checking');
    });
}

/**
 * Process status response and update UI
 * @param {Object} response - Status response from API
 */
function processStatusResponse(response) {
    const { service, status, statusCode } = response;

    let uiStatus = 'error-network';

    if (status === 'online') {
        uiStatus = 'online';
    } else if (statusCode === 401 || statusCode === 403) {
        uiStatus = 'error-auth';
    } else if (statusCode === 404) {
        uiStatus = 'error-notfound';
    } else if (statusCode >= 500) {
        uiStatus = 'error-server';
    }

    updateStatusIndicator(service, uiStatus);
}
