# Certificate Template Design Guide

## Recommended Dimensions

### Primary Template Size
- **Aspect Ratio**: 16:9 (landscape)
- **Recommended Resolution**: 
  - **Minimum**: 1920 x 1080 pixels (Full HD)
  - **Optimal**: 3840 x 2160 pixels (4K) for best quality when exported as PDF/PNG
  - **Maximum**: 5120 x 2880 pixels (5K) - larger files may slow down rendering

### PDF Export Dimensions
- The system exports to **A4 Landscape** format
- A4 Landscape = **11.69" x 8.27"** (842pt x 595pt)
- Your template will be scaled to fit this size while maintaining aspect ratio

---

## Design Safe Zones

### 1. Recipient Name Area (CRITICAL)
The recipient's name is **automatically overlaid** on your template. By default, it's centered:

- **Default Position**: Center of the certificate (50% from left, 50% from top)
- **Text Size**: Large (responsive: ~2xl on mobile, ~5xl on desktop)
- **Font Weight**: Black/Bold
- **Color**: 
  - **DevFest theme**: White with dark drop shadow
  - **I/O Extended theme**: Dark slate with light drop shadow

**Design Tips:**
- Leave a **clear area in the center** of your design (approximately 40-60% of the width, 20-30% of the height)
- Avoid placing decorative elements, logos, or text in the center where the name will appear
- Use a contrasting background or subtle pattern behind where the name will sit
- The name text is large and bold, so ensure your background provides good contrast

**Custom Positioning (Advanced):**
If you need the name in a different location, you can specify custom coordinates in the admin panel:
- `xPercent`: Horizontal position (0-100, where 50 = center)
- `yPercent`: Vertical position (0-100, where 50 = center)

---

### 2. Event Name Display
The system displays the event name at:
- **Position**: Bottom-left corner
- **Approximate Pixel Position** (on 1920x1080 template):
  - Left: ~48px (3rem)
  - Bottom: ~40px (2.5rem)
- **Style**: Small uppercase text, white/light color with transparency

**Design Tips:**
- Avoid placing important design elements in the bottom-left corner
- The event name is small, so it won't interfere much, but keep that area relatively clean

---

### 3. Certificate ID Badge
The unique certificate ID appears at:
- **Position**: Bottom-right corner
- **Approximate Pixel Position** (on 1920x1080 template):
  - Right: ~48px (3rem)
  - Bottom: ~32px (2rem)
- **Style**: Small monospace font in a rounded badge with semi-transparent background

**Design Tips:**
- Keep the bottom-right corner clear of important design elements
- The badge has a dark background, so it will be visible on most designs

---

## Recommended Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│                    [Your Header/Logo]                    │
│                                                           │
│                                                           │
│              [CLEAR AREA FOR RECIPIENT NAME]             │
│              (Center 40-60% width, 20-30% height)        │
│                                                           │
│                                                           │
│                                                           │
│                                                           │
│  [Event Name]                              [Cert ID]     │
│  (bottom-left)                            (bottom-right) │
└─────────────────────────────────────────────────────────┘
```

---

## Color & Theme Guidelines

### DevFest Theme (Dark Mode)
- **Name Color**: White (#FFFFFF)
- **Background**: Typically dark backgrounds work best
- **Drop Shadow**: Dark shadow for text visibility

### I/O Extended Theme (Light Mode)
- **Name Color**: Dark slate (#0F172A)
- **Background**: Typically light backgrounds work best
- **Drop Shadow**: Light shadow for text visibility

---

## File Format Requirements

- **Format**: PNG (with transparency support recommended)
- **Color Mode**: RGB
- **Transparency**: Optional (alpha channel supported)
- **File Size**: Keep under 10MB for faster loading

---

## Design Checklist

Before uploading your certificate template:

- [ ] Template is 16:9 aspect ratio (e.g., 1920x1080, 3840x2160)
- [ ] Center area (40-60% width, 20-30% height) is clear for recipient name
- [ ] Bottom-left corner is clear for event name display
- [ ] Bottom-right corner is clear for certificate ID badge
- [ ] Background provides good contrast for the name text (white for dark themes, dark for light themes)
- [ ] File is PNG format
- [ ] File size is reasonable (<10MB)
- [ ] Template looks good at both high resolution (for PDF) and web resolution (for preview)

---

## Example Safe Zone Measurements

For a **1920 x 1080 pixel** template:

- **Name Safe Zone**: 
  - Left: 384px (20% from left)
  - Right: 1536px (80% from left)
  - Top: 216px (20% from top)
  - Bottom: 648px (60% from top)
  - **Total Safe Area**: 1152px wide × 432px tall

- **Bottom-Left Avoid Zone** (for event name):
  - Left: 0-200px
  - Bottom: 0-100px

- **Bottom-Right Avoid Zone** (for cert ID):
  - Right: 0-200px
  - Bottom: 0-80px

---

## Testing Your Template

1. Upload your template in the admin panel
2. Use the "Design Playground" (Certificate Generator) to preview how names will look
3. Test with different name lengths (short names like "John Doe" and long names like "Alyssa Melody Paglumotan")
4. Download a test PDF/PNG to verify the final output quality
5. Adjust your template if the name overlaps with important design elements

---

## Pro Tips

1. **Use a subtle pattern or gradient** in the center area to make the name stand out
2. **Add decorative borders or frames** around the edges, but keep the center clear
3. **Consider using a semi-transparent overlay** in the name area to ensure text readability
4. **Test with actual attendee names** from your CSV to see how they render
5. **Keep branding elements** (logos, event graphics) in the corners or header/footer areas
6. **Use high-resolution images** for any background graphics to ensure crisp PDF exports

