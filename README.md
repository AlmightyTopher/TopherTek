# TopherTek Website

A modern, responsive website for TopherTek services.

## Project Structure

```
TopherTek/
├── index.html          # Main entry point
├── style.css          # Global styles
├── script.js          # Main JavaScript
├── header.html        # Common header
├── footer.html        # Common footer
├── _headers          # Cloudflare Pages headers
├── _redirects        # Cloudflare Pages redirects
├── site.webmanifest  # PWA manifest
├── favicon.ico       # Site favicon
├── favicon.svg       # SVG favicon
├── apple-touch-icon.png  # iOS icon
├── web-app-manifest-192x192.png  # PWA icon (small)
├── web-app-manifest-512x512.png  # PWA icon (large)
└── Links/            # Service links directory
    └── TopherTek/    # Main service links
        ├── Dash.html # Dashboard
        └── ...       # Other service pages
```

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/AlmightyTopher/TopherTek.git
   cd TopherTek
   ```

2. Install dependencies (if any):
   ```bash
   npm install
   ```

3. Local development:
   - Open index.html in your browser
   - Or use a local server (e.g., `python -m http.server`)

## Deployment

This site is deployed on Cloudflare Pages. The deployment process is automated:

1. Push changes to the main branch
2. Cloudflare Pages automatically builds and deploys
3. Changes are live within minutes

## Configuration Files

The project uses the following configuration files:

- `_headers`: Defines security headers and content types for Cloudflare Pages
- `_redirects`: Handles URL routing and redirects
- `site.webmanifest`: PWA configuration
- `.gitignore`: Git ignore rules

## Development Guidelines

1. File Structure:
   - Keep all pages in the `links/` directory
   - Maintain consistent file naming
   - Use relative paths for internal links

2. Styling:
   - Main styles in `style.css`
   - Page-specific styles in their respective directories
   - Use CSS variables for consistent theming

3. JavaScript:
   - Main scripts in `script.js`
   - Page-specific scripts in their respective directories
   - Follow ES6+ standards

## Maintenance

1. Regular Updates:
   - Check service status endpoints
   - Update dependencies
   - Review security headers

2. Monitoring:
   - Check Cloudflare Analytics
   - Monitor service uptime
   - Review error logs

## Support

For issues or questions:
1. Check the troubleshooting guide
2. Review recent commits
3. Contact the maintainer

## License

[Your License Here] 