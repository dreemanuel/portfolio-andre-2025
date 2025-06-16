import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  author = 'Andre Emanuel'
}) => {
  // Default SEO data
  const defaultTitle = "Andre Emanuel - Full-Stack Developer & Creative Problem Solver";
  const defaultDescription = "Experienced full-stack developer specializing in React, Node.js, and modern web technologies. Creating innovative digital solutions from Bali, Indonesia. Available for freelance projects and full-time opportunities.";
  const defaultKeywords = "full-stack developer, web developer, React developer, Node.js developer, JavaScript developer, TypeScript developer, frontend developer, backend developer, portfolio, freelance developer, Bali developer, Indonesia developer, creative problem solver, modern web technologies";
  const defaultImage = "/images/andre-emanuel-og-image.jpg";
  const defaultUrl = "https://andre-emanuel.github.io/portfolio-andre-2025/";

  // Use provided values or defaults
  const seoTitle = title ? `${title} | Andre Emanuel` : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoKeywords = keywords || defaultKeywords;
  const seoImage = image || defaultImage;
  const seoUrl = url || defaultUrl;

  // Generate structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Andre Emanuel",
    "jobTitle": "Full-Stack Developer",
    "description": seoDescription,
    "url": seoUrl,
    "image": seoImage,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bali",
      "addressCountry": "Indonesia"
    },
    "sameAs": [
      "https://github.com/andre-emanuel",
      "https://linkedin.com/in/andre-emanuel",
      "https://instagram.com/andre.emanuel",
      "https://x.com/andre_emanuel"
    ],
    "knowsAbout": [
      "React",
      "Node.js",
      "JavaScript",
      "TypeScript",
      "Full-Stack Development",
      "Frontend Development",
      "Backend Development",
      "Web Development",
      "UI/UX Design",
      "Database Design",
      "API Development"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Full-Stack Developer",
      "description": "Develops end-to-end web applications using modern technologies",
      "skills": [
        "React",
        "Node.js",
        "JavaScript",
        "TypeScript",
        "Python",
        "PostgreSQL",
        "MongoDB",
        "Docker",
        "AWS",
        "Git"
      ]
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={seoUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:site_name" content="Andre Emanuel Portfolio" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
      <meta name="twitter:creator" content="@andre_emanuel" />
      <meta name="twitter:site" content="@andre_emanuel" />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#33ccff" />
      <meta name="msapplication-TileColor" content="#303446" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Favicon and Icon Links */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://cdn.jsdelivr.net" />
      
      {/* DNS Prefetch for performance */}
      <link rel="dns-prefetch" href="//github.com" />
      <link rel="dns-prefetch" href="//linkedin.com" />
      <link rel="dns-prefetch" href="//instagram.com" />
      <link rel="dns-prefetch" href="//x.com" />
    </Helmet>
  );
};

export default SEO;