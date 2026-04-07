# Holy Family Parish Website

A static website for Holy Family Parish in East Taunton, MA.

## Project Structure

```
holy-family-parish/
├── index.html              # Homepage
├── pages/
│   ├── im-new.html        # I'm New page
│   ├── go-deeper.html     # Faith formation programs
│   ├── sacraments.html    # Sacraments information
│   ├── ministries.html    # Parish ministries
│   └── bulletins.html     # Parish bulletins
├── components/
│   └── footer.html        # Footer component (injected by build.js)
├── images/                # Image assets
├── styles.css             # Main stylesheet
├── script.js              # JavaScript functionality
└── build.js               # Build script for component injection
```

## Features

- **Responsive Design** - Works on desktop and mobile devices
- **Dropdown Navigation** - Hover dropdowns with mobile toggle support
- **Photo/Video Sections** - Support for both images and YouTube/Vimeo embeds
- **Google Calendar Integration** - Calendar displays with theme detection
- **Announcements Carousel** - Rotating announcements on homepage
- **Photo Slideshow** - Dynamic slideshow on homepage

## Development

### Prerequisites

- Node.js (for build script)

### Build

Run the build script to inject components (like the footer) into all HTML files:

**Windows:**
- Double-click `build.bat`, or
- Run `node build.js` in terminal

**Mac/Linux:**
```bash
node build.js
```

### File Conventions

- **Images**: Place in `/images/` directory
- **Styles**: Single `styles.css` file using CSS custom properties
- **Scripts**: Single `script.js` file for all pages

## Deployment

This is a static site that can be deployed to any web hosting service:

1. Run `node build.js` to ensure components are injected
2. Upload all files to your web host
3. No server-side processing required

### GitHub Pages

To deploy to GitHub Pages:

1. Push to GitHub repository
2. Go to Settings → Pages
3. Select `main` branch
4. Site will be available at `https://[username].github.io/[repo-name]`

## Adding Content

### Adding Photos to Sections

Photos can be displayed as circles (default) or rectangles:

**Circle photo:**
```html
<div class="section-media">
    <img src="../images/photo.jpg" alt="Description">
</div>
```

**Rectangle photo:**
```html
<div class="section-media rectangular">
    <img src="../images/photo.jpg" alt="Description">
</div>
```

### Adding Videos

Replace the `section-media` div with `section-video`:

```html
<div class="section-video">
    <iframe src="https://www.youtube.com/embed/VIDEO_ID" allowfullscreen></iframe>
</div>
```

For Vimeo:
```html
<div class="section-video">
    <iframe src="https://player.vimeo.com/video/VIDEO_ID" allowfullscreen></iframe>
</div>
```

### Updating Navigation Dropdowns

Navigation is defined in each HTML file. To update dropdowns, modify the `nav-links` ul in:
- `index.html`
- `pages/im-new.html`
- `pages/go-deeper.html`
- `pages/sacraments.html`
- `pages/ministries.html`
- `pages/bulletins.html`

### Updating Footer

Edit `components/footer.html` and run `node build.js` to propagate changes to all pages.

## Styles

The site uses CSS custom properties (variables) for theming:

```css
--color-primary: #1a472a;      /* Primary green */
--color-primary-dark: #0f2d1a;  /* Darker green */
--color-secondary: #c9a227;    /* Gold accent */
--color-text: #2d3748;         /* Main text color */
--color-bg: #ffffff;           /* Background */
--color-bg-alt: #f7f7f7;       /* Alternate background */
```

## License

&copy; 2026 Holy Family Parish. All rights reserved.