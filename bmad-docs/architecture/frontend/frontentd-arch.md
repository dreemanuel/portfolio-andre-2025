## Frontend Architecture Document: Andre Emanuel Portfolio Website

### 1. Introduction / Preamble

This document outlines the frontend architecture for the Andre Emanuel Portfolio Website. 

It translates the Product Requirements Document ([[PRD]]) into a technical blueprint, detailing the component structure, state management, styling approach, animation strategy, and key technical decisions to achieve the desired interactive and visually stunning user experience. 

This architecture prioritizes modularity, performance, maintainability, and extensibility, especially given the innovative UI/UX features planned.


### 2. Technical Summary

The Andre Emanuel Portfolio Website will be built as a Single Page Application (SPA) using [[React]]. 

It will leverage modern libraries for advanced animations ([[Framer Motion]], [[React Spring]]), efficient state management ([[Zustand]]), and scroll-triggered effects ([[Intersection Observer]] API). 

Styling will utilize a [[CSS-in-JS]] approach, adhering to a defined color palette and [[glassmorphism]]/[[neumorphism]] aesthetics. 

The architecture is component-driven, promoting reusability and clear separation of concerns.


### 3. High-Level Architecture Overview

The application will follow a standard React component-based architecture. 

A main `App` component will orchestrate routing and top-level layout. 

Key sections will be represented by distinct, high-level components.

#### 3.1. Repository Structure

- ##### Monorepo (Implied): 
  Given the frontend focus, the project will likely reside in a single repository with clear separation for components, assets, styles, and utility functions.

#### 3.2. Data Flow (Frontend-specific)

- ##### Project Data: 
  Project information (screenshots, descriptions, links) will likely be loaded from a static data source (e.g., JSON files, Markdown files parsed at build time) to minimize complexity for a static site.

- ##### Contact Form Data: 
  Submissions will be sent to a [[Vercel]] [[Serverless]] Function, which will then persist data to a [[Supabase]] database. This will be an [[API]] call from the [[frontend]].

- ##### Asset Loading: 
  Images and videos will be [[lazy-load]]ed.


### 4. Component Structure

The application will be broken down into a hierarchy of reusable components.

#### 4.1. Core Components (Top-Level Pages/Sections)

- ##### `App.js`: 
	The root component. Handles global layout, routing, and potentially global state initialization.
	
- ##### `Layout.js`: 
	(Optional) A wrapper component for consistent layout elements like the dynamic Navbar and Footer, applied to all main routes.
	
- ##### `HomePage.js`: 
	Orchestrates the Hero Section and Project Showcase.
	
- ##### `AboutMePage.js`: 
	Dedicated page/section for the "About Me" content.
	
- ##### `ContactPage.js`: 
	Dedicated page for the contact form.
	
- ##### `NotFoundPage.js`: 
	For 404 errors.

#### 4.2. UI Components (Reusable Elements)

- `HeroSection.js`:
    - Contains the `HeroText.js` (with dynamic text cycling).
    - Houses `HeroCallToActions.js` (the stack of buttons).
    - Integrates the background animation.
    - Responsible for orchestrating its transformation into the Navbar.
	
- `Navbar.js`:
    - Displays Andre's name/logo.
	- Contains `NavLinks.js` (Projects, About Me).
    - Includes `ConnectDropdown.js` (social links).
    - Houses `WorkWithMeButton.js`.
    - Receives properties to manage its "sticky" and "transformed" states.
	
- `ProjectShowcase.js`:
    - Grid or flexible layout container for `ProjectTile` components.
	- Manages the state of which project is currently expanded/active.
	
- `ProjectTile.js`:
    - Displays project screenshot and title.
    - Handles hover animations (Frosted Glass, bezier curves) using Framer Motion.
    - Manages its own click state to open the `ProjectDetailsModal`.
	
- `ProjectDetailsModal.js`:
	- A modal or side-panel component that appears on project tile click.
    - Contains a project image gallery, detailed description, and "Visit website" button.
    - Applies Neumorphism styling.
    - Manages its open/closed state, potentially via Zustand.
	
- `AboutMeContent.js`: 
	Renders the "About Me" text content.
	  
- `ContactForm.js`:
    - Handles form input fields (name, email, subject, message).
    - Manages form submission state (loading, success, error).
    - Communicates with the Vercel Serverless Function API endpoint.
	
- `Footer.js`: Contains sitemap links, copyright, contact info, and social media links.
	
- `AnimatedBackground.js`: A dedicated component to render the looping video/WebGL background, positioned absolutely to remain behind other content.



### 5. State Management Strategy

[[Zustand]] will be utilized for efficient and minimalist state management.

- #### Global State (Zustand Stores):
    - `uiStore`: Manages UI-specific states like isNavbarSticky (for Hero-to-Navbar transition), isModalOpen, activeProjectId.
    - `projectDataStore`: Stores loaded project data, potentially filtering/sorting states.
    - `contactFormStore`: Manages contact form submission status (e.g., isSubmitting, submissionSuccess, submissionError).
      
