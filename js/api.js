/**
 * API module for service status monitoring
 * Uses Cloudflare Worker proxy to keep API keys secure
 */

// Proxy endpoint - update this to your deployed Cloudflare Worker URL
const API_PROXY_URL = '/api/service-status';

// Services to monitor
const servicesToMonitor = [
    'audiobookshelf',
    'homarr',
    'wizarr',
    'jellyfin',
    'jellyseerr',
    'radarr',
    'audiobookrequest',
    'autobrr',
    'dozzle',
    'portainer',
    'qbittorrent',
    'readarr',
    'sonarr',
    'prowlarr',
    'sabnzbd'
];

/**
 * Check the status of a single service via proxy
 * @param {string} serviceId - The service identifier
 * @returns {Promise<Object>} - Status response
 */
async function checkServiceStatusViaProxy(serviceId) {
    try {
        const response = await fetch(`${API_PROXY_URL}?service=${serviceId}`);

        if (!response.ok) {
            return {
                service: serviceId,
                status: 'error',
                error: `HTTP ${response.status}`
            };
        }

        return await response.json();
    } catch (error) {
        return {
            service: serviceId,
            status: 'error-network',
            error: 'Network error'
        };
    }
}

/**
 * Check status of all services
 * @returns {Promise<Array>} - Array of status responses
 */
async function checkAllServicesStatus() {
    const results = await Promise.all(
        servicesToMonitor.map(serviceId => checkServiceStatusViaProxy(serviceId))
    );
    return results;
}

/**
 * Get list of services to monitor
 * @returns {Array<string>}
 */
function getServicesToMonitor() {
    return [...servicesToMonitor];
}
