/**
 * Cloudflare Worker Proxy for Service Status Checks
 *
 * This worker proxies API requests to internal services, keeping API keys secure
 * on the server side. Deploy this as a Cloudflare Worker and configure environment
 * variables in the Cloudflare dashboard.
 *
 * Required Environment Variables (set in Cloudflare Dashboard):
 * - AUDIOBOOKSHELF_API_KEY
 * - JELLYFIN_API_KEY
 * - JELLYSEERR_API_KEY
 * - RADARR_API_KEY
 * - READARR_API_KEY
 * - SONARR_API_KEY
 * - PROWLARR_API_KEY
 * - SABNZBD_API_KEY
 */

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const serviceId = url.searchParams.get('service');

        if (!serviceId) {
            return new Response(JSON.stringify({ error: 'Missing service parameter' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }

        const serviceConfig = getServiceConfig(serviceId, env);

        if (!serviceConfig) {
            return new Response(JSON.stringify({ error: 'Unknown service' }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }

        try {
            const fetchOptions = {
                method: 'GET',
                headers: {}
            };

            if (serviceConfig.apiKey) {
                if (serviceConfig.headerType === 'Bearer') {
                    fetchOptions.headers['Authorization'] = `Bearer ${serviceConfig.apiKey}`;
                } else {
                    fetchOptions.headers['X-Api-Key'] = serviceConfig.apiKey;
                }
            }

            const response = await fetch(serviceConfig.apiUrl, fetchOptions);

            return new Response(JSON.stringify({
                status: response.ok ? 'online' : 'error',
                statusCode: response.status,
                service: serviceId
            }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Cache-Control': 'no-cache'
                }
            });

        } catch (error) {
            return new Response(JSON.stringify({
                status: 'error',
                error: 'Network error',
                service: serviceId
            }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }
    }
};

function getServiceConfig(serviceId, env) {
    const services = {
        'audiobookshelf': {
            apiUrl: 'https://audiobookshelf.tophertek.com/ping',
            apiKey: env.AUDIOBOOKSHELF_API_KEY || '<SECRET_GOES_HERE>',
            headerType: 'Bearer'
        },
        'homarr': {
            apiUrl: 'https://homarr.tophertek.com/api/health',
            apiKey: null
        },
        'wizarr': {
            apiUrl: 'https://authme.tophertek.com/healthz',
            apiKey: null
        },
        'jellyfin': {
            apiUrl: 'https://jellyfin.tophertek.com/System/Ping',
            apiKey: env.JELLYFIN_API_KEY || '<SECRET_GOES_HERE>'
        },
        'jellyseerr': {
            apiUrl: 'https://jellyseerr.tophertek.com/api/v1/status',
            apiKey: env.JELLYSEERR_API_KEY || '<SECRET_GOES_HERE>'
        },
        'radarr': {
            apiUrl: 'https://radarr.tophertek.com/api/v3/system/status',
            apiKey: env.RADARR_API_KEY || '<SECRET_GOES_HERE>'
        },
        'audiobookrequest': {
            apiUrl: 'https://audiobookrequest.tophertek.com/health',
            apiKey: null
        },
        'autobrr': {
            apiUrl: 'https://autobrr.tophertek.com/api/health',
            apiKey: null
        },
        'dozzle': {
            apiUrl: 'https://dozzle.tophertek.com/healthz',
            apiKey: null
        },
        'portainer': {
            apiUrl: 'https://portainernas.tophertek.com/api/status/ping',
            apiKey: null
        },
        'qbittorrent': {
            apiUrl: 'https://qbittorrent.tophertek.com/api/v2/app/version',
            apiKey: null
        },
        'readarr': {
            apiUrl: 'https://readarr.tophertek.com/api/v1/system/status',
            apiKey: env.READARR_API_KEY || '<SECRET_GOES_HERE>'
        },
        'sonarr': {
            apiUrl: 'https://sonarr.tophertek.com/api/v3/system/status',
            apiKey: env.SONARR_API_KEY || '<SECRET_GOES_HERE>'
        },
        'prowlarr': {
            apiUrl: 'https://prowlarr.tophertek.com/api/v1/system/status',
            apiKey: env.PROWLARR_API_KEY || '<SECRET_GOES_HERE>'
        },
        'sabnzbd': {
            apiUrl: `https://sabnzbd.tophertek.com/sabnzbd/api?mode=server_stats&output=json&apikey=${env.SABNZBD_API_KEY || '<SECRET_GOES_HERE>'}`,
            apiKey: null
        }
    };

    return services[serviceId] || null;
}
