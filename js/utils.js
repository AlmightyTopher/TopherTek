/**
 * Utility functions for TopherTek website
 */

/**
 * Load external HTML content into an element
 * @param {string} url - URL to fetch HTML from
 * @param {string} elementId - ID of element to inject HTML into
 */
function loadHTML(url, elementId) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} while fetching ${url}`);
            }
            return response.text();
        })
        .then(data => {
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = data;
                if (elementId === 'header') {
                    setTimeout(() => {
                        try {
                            if (typeof disableCurrentPageLink === 'function') {
                                disableCurrentPageLink();
                            }
                        } catch (e) {
                            // Header script error - silent fail
                        }
                    }, 0);
                }
            }
        })
        .catch(error => {
            // Network error loading component
        });
}

/**
 * Initialize header and footer loading
 */
function initPageComponents() {
    loadHTML('/header.html', 'header');
    loadHTML('/footer.html', 'footer');
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initPageComponents);
