# Andre Emanuel - Portfolio Website

A modern, interactive portfolio website showcasing full-stack development expertise with a cyberpunk/neon aesthetic. Built with React, Vite, and cutting-edge web technologies to demonstrate technical competency and creative vision.

## ✨ Features

### 🎯 Core Functionality
- **Dynamic Hero Section**: Animated introduction with cycling role descriptions and smooth scroll transitions
- **Interactive Project Showcase**: 9 comprehensive projects with detailed modals, search/filter functionality
- **Professional About Section**: Career journey from F&B management to full-stack development
- **Contact Form**: Fully functional lead generation with Supabase backend integration
- **Responsive Footer**: Social media integration and site navigation

### 🎨 Design & User Experience
- **Cyberpunk Aesthetic**: Neon accents (#33ccff, #00ff99) with Catppuccin Frappe color palette
- **Glassmorphism Effects**: Translucent backgrounds with backdrop blur throughout interface
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Mobile-First Design**: Fully responsive across all device sizes
- **Accessibility Compliant**: Semantic HTML, keyboard navigation, screen reader support

### ⚡ Performance & SEO
- **Optimized Bundles**: Code splitting with vendor, motion, icons, and router chunks
- **Lazy Loading**: Intersection Observer based image loading with fallbacks
- **SEO Optimized**: Complete meta tags, structured data, sitemap, and Open Graph integration
- **PWA Ready**: Web app manifest and offline-first capabilities
- **Performance Monitoring**: Core Web Vitals optimization and analytics ready

## 🛠 Technology Stack

### Frontend
- **React 19.1.0** - Modern functional components with hooks
- **Vite 6.3.5** - Fast build tool with hot module replacement
- **Tailwind CSS 3.4.3** - Utility-first CSS framework with custom theming
- **Framer Motion 12.16.0** - Production-ready animation library

### Routing & Navigation
- **React Router DOM 7.6.2** - Client-side routing with hash routing for GitHub Pages
- **React Intersection Observer** - Efficient scroll-based animations

### Forms & Validation
- **React Hook Form 7.57.0** - Performant form handling
- **Zod 3.25.64** - TypeScript-first schema validation
- **@hookform/resolvers** - Integration between React Hook Form and Zod

### Backend & Database
- **Supabase** - Backend-as-a-Service for contact form submissions
- **Vercel Serverless Functions** - API endpoints for form processing

### UI & Icons
- **React Icons 5.5.0** - Comprehensive icon library
- **React Type Animation 3.2.0** - Typewriter effect animations
- **React Helmet Async 2.0.5** - SEO meta tag management

### Development Tools
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS processing with Tailwind
- **Terser** - JavaScript minification for production builds

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/andre-emanuel/portfolio-andre-2025.git
   cd portfolio-andre-2025
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Add your Supabase credentials to .env.local
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📜 Available Scripts

### Development
- `npm run dev` - Start development server with hot reload
- `npm run build` - Create optimized production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

### Database
- `npm run test:db` - Test Supabase database connection

### Deployment
- `npm run deploy` - Build project and display deployment instructions
- `npm run deploy-pages` - Deploy to GitHub Pages (requires gh-pages setup)

## 🏗 Project Structure

```
portfolio-andre-2025/
├── public/                 # Static assets
│   ├── robots.txt         # SEO crawler instructions
│   ├── sitemap.xml        # Site structure for search engines
│   └── site.webmanifest   # PWA configuration
├── src/
│   ├── components/        # Reusable React components
│   │   ├── Footer.jsx     # Site footer with social links
│   │   ├── HeroSection.jsx # Dynamic hero with animations
│   │   ├── Navbar.jsx     # Navigation with scroll transitions
│   │   ├── ProjectShowcase.jsx # Project gallery system
│   │   ├── ContactForm.jsx # Form with validation
│   │   ├── LazyImage.jsx  # Optimized image loading
│   │   └── SEO.jsx        # Meta tag management
│   ├── pages/             # Route components
│   │   ├── HomePage.jsx   # Landing page
│   │   ├── AboutMePage.jsx # Personal background
│   │   ├── ContactPage.jsx # Contact form page
│   │   └── NotFoundPage.jsx # 404 error page
│   ├── data/              # Static data
│   │   └── projects.js    # Project showcase data
│   ├── styles/            # Global styles
│   └── App.jsx            # Main application component
├── database/              # Database configuration
├── bmad-docs/             # BMAD methodology documentation
└── BMAD-METHOD/           # Development framework
```

## 🚀 Deployment

### GitHub Pages (Current)
The site is configured for GitHub Pages deployment with hash routing:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**
   ```bash
   npm run deploy-pages
   ```

### Vercel (Recommended for Serverless Functions)
For full backend functionality with contact form:

1. Connect repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on git push

### Environment Variables

Create `.env.local` with the following variables:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Analytics
VITE_GA_MEASUREMENT_ID=your_google_analytics_id
```

## 🔧 Configuration

### Tailwind CSS Customization
Custom theme configuration in `tailwind.config.js`:
- Catppuccin Frappe color palette
- Neon accent colors (#33ccff, #00ff99)
- Custom animations and utilities
- Glassmorphism utility classes

### Build Optimization
Vite configuration includes:
- Manual chunk splitting for optimal caching
- Terser minification with console removal
- Bundle size optimization
- Source map generation for debugging

## 📊 Performance

### Lighthouse Scores (Target)
- Performance: >90
- Accessibility: >95
- Best Practices: >90
- SEO: >90

### Optimization Features
- Code splitting and lazy loading
- Image optimization with WebP support
- Efficient bundle chunking strategy
- SEO meta tags and structured data
- Progressive Web App capabilities

## 🤝 Contributing

This is a personal portfolio project, but feedback and suggestions are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

**Andre Emanuel** - Full-Stack Developer & Creative Problem Solver

- Portfolio: [Live Site](https://andre-emanuel.github.io/portfolio-andre-2025/)
- Email: andre@example.com
- LinkedIn: [Andre Emanuel](https://linkedin.com/in/andre-emanuel)
- GitHub: [andre-emanuel](https://github.com/andre-emanuel)

---

*Built with passion in Bali, Indonesia 🌴*
