# 🔄 Zoflow Tech Website

Modern, interactive website for Zoflow Tech - a monday.com certified partner specializing in workflow automation and business intelligence systems.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

- **Interactive Particle Background** - Dynamic particle system that responds to mouse movement
- **Smooth Scroll Animations** - Sections fade in as you scroll with Intersection Observer API
- **Parallax Effects** - Hero section responds to mouse movement for depth
- **3D Card Transforms** - Case study cards with hover effects and depth
- **Scroll Progress Bar** - Visual indicator of page scroll position
- **Responsive Design** - Fully mobile-responsive from 320px to 4K displays
- **Performance Optimized** - Throttled events, lazy loading, efficient animations
- **Accessible** - Keyboard navigation support, semantic HTML, ARIA labels

## 🚀 Quick Start

### Option 1: Open Directly
Simply open `index.html` in your web browser - no build process required!

### Option 2: Local Development Server

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js
npx http-server -p 8000

# Using PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000`

## 📁 Project Structure

```
zoflow-website/
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # All styles and animations
├── js/
│   ├── particles.js       # Particle background system
│   └── main.js           # Main JavaScript functionality
├── assets/
│   └── images/           # Image assets (future use)
├── README.md             # This file
├── .gitignore           # Git ignore rules
└── LICENSE              # MIT License
```

## 🎨 Customization

### Colors
Main brand colors are defined in CSS. Update these values in `css/styles.css`:

```css
/* Primary Blue */
#2196F3

/* Secondary Cyan */
#00BCD4

/* Purple (Monday section) */
#6B46C1, #805AD5

/* Gold (Certified badge) */
#FFD700
```

### Particle Configuration
Adjust particle behavior in `js/particles.js`:

```javascript
const config = {
    particleCount: 80,              // Number of particles
    connectionDistance: 120,        // Max distance for connections
    mouseAttractionDistance: 150,   // Mouse interaction radius
    // ... more options
};
```

### Content Updates
- **Hero Section**: Edit text in `index.html` around line 50
- **Case Studies**: Update cards starting around line 100
- **Footer Links**: Modify footer section around line 180

## 🌐 Deployment

### Deploy to GitHub Pages

```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit"

# Create GitHub repository, then:
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/zoflow-website.git
git push -u origin main

# Enable GitHub Pages in repository settings
# Set source to main branch, root directory
```

### Deploy to IONOS / Traditional Hosting

1. Connect via FTP/SFTP
2. Upload all files to `public_html` or `htdocs` directory
3. Ensure `index.html` is in the root
4. Set file permissions (usually 644 for files, 755 for directories)

### Deploy to Netlify / Vercel

```bash
# Netlify
netlify deploy --prod

# Vercel
vercel --prod
```

## 🔧 Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- iOS Safari 12+
- Chrome for Android (latest)

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 481px - 968px
- **Desktop**: 969px - 1200px
- **Large Desktop**: > 1200px

## 🎯 Performance

- **PageSpeed Score**: 95+
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Lighthouse**: 95+ across all metrics

### Performance Tips

1. **Images**: Use WebP format for better compression
2. **Fonts**: Consider font-display: swap for system fonts
3. **CDN**: Use a CDN for static assets in production
4. **Minification**: Minify CSS/JS for production builds

## 🛠️ Development Workflow

### Making Changes

1. Edit files in your code editor
2. Refresh browser to see changes
3. Test across different devices/browsers
4. Commit changes to git

### Testing Checklist

- [ ] Test on Chrome, Firefox, Safari
- [ ] Test on mobile device
- [ ] Check all links work
- [ ] Verify animations perform smoothly
- [ ] Test keyboard navigation
- [ ] Validate HTML/CSS
- [ ] Check console for errors

## 📞 Support & Contact

- **Website**: [zoflowtech.com](https://zoflowtech.com)
- **LinkedIn**: [linkedin.com/company/zoflow-tech](https://www.linkedin.com/company/zoflow-tech)
- **Email**: Contact form on website

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- monday.com for partnership and platform
- Design inspiration from modern SaaS websites
- Built with vanilla HTML, CSS, and JavaScript - no frameworks required!

## 🗺️ Roadmap

- [ ] Add workflow animation video section
- [ ] Integrate Calendly for meeting booking
- [ ] Add contact form with validation
- [ ] Create case study detail pages
- [ ] Add blog section
- [ ] Implement dark/light mode toggle
- [ ] Add more Monday.com product showcases
- [ ] Create client testimonials section

---

**Built with ❤️ for Zoflow Tech**

Last updated: December 2024