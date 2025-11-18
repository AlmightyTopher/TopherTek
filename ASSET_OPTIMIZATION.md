# Asset Optimization Guide

This document describes the assets that need optimization for better performance.

## Critical Assets to Optimize

### 1. favicon.svg (4.0MB)
**Issue:** Extremely large for an SVG icon file
**Recommended Action:**
- Optimize using SVGO or similar tool
- Target size: < 50KB
- Command: `npx svgo favicon.svg -o favicon.svg`

### 2. your-gif.gif (11MB)
**Issue:** Very large GIF file causing slow page loads
**Recommended Actions:**
- Convert to WebP format for better compression
- Target size: < 1MB
- Commands:
  ```bash
  # Using ffmpeg
  ffmpeg -i your-gif.gif -c:v libwebp -lossless 0 -q:v 75 -loop 0 your-gif.webp

  # Or using gif2webp
  gif2webp -q 80 your-gif.gif -o your-gif.webp
  ```
- Update index.html to use WebP with GIF fallback:
  ```html
  <picture>
    <source srcset="your-gif.webp" type="image/webp">
    <img src="your-gif.gif" alt="TopherTek">
  </picture>
  ```

### 3. Twitch.gif (31KB)
**Issue:** Small file, but WebP would be more efficient
**Recommended Action:**
- Convert to WebP format
- Target size: < 20KB
- Command: `gif2webp -q 80 Twitch.gif -o Twitch.webp`

## Secondary Optimizations

### PNG Files
- web-app-manifest-512x512.png (465KB) - Consider compressing to < 200KB
- apple-touch-icon.png (76KB) - Acceptable size
- web-app-manifest-192x192.png (85KB) - Acceptable size
- favicon-96x96.png (25KB) - Acceptable size

Commands for PNG optimization:
```bash
# Using pngquant
pngquant --quality=65-80 --ext .png --force web-app-manifest-512x512.png

# Using optipng
optipng -o7 web-app-manifest-512x512.png
```

## Tools Required

Install these tools for asset optimization:

```bash
# On Ubuntu/Debian
sudo apt install webp optipng pngquant ffmpeg

# On macOS
brew install webp optipng pngquant ffmpeg

# Using npm
npm install -g svgo
```

## After Optimization

Once assets are optimized:
1. Update HTML references to use WebP with fallbacks
2. Test on multiple browsers for compatibility
3. Verify Cloudflare cache headers are working correctly
4. Consider lazy loading for below-the-fold images
