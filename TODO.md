# TopherTek Website TODO List

## Website Tasks

- [x] Fix file paths to work with Cloudflare hosting
- [x] Update all service links to use HTTPS
- [x] Separate CSS into component-specific files
- [x] Implement proper caching headers
- [x] Document deployment process
- [x] Set up Cloudflare Pages deployment
- [x] Configure proper file paths for Cloudflare
- [x] Add security headers
- [x] Add service categories and filtering
- [x] Implement service status caching
- [x] Add search functionality for services
- [x] Improve mobile responsiveness
- [x] Add keyboard navigation support
- [x] Add service descriptions in tooltips
- [x] Implement dark mode
- [x] Add service usage statistics
- [x] Create service documentation section
- [x] Add user feedback system
- [x] Implement proper error boundaries
- [x] Add proper logging system
- [x] Optimize JavaScript bundle size
- [ ] Implement proper error handling for service status checks
- [ ] Add loading states for service status indicators
- [ ] Optimize image loading and caching
- [ ] Create setup guide for local development
- [ ] Document service integration process
- [ ] Create maintenance guide
- [ ] Create troubleshooting guide
- [ ] Add user authentication system
- [ ] Implement service monitoring dashboard
- [ ] Add service health alerts
- [ ] Create service backup system
- [ ] Implement service analytics
- [ ] Set up custom domain
- [ ] Configure Cloudflare caching rules
- [ ] Set up Cloudflare Workers for service status checks
- [ ] Implement CDN caching for static assets
- [ ] Set up automated deployment pipeline

## Discord Bot Integration Tasks

1. Set Up the Discord Bot
   - Create a new Discord bot in the Discord Developer Portal.
   - Generate a bot token and invite the bot to your server.
   - Install necessary libraries for Discord bot integration (e.g., discord.py or discord.js).
   - Create basic bot logic to receive commands and send responses.

2. Integrate Discord Bot with n8n
   - Install n8n on your server if not already installed.
   - Set up a webhook in n8n to receive messages from the Discord bot.
   - Configure the bot to send user requests to the n8n webhook.

3. Set Up n8n Workflow for Book Verification
   - Create a new workflow in n8n triggered by the Discord bot webhook.
   - Use the AI (Ollama) to search for the requested book using the provided title, author, or description.
   - Fetch book details (including cover image) from a reliable source like OpenLibrary API.
   - Send the results back to the Discord bot for user confirmation.

4. Implement User Confirmation Flow
   - Handle user responses in the Discord bot to either confirm or reject the book suggestion.
   - If confirmed, proceed to the next step; if rejected, continue searching until the correct book is found.

5. Automate Downloading from MyAnonamouse
   - Set up headless browsing using Playwright or Puppeteer to log into MyAnonamouse.
   - Automate search and download of the confirmed book.
   - Monitor the download folder and ensure the file is fully downloaded.

6. Conversion and Import to Audiobookshelf
   - Use the existing conversion script to convert the downloaded audio into .m4b format if needed.
   - Move the converted file to the appropriate folder for Readarr to pick up.
   - Trigger a Readarr scan to ensure the book is recognized and added to the library.
   - Ensure Audiobookshelf updates its library so the book is ready to play.

7. Notification to Requester
   - Set up a notification flow in n8n to message the user on Discord once the book is available.
   - Include the book title and a confirmation message so they know it's ready to go.
