document.addEventListener('DOMContentLoaded', () => {
    console.log('Dashboard loaded. Initializing ACCURATE status checks (Requires CORS config).');

    // --- API Integration Section ---
    // Uses specific API endpoints. API Keys are required and used.
    // !!! THIS WILL FAIL with CORS errors if server/proxy CORS headers are not configured correctly !!!
    const servicesToMonitor = [
        {
            id: 'audiobookshelf',
            // Using /ping - Unsure if it requires auth or reflects true status accurately without CORS
            apiUrl: 'https://audiobookshelf.tophertek.com/ping',
            apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyM2VlYjU1YS1jYjkwLTRkZjMtYTgwZS02MzhkNDNhZTFmYzUiLCJ1c2VybmFtZSI6IlRvcGhlckd1dGJyb2QiLCJpYXQiOjE3MDY4NTExOTd9.4IUtNHPTQdtMWNAjiQR5KIuA48EnfxoCNbC9LtKYo5M',
            headerType: 'Bearer'
        },
        {
            id: 'homarr',
            // Assuming Homarr has a basic health/ping endpoint, adjust if needed
            // If no simple ping, remove API check or use authenticated endpoint if known
            apiUrl: 'https://homarr.tophertek.com/api/health', // Guessing endpoint, CHECK HOMARR DOCS
            apiKey: null
        },
        {
            id: 'wizarr',
             // Assuming Wizarr has a health endpoint, adjust if needed
            apiUrl: 'https://authme.tophertek.com/healthz', // Guessing endpoint, CHECK WIZARR DOCS
            apiKey: null
        },
        {
            id: 'jellyfin',
            apiUrl: 'https://jellyfin.tophertek.com/System/Ping', // Ping doesn't need key
            apiKey: 'e93e79b005b841e3bb71a3d098d26664' // Key stored if needed for other checks
        },
        {
            id: 'jellyseerr',
            apiUrl: 'https://jellyseerr.tophertek.com/api/v1/status', // Specific status endpoint
            apiKey: 'MTc0Mjc5NTkzMTE1NDkwOTIxODc0LTlhNTItNDNhZS1iNTQwLTY3MDY1YjhlOTVkYQ=='
        },
        {
            id: 'radarr',
            apiUrl: 'https://radarr.tophertek.com/api/v3/system/status', // Specific status endpoint
            apiKey: '1ef4af30658c4e48867c638d686e70fa'
        },
         {
            id: 'audiobookrequest',
            // Check if AudiobookRequest has a ping/health endpoint
            apiUrl: 'https://audiobookrequest.tophertek.com/health', // Guessing endpoint, CHECK DOCS
            apiKey: null
        },
        {
            id: 'autobrr',
            // Check if Autobrr has a ping/health endpoint
            apiUrl: 'https://autobrr.tophertek.com/api/health', // Guessing endpoint, CHECK DOCS
            apiKey: null // Might need key?
        },
         {
            id: 'dozzle',
            apiUrl: 'https://dozzle.tophertek.com/healthz', // This endpoint usually works
            apiKey: null
        },
         {
            id: 'portainer',
            // Ping requires auth usually, check Portainer API docs
            apiUrl: 'https://portainernas.tophertek.com/api/status/ping', // Requires auth?
            apiKey: null // Need Portainer API key?
        },
        {
            id: 'qbittorrent',
             // API requires login/session handling, complex for simple check
             // Simple check might just hit base URL or known non-auth endpoint if exists
            apiUrl: 'https://qbittorrent.tophertek.com/api/v2/app/version', // Requires auth
            apiKey: null
        },
         {
            id: 'readarr',
            apiUrl: 'https://readarr.tophertek.com/api/v1/system/status', // Specific status endpoint
            apiKey: '82825bd4ca264b2eafabfcb5c8be9c64'
        },
        {
            id: 'sonarr',
            apiUrl: 'https://sonarr.tophertek.com/api/v3/system/status', // Specific status endpoint
            apiKey: 'e6d61d4ae0ce4780b463c6f1eca620bc'
        },
        {
            id: 'prowlarr',
            apiUrl: 'https://prowlarr.tophertek.com/api/v1/system/status', // Specific status endpoint
            apiKey: '4f73fc56269f4ae1b61467f0f8a42ab2'
        },
        {
            id: 'sabnzbd',
            // Using full API path again. VERIFY this path is correct for your setup!
            apiUrl: `https://sabnzbd.tophertek.com/sabnzbd/api?mode=server_stats&output=json&apikey=b11f21731e2445cfaed5b92e244d0daf`,
            apiKey: null // Key is in URL
        }
    ];

    // Function to check the status of a single service
    function checkServiceStatus(service) {
        const { id, apiUrl, apiKey, headerType } = service;
        const indicatorElement = document.querySelector(`.status-indicator[data-service-id="${id}"]`);

        if (!indicatorElement) {
            console.warn(`Status indicator for service ID "${id}" not found.`);
            return;
        }

        // Set status to checking initially
        updateStatusIndicator(id, 'checking');

        // --- API Fetch Logic ---
        const fetchOptions = {
            method: 'GET',
            headers: {},
            // *** REMOVED mode: 'no-cors' *** - Requires server CORS configuration!
        };

        // Add authorization header if needed
        if (apiKey && !apiUrl.includes('apikey=')) {
            if (headerType === 'Bearer') {
                fetchOptions.headers['Authorization'] = `Bearer ${apiKey}`;
            } else {
                fetchOptions.headers['X-Api-Key'] = apiKey; // Default header
            }
        }

        fetch(apiUrl, fetchOptions)
            .then(response => {
                if (response.ok) { // Status 200-299
                    console.log(`Service ${id}: Online (Status: ${response.status})`);
                    updateStatusIndicator(id, 'online');
                } else if (response.status === 401 || response.status === 403) {
                    console.error(`Service ${id}: Authorization Error (Status: ${response.status})`);
                    updateStatusIndicator(id, 'error-auth'); // Use specific auth error status
                } else if (response.status === 404) {
                     console.error(`Service ${id}: Not Found Error (Status: ${response.status})`);
                     updateStatusIndicator(id, 'error-notfound'); // Use specific notfound error status
                } else { // Handle other non-ok statuses (like 5xx server errors)
                    console.error(`Service ${id}: Server Error (Status: ${response.status})`);
                    updateStatusIndicator(id, 'error-server');
                }
            })
            .catch(error => {
                // Network errors (DNS, connection refused, CORS error if not configured!)
                console.error(`Service ${id}: Network Error or CORS Issue`, error);
                updateStatusIndicator(id, 'error-network'); // Use specific network error status
            });
    }

    // Function to update the visual status indicator
    function updateStatusIndicator(serviceId, status) { // status is now a string
        const indicatorElement = document.querySelector(`.status-indicator[data-service-id="${serviceId}"]`);
        if (!indicatorElement) return;

        // List of possible status classes
        const statusClasses = ['online', 'error-auth', 'error-notfound', 'error-server', 'error-network'];

        // Remove any existing status classes
        indicatorElement.classList.remove(...statusClasses);
        // Reset title or set default
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
                 // Keep default grey appearance
                 break;
             case 'skipped':
                 indicatorElement.title = 'Skipped / Not Checked';
                  // Keep default grey appearance
                 break;
            default:
                 // Keep default grey appearance
                 break;
        }
    }

    // --- Initial Status Checks & Refresh Interval ---
    servicesToMonitor.forEach(service => {
       // Add placeholder/missing key check if desired, otherwise run all checks
       // Example: Skip if API key required and missing (modify as needed)
       const needsApiKey = ['jellyseerr', 'radarr', 'readarr', 'sonarr', 'prowlarr'].includes(service.id);
       if (needsApiKey && !service.apiKey) {
           console.warn(`Service ${service.id}: Missing API Key. Skipping check.`);
           updateStatusIndicator(service.id, 'skipped');
           return; // Skip this service
       }
       // Example: Skip SABnzbd if key is missing in URL
       if (service.id === 'sabnzbd' && !service.apiUrl.includes('apikey=') || (service.apiUrl.includes('apikey=') && service.apiUrl.endsWith('apikey='))) {
            console.warn(`Service ${service.id}: Missing API Key in URL. Skipping check.`);
            updateStatusIndicator(service.id, 'skipped');
            return; // Skip this service
       }


       const randomDelay = Math.random() * 500;
       setTimeout(() => checkServiceStatus(service), randomDelay);
   });

    // Set an interval to refresh statuses periodically
    const refreshIntervalMinutes = 5;
    setInterval(() => {
        console.log(`Refreshing service statuses (every ${refreshIntervalMinutes} minutes)...`);
        servicesToMonitor.forEach(service => {
            // Re-apply checks if needed
            const needsApiKey = ['jellyseerr', 'radarr', 'readarr', 'sonarr', 'prowlarr'].includes(service.id);
            if (needsApiKey && !service.apiKey) return;
            if (service.id === 'sabnzbd' && !service.apiUrl.includes('apikey=') || (service.apiUrl.includes('apikey=') && service.apiUrl.endsWith('apikey='))) return;


            const randomDelay = Math.random() * 500;
            setTimeout(() => checkServiceStatus(service), randomDelay);
        });
    }, refreshIntervalMinutes * 60 * 1000);

}); // End DOMContentLoaded