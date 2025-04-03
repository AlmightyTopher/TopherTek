# TopherTek Website

Personal website and service dashboard hosted on Cloudflare Pages.

## Project Structure

```
/
├── index.html              # Main homepage
├── style.css              # Main stylesheet
├── script.js              # Main JavaScript
├── wrangler.toml          # Cloudflare Pages configuration
├── .gitignore            # Git ignore rules
├── README.md             # This file
└── links/                # Additional pages
    ├── about/
    ├── skills/
    ├── services/
    ├── blogs/
    ├── contact-us/
    └── tophtertek/       # Dashboard
        ├── Dash.html
        ├── style.css
        └── script.js
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

### Configuration Files

- `wrangler.toml`: Cloudflare Pages configuration
  - Security headers
  - Redirects
  - Build settings

- `.gitignore`: Git ignore rules
  - Excludes unnecessary files
  - Prevents sensitive data from being committed

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