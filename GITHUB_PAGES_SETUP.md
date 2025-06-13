# GitHub Pages Deployment Guide

## Setup Complete! ✅

Your repository is already configured for GitHub Pages deployment. Here's what's set up:

### Current Configuration:
- ✅ **HashRouter**: Using `HashRouter` for client-side routing compatibility
- ✅ **Vite Config**: Base path set to `/portfolio-andre-2025/` for production
- ✅ **GitHub Workflow**: Automated deployment on push to main branch
- ✅ **Build Output**: Configured to deploy from `dist` folder

## Deployment Steps:

### 1. Enable GitHub Pages (One-time setup)
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select **Deploy from a branch**
5. Choose **gh-pages** branch
6. Select **/ (root)** folder
7. Click **Save**

### 2. Deploy Your Site
Simply push to main branch:
```bash
git add .
git commit -m "Deploy portfolio to GitHub Pages"
git push origin main
```

The GitHub Action will automatically:
- Build your React app
- Deploy to `gh-pages` branch
- Make it available at: `https://yourusername.github.io/portfolio-andre-2025/`

### 3. View Your Deployment
After pushing, you can:
- Check the **Actions** tab to see deployment progress
- Visit **Settings > Pages** to see your site URL
- Site will be available at: `https://yourusername.github.io/portfolio-andre-2025/`

## Configuration Details:

### Vite Configuration (`vite.config.js`)
- Base path automatically set for GitHub Pages
- HashRouter handles client-side routing
- Build outputs to `dist` folder

### GitHub Action (`.github/workflows/deploy.yml`)
- Triggers on push to main branch
- Uses Node.js 20 with npm caching
- Builds and deploys automatically
- Deploys to `gh-pages` branch

### Router Configuration (`src/App.jsx`)
- Using `HashRouter` instead of `BrowserRouter`
- Handles routing without server configuration
- Perfect for static hosting like GitHub Pages

## Troubleshooting:

### If deployment fails:
1. Check **Actions** tab for error details
2. Ensure all dependencies are in `package.json`
3. Verify build passes locally: `npm run build`

### If site doesn't load correctly:
1. Check that base path matches repository name
2. Verify GitHub Pages is enabled and pointing to `gh-pages` branch
3. Wait a few minutes for changes to propagate

### If routing doesn't work:
- HashRouter should handle this automatically
- URLs will include `#` (e.g., `site.com/#/about`)
- This is normal for GitHub Pages deployment

## Next Steps:

1. **Push to deploy**: Your site is ready to go live!
2. **Custom domain** (optional): Add a `CNAME` file for custom domain
3. **SSL**: GitHub Pages provides free HTTPS automatically
4. **Analytics**: Consider adding Google Analytics or similar

## Site URLs:
- **Development**: `http://localhost:3001/`
- **Production**: `https://yourusername.github.io/portfolio-andre-2025/`

Your portfolio is ready to go live! 🚀