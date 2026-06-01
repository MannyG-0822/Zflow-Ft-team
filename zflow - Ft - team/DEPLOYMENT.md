# 🚀 Deployment Guide

Complete guide for deploying the Zoflow Tech website to various hosting platforms.

## Table of Contents

- [GitHub Pages](#github-pages)
- [IONOS Hosting](#ionos-hosting)
- [Netlify](#netlify)
- [Vercel](#vercel)
- [Pre-Deployment Checklist](#pre-deployment-checklist)

---

## GitHub Pages

### Initial Setup

1. **Create GitHub Repository**
```bash
# In your project directory
git init
git add .
git commit -m "Initial commit: Zoflow Tech website"
```

2. **Create Repository on GitHub**
- Go to github.com and create a new repository
- Name it: `zoflow-website` or `zoflow-tech-site`
- Don't initialize with README (we already have one)

3. **Push to GitHub**
```bash
git remote add origin https://github.com/YOUR_USERNAME/zoflow-website.git
git branch -M main
git push -u origin main
```

4. **Enable GitHub Pages**
- Go to repository Settings → Pages
- Source: Deploy from branch
- Branch: `main` / `root`
- Save

5. **Access Your Site**
- Will be available at: `https://YOUR_USERNAME.github.io/zoflow-website/`
- Usually takes 2-5 minutes to deploy

### Custom Domain on GitHub Pages

1. Add a CNAME file to your repository:
```bash
echo "zoflowtech.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```

2. In your domain registrar (IONOS):
- Add an A record pointing to GitHub Pages IPs:
  - 185.199.108.153
  - 185.199.109.153
  - 185.199.110.153
  - 185.199.111.153
- Or add a CNAME record: `YOUR_USERNAME.github.io`

3. In GitHub repository settings → Pages:
- Enter custom domain: `zoflowtech.com`
- Enable HTTPS

---

## IONOS Hosting

### Using File Manager

1. **Login to IONOS**
- Go to ionos.com and login
- Navigate to "Hosting" or "Web Space"

2. **Access File Manager**
- Click "Open File Manager" or similar
- Navigate to `public_html` or `/` directory

3. **Upload Files**
- Delete any existing `index.html` (backup first!)
- Upload all project files:
  - `index.html`
  - `css/` folder
  - `js/` folder
  - `assets/` folder

4. **Set Permissions**
- Files: 644
- Folders: 755

5. **Test**
- Visit your domain
- Clear cache if needed (Ctrl+F5)

### Using FTP/SFTP

1. **Get FTP Credentials**
- In IONOS control panel: Hosting → FTP Access
- Note: hostname, username, password, port

2. **Connect with FileZilla** (or any FTP client)
```
Host: ftp.yourdomain.com
Username: your_username
Password: your_password
Port: 21 (FTP) or 22 (SFTP)
```

3. **Upload Files**
- Remote site: `/` or `/public_html`
- Local site: your `zoflow-website` folder
- Upload all files and folders

### Using SSH/Terminal (Advanced)

```bash
# Connect via SSH
ssh username@yourdomain.com

# Navigate to web root
cd /path/to/public_html

# Clone from GitHub (if using Git)
git clone https://github.com/YOUR_USERNAME/zoflow-website.git temp
mv temp/* .
rm -rf temp

# Or upload via SCP
scp -r /local/path/zoflow-website/* username@yourdomain.com:/path/to/public_html/
```

---

## Netlify

### Drag & Drop Deployment

1. Go to [netlify.com](https://netlify.com)
2. Login or create account
3. Click "Add new site" → "Deploy manually"
4. Drag your `zoflow-website` folder
5. Wait for deployment (~30 seconds)
6. Site will be live at: `random-name.netlify.app`

### Git-Based Deployment

1. **Connect Repository**
```bash
# Push to GitHub first (see GitHub section above)
```

2. **Netlify Setup**
- Go to netlify.com → "Add new site"
- "Import an existing project"
- Connect to GitHub
- Select your repository
- Build settings:
  - Build command: (leave empty)
  - Publish directory: `/`
- Deploy!

3. **Custom Domain**
- Site settings → Domain management
- Add custom domain: `zoflowtech.com`
- Follow DNS configuration instructions
- Enable HTTPS

### Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
cd zoflow-website
netlify deploy --prod

# Follow prompts
```

---

## Vercel

### GitHub Integration

1. **Push to GitHub** (see GitHub section)

2. **Import to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "Add New" → "Project"
- Import from GitHub
- Select your repository

3. **Configure**
- Framework Preset: Other
- Root Directory: ./
- Build Command: (leave empty)
- Output Directory: ./
- Deploy!

4. **Custom Domain**
- Project settings → Domains
- Add: `zoflowtech.com`
- Configure DNS as instructed
- Auto-HTTPS enabled

### Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd zoflow-website
vercel

# Production deployment
vercel --prod
```

---

## Pre-Deployment Checklist

### Content Review
- [ ] All links work correctly
- [ ] Contact information is correct
- [ ] LinkedIn link is correct
- [ ] Copyright year is current
- [ ] All text is proofread

### Technical Checks
- [ ] Test on Chrome, Firefox, Safari
- [ ] Test on mobile device
- [ ] All images load correctly
- [ ] No console errors
- [ ] Animations work smoothly
- [ ] Forms work (if added)

### SEO & Metadata
- [ ] Update page title in `<title>` tag
- [ ] Update meta description
- [ ] Add Open Graph tags for social sharing
- [ ] Add favicon
- [ ] Create sitemap.xml
- [ ] Add robots.txt

### Performance
- [ ] Compress images
- [ ] Minify CSS (optional for production)
- [ ] Minify JavaScript (optional)
- [ ] Test PageSpeed Insights
- [ ] Enable gzip compression on server

### Security
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] No sensitive data in code
- [ ] Update any API keys/secrets

### Analytics (Optional)
- [ ] Add Google Analytics
- [ ] Add Facebook Pixel (if needed)
- [ ] Setup conversion tracking

---

## Post-Deployment

### Testing
1. Visit your live site
2. Test all links and buttons
3. Test on multiple devices
4. Check browser console for errors
5. Test page load speed

### Monitoring
- Setup uptime monitoring (e.g., UptimeRobot)
- Monitor analytics
- Check for 404 errors
- Monitor Core Web Vitals

### Maintenance
- Regular backups
- Update content as needed
- Monitor security updates
- Check broken links monthly

---

## Troubleshooting

### Site Not Loading
- Clear browser cache
- Check DNS propagation: [whatsmydns.net](https://whatsmydns.net)
- Verify file permissions (644/755)
- Check server error logs

### Styles Not Working
- Check CSS file path in HTML
- Verify CSS file uploaded correctly
- Clear CDN cache
- Check browser console for 404s

### JavaScript Not Working
- Check JS file paths in HTML
- Verify JS files uploaded correctly
- Check browser console for errors
- Ensure files have correct MIME types

### Custom Domain Not Working
- DNS can take 24-48 hours to propagate
- Verify DNS settings in domain registrar
- Check CNAME/A records
- Try accessing via www and non-www

---

## Need Help?

- Check hosting provider documentation
- Search Stack Overflow
- Contact Zoflow Tech support

**Last Updated**: December 2024