- #### Component-Local State: 
  For simple UI interactions and form input values within individual components, `useState` and `useReducer` hooks will be used.



### 6. Routing Strategy

**React Router Dom** will be used for client-side routing to manage different views/pages without full page reloads.

- #### Routes:
    - `/` (Home/Landing page)
    - `/about` (About Me page)
    - `/contact` (Contact Form page)
    - `/projects` (If a dedicated projects page is needed, otherwise \#anchor link to showcase)
    - `/*` (404 Not Found page)


### 7. Styling Approach

A [[CSS-in-JS]] library (e.g., Styled Components or Emotion) will be used to provide component-scoped styles, dynamic styling based on props/state, and easy integration with the React component tree.

- #### Theming: 
  A global theme object (accessible via CSS-in-JS context) will define the Catppuccin Frappe dark primary colors and the `#33ccff`, `#00ff99` accent hex codes, ensuring consistency.
  
- #### Global Styles: 
  A dedicated global styles component will handle base CSS resets and body background.
  
- #### Aesthetic Implementation:
	- ##### Glassmorphism: 
	  Achieved using `background: rgba(...)` for transparency and `backdrop-filter: blur(...)` for the frosted glass effect on elements like the Navbar and project tiles on hover.
	
    - ##### Neumorphism: 
      Implemented using subtle `box-shadow` properties (inner and outer shadows) to create the "soft, extruded" look for elements like the expanded project modal/panel.
	  
    - ##### Fuzzy Blurs: 
      Can be achieved with more complex CSS filters or potentially SVG filters behind elements.



### 8. Animation Strategy

Framer Motion and React Spring will be the primary libraries for animations, complemented by the Intersection Observer API.

- #### Hero-to-Navbar Transformation:
    - `Intersection Observer API`: Used to detect when the Hero section leaves the viewport, triggering the state change to `isNavbarSticky`.
    - `Framer Motion`: Crucial for animating the `layout` property of elements (e.g., `HeroText`, `HeroCallToActions`, `NavbarLinks`) as they transition between the Hero and Navbar components. The `layoutId` prop will enable shared layout animations for seamless morphing. `AnimatePresence` will be used for entering/exiting components.
      
- #### Project Tile Animations:
    - ##### Hover: 
      Framer Motion's whileHover prop for scaling, opacity changes, and the bezier curve "bouncy" effect.
      
    - ##### Click/Expand: 
      Framer Motion or React Spring for smooth transitions of the tile's position, size, and content as it transforms into the ProjectDetailsModal.
      
- #### Scroll-Triggered Animations:
    - `Intersection Observer API`: To detect when sections or specific elements enter the viewport.
    - `Framer Motion` / `React Spring`: To trigger "reveal" or "fade-in-up" animations when elements become visible.

- #### Animated Background: 
	The `AnimatedBackground.js` component will play the looping video, possibly using HTML5 `<video>` element with `autoplay`, `loop`, `muted`, `playsinline` attributes, or integrating with a WebGL library like `React Three Fiber` for more complex and performant generative animations.
	  
- #### Micro-interactions: 
	Small, subtle animations (e.g., button ripples, link underlines on hover, text highlight) will be implemented using Framer Motion or plain CSS transitions.



### 9. Performance & Optimization

- #### Lazy Loading: 
  Images and project videos will be lazy-loaded using loading="lazy" attribute or react-lazyload/Intersection Observer.
  
- #### Code Splitting: 
  Route-based code splitting using React.lazy() and Suspense to load component bundles only when needed.

- #### Image Optimization: 
  Use optimized image formats (WebP) and responsive image techniques (srcset, sizes).

- #### Video Optimization: 
  Ensure background video is compressed, looped efficiently, and uses .webm for better performance.

- #### Bundle Size: 
  Keep the main JavaScript bundle size minimal.
  
- #### Animation Performance: 
  Prioritize GPU-accelerated animations using CSS transform and opacity properties where possible, and leverage Framer Motion's performance optimizations.



### 10. Accessibility Considerations

- #### Semantic HTML: 
  Use appropriate HTML5 semantic elements (`<nav>`, `<main>`, `<section>`, `<footer et al.`).

- #### Keyboard Navigation: 
  Ensure all interactive elements are reachable and operable via keyboard.

- #### ARIA Attributes: 
  Apply appropriate ARIA roles and attributes for complex widgets (e.g., modals, dropdowns) to improve screen reader compatibility.

- #### Color Contrast: 
  Ensure sufficient color contrast for text and interactive elements against their backgrounds.

- #### Focus Management: 
  Proper focus management for modals and interactive components.



### 11. Future Enhancements

- #### [[WebGL]]/[[R3F]] Background: 
  Transition from video background to a more dynamic, generative background using React Three Fiber (R3F) for even greater performance and visual uniqueness (stretch goal).

- #### Content Management System ([[CMS]]):
  Integration with a [[headless CMS]] (e.g., [[Contentful]], [[Sanity.io]]) for easier project content management, removing the need for manual file edits.

- #### Analytics: 
  Implement basic analytics (e.g., [[Google Analytics]], [[Vercel Analytics]]) to track site usage.