# 🚀 Quick Start Guide

Get your Zoflow Tech website on GitHub in 5 minutes!

## Step 1: Download the Project

You already have the complete project folder: `zoflow-website/`

## Step 2: Test Locally (Optional but Recommended)

```bash
# Navigate to the project
cd zoflow-website

# Open in browser
open index.html

# OR start a local server
python3 -m http.server 8000
# Visit: http://localhost:8000
```

## Step 3: Initialize Git Repository

```bash
# Make sure you're in the zoflow-website directory
cd /path/to/zoflow-website

# Initialize git
git init

# Add all files
git add .

# Make first commit
git commit -m "Initial commit: Zoflow Tech website v1.0"
```

## Step 4: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `zoflow-website` (or your choice)
3. Description: "Modern website for Zoflow Tech"
4. **Keep it Private** (initially) or Public
5. **DO NOT** initialize with README, .gitignore, or license (we have them!)
6. Click "Create repository"

## Step 5: Push to GitHub

GitHub will show you commands. Use these:

```bash
# Add your GitHub repo as remote
git remote add origin https://github.com/YOUR_USERNAME/zoflow-website.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 6: Verify on GitHub

- Refresh your GitHub repository page
- You should see all files uploaded
- Check that the structure looks correct

## Next Steps

### Option A: Deploy to GitHub Pages (Free Hosting)
1. Go to repository Settings → Pages
2. Source: "Deploy from a branch"
3. Branch: select `main` and `/ (root)`
4. Click Save
5. Wait 2-5 minutes
6. Visit: `https://YOUR_USERNAME.github.io/zoflow-website/`

### Option B: Deploy to IONOS
Follow the detailed guide in `DEPLOYMENT.md`

### Option C: Connect to Netlify/Vercel
- Import your GitHub repository
- Auto-deploys on every push!

## Daily Workflow

```bash
# Make changes to files
# Then commit and push:

git add .
git commit -m "Description of changes"
git push
```

## Common Git Commands

```bash
# Check status
git status

# See what changed
git diff

# View commit history
git log --oneline

# Create a new branch
git checkout -b feature-name

# Switch branches
git checkout main

# Pull latest changes
git pull

# Undo last commit (keep changes)
git reset --soft HEAD~1
```

## Troubleshooting

### "Permission denied" error
```bash
# Use HTTPS instead of SSH, or setup SSH keys:
git remote set-url origin https://github.com/YOUR_USERNAME/zoflow-website.git
```

### "Repository not found" error
- Double-check the repository URL
- Make sure you created the repository on GitHub
- Verify your GitHub username in the URL

### Files not showing on GitHub
```bash
# Make sure you added and committed:
git status
git add .
git commit -m "Add files"
git push
```

## File Structure Reference

```
zoflow-website/
├── index.html           ← Main page
├── css/
│   └── styles.css      ← All styles
├── js/
│   ├── particles.js    ← Particle system
│   └── main.js         ← Main scripts
├── assets/
│   └── images/         ← Images (add here)
├── README.md           ← Documentation
├── DEPLOYMENT.md       ← Deploy guide
├── .gitignore          ← Git ignore rules
├── LICENSE             ← MIT License
└── package.json        ← Project info
```

## Need Help?

- **Git Basics**: https://docs.github.com/en/get-started
- **GitHub Pages**: https://pages.github.com/
- **Detailed Deployment**: See `DEPLOYMENT.md`

---

**Ready to go!** 🎉

Your friend's new website is:
- ✅ Professional
- ✅ Interactive
- ✅ Mobile-friendly
- ✅ Fast
- ✅ SEO-ready
- ✅ Easy to update

**Last Updated**: December 2024