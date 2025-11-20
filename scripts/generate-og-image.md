# Generate OG Image for Social Media

## Method 1: Screenshot the Preview Route (Recommended)

1. Visit: `https://gdg-bacolod.vercel.app/og-preview`
2. Take a screenshot at exactly **1200x630px** dimensions
3. Save as `public/og-image.png`
4. The meta tags will automatically use it once deployed

## Method 2: Use Screenshot API Service

Use a service like:
- https://www.screenshotapi.net/
- https://screenshot.rocks/
- https://htmlcsstoimage.com/

URL to screenshot: `https://gdg-bacolod.vercel.app/og-preview`

Settings:
- Width: 1200px
- Height: 630px
- Format: PNG
- Quality: High

## Method 3: Manual Screenshot

1. Open `https://gdg-bacolod.vercel.app/og-preview` in your browser
2. Use browser DevTools to set viewport to 1200x630
3. Take screenshot
4. Save as `public/og-image.png`
5. Update `index.html` meta tags to use `/og-image.png`

## After Generating the Image

Update `index.html`:
```html
<meta property="og:image" content="https://gdg-bacolod.vercel.app/og-image.png" />
<meta name="twitter:image" content="https://gdg-bacolod.vercel.app/og-image.png" />
```

Then commit and push:
```bash
git add public/og-image.png index.html
git commit -m "Add OG image for social media previews"
git push
```

