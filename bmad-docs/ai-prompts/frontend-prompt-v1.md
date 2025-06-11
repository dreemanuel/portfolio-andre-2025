### Project Goal: 

Develop a modern, highly interactive, and visually stunning personal portfolio website using React, showcasing web development, UI/UX design, and software/scripting projects. 

The site aims to engage potential clients/employers and provide a seamless, unique user experience.


### Core Technologies:

- Framework: React (Functional Components, Hooks)
- Animations: Framer Motion (Primary), React Spring (Optional for specific effects)
- State Management: Zustand
- Styling: CSS-in-JS (e.g., Styled Components or Emotion)
- Visibility/Scroll Detection: Intersection Observer API (or Framer Motion's `useInView` hook)
- Routing: React Router Dom
- Deployment Target: GitHub Pages / Vercel (Frontend only; contact form backend is separate)



### Aesthetic & Design Language:

- Overarching Aesthetic: Neon/Cyberpunk.
- Primary Color Palette: Dark, rich colors from the Catppuccin Frappe scheme (e.g., `base`, `mantle`, `crust` for backgrounds; `text`, `subtext` for foreground elements).
- Accent Colors: A linear gradient from `#33ccff` (Neon Blue/Cyan) to `#00ff99` (Neon Green/Lime). This gradient should be used for CTAs, prominent interactive elements, highlights, and subtle glows.
- Typography:
	- Headings (H1, H2, H3): 'Oxanium' (or similar modern, geometric sans-serif).
	- Body/Main Text: 'Space Mono' (or similar highly readable sans-serif).
	- Dynamic Text/Code: 'JetBrains Mono Nerd Font' (or similar monospace font).
- Key Effects:
	- Glassmorphism: Apply to elements like the Navbar, Hero section foreground, and project tiles on hover. Achieved with `background: rgba(...)` (translucent) and `backdrop-filter: blur(...)` (frosted glass).
	- Neumorphism: Apply to the expanded project details modal/panel. Achieved with subtle inner and outer `box-shadow` properties to create a soft, extruded, tactile feel.
	- Animated Background: A low-opacity, heavily blurred looping vaporwave/synthwave video background (e.g., abstract landscape, moving planet). Positioned absolutely behind all content.
	- Fuzzy Blurs: Explore advanced CSS filters or SVG filters for more organic, diffused blur effects behind certain elements.



### Component Structure (High-Level):

The application should be structured into logical, reusable React functional components.

- `App.js` (Root component, global styling, routing)
- `Layout.js` (Optional, for consistent header/footer across pages)
- `HomePage.js` (Orchestrates Hero and Project Showcase)
- `AboutMePage.js`
- `ContactPage.js`
- `NotFoundPage.js`
- UI Components:
	- `HeroSection.js`
	- `HeroText.js` (Child of `HeroSection`, for dynamic text)
	- `HeroCallToActions.js` (Child of `HeroSection`, for stacked buttons)
	- `Navbar.js` (handles transformation from hero)
	- `NavLinks.js` (child of `Navbar`)
	- `ConnectDropdown.js` (child of `Navbar` for social links)
	- `WorkWithMeButton.js` (reusable CTA button)
	- `ProjectShowcase.js` (container for `ProjectTiles`)
	- `ProjectTile.js` (Individual project item)
	- `ProjectDetailsModal.js` (Pop-up for detailed project view)
	- `AnimatedBackground.js`
	- `Footer.js`
	- `ContactForm.js` (Handles form fields and submission logic)



### Key Features & Interactions:

#### 1. Dynamic Hero-to-Navbar Transformation:
- ##### Initial State (`HeroSection`): Full viewport height.
	- Left area (approx. 70%): H1 "Hello, my name is Andre", H2 "I am a " followed by a cycling sequence of roles/skills (e.g., "Web Developer", "UI/UX Designer", "Concept Artist", "Linux Power User (I use Arch btw)"). The cycling text should have a smooth fade-in/fade-out or subtle slide animation every ~7 seconds using Framer Motion.
	- Right area (approx. 30%): Stacked vertical buttons: "Work with me" (primary CTA, gradient accent), "About Me", "Projects", "Connect With Me" (opens dropdown).
	- All foreground elements (text containers, button stack) use Frosted Glass effect over the blurred animated background.
- ##### Scroll Transition: 
	When the user scrolls down and the Hero section's top edge leaves the viewport (detected by Intersection Observer or `useInView`), the elements gracefully animate and transform into a sticky Navbar.
	- The left text element (H1 "Hello, my name is Andre") smoothly shrinks and repositions to the left of the Navbar, displaying "Andre Emanuel" (or a simplified logo).
	- The stacked buttons (`HeroCallToActions`) fluidly slide horizontally and cascade into the compact Navbar links, aligning to the right.
	- Use Framer Motion's `layoutId` property for seamless shared layout animations between the Hero and Navbar elements.
- ##### Navbar State: 
	Becomes `position: fixed` at the top, maintaining its Frosted Glass appearance, containing "Andre Emanuel" on the left and the transformed navigation links and CTA on the right.
- ##### Reverse Transition: 
	Scrolling back up reverses the animation, restoring the Hero section.

#### 2. Interactive Project Showcase:
- Layout: Responsive grid of project tiles.
- `ProjectTile` (Inactive): Displays a project screenshot clearly.
- `ProjectTile` (Hover State):
	- Animates with a subtle "bouncy" bezier curve effect (slight scale, rotation, or skew) using Framer Motion's `whileHover`.
	- The tile's background becomes Frosted Glass, subtly blurring the underlying screenshot.
	- Overlay text (Date, Technologies Used, Industry Sector) smoothly fades in or slides up over the frosted background.
- `ProjectDetailsModal` (Click State):
	- On click, a full-screen overlay or large side-panel (`ProjectDetailsModal.js`) appears.
	- The modal itself applies Neumorphism styling for a soft, extruded, tactile feel, contrasting with the glassmorphism.
	- Contains an image gallery/carousel of project screenshots, a detailed description, and a prominent "Visit website" button.
	- Smooth modal entry/exit animations (e.g., scale-up, slide-in) using Framer Motion.

#### 3. Contact Form Page (`ContactPage.js`):
- Includes input fields for Name, Email, Subject, Message.
- Form submission logic to interact with a Vercel Serverless Function endpoint (AI should provide placeholder API call).
- Submit button styled with the accent gradient and micro-interactions.

#### 4. About Me Section (`AboutMePage.js`):
- Basic structure with placeholder text for content.

#### 5. Global Animations & Micro-interactions:
- Scroll Reveal: Implement subtle fade-in/slide-up animations for sections and elements as they enter the viewport, triggered by Intersection Observer.
- Buttons/Links: Implement subtle hover effects (e.g., accent gradient glow, slight scale) and click feedback (e.g., subtle press down, ripple).

### Non-Functional Requirements:

- Performance: Code optimized for fast loading. Images/videos lazy-loaded and optimized.
- Responsiveness: Fully adaptive layout for mobile, tablet, and desktop.
- Accessibility: Basic ARIA roles for interactive elements, keyboard navigation, sufficient color contrast.

### Data Structure (for Project Data):
Assume project data will be provided as a simple JavaScript array of objects (e.g., `src/data/projects.js`):

```JavaScript
// Example structure for a single project
const projects = [
  {
    id: 'project-1',
    title: 'Project Alpha',
    thumbnail: '/images/project-alpha-thumb.webp',
    date: '2023-01-15',
    technologies: ['React', 'SASS', 'Node.js'],
    industry: 'FinTech',
    description: 'Detailed description of Project Alpha...',
    screenshots: [
      '/images/project-alpha-ss1.webp',
      '/images/project-alpha-ss2.webp'
    ],
    websiteUrl: 'https://projectalpha.com'
  },
  // ... more projects
];
export default projects;
```


### Instructions for AI (Output Format):

- Provide functional React components (`.js` or `.jsx`).
- Use Styled Components (or similar CSS-in-JS library) for styling. Define global styles and theme provider.
- Structure code into a clear, modular folder hierarchy (e.g., `src/components`, `src/pages`, `src/styles`, `src/data`, `src/hooks`).
- Include basic routing setup using React Router Dom.
- For the animated background, provide the HTML/CSS structure and note where the video file should be placed (e.g., `public/videos/background-loop.webm`).
- For complex animations like Hero-to-Navbar, ensure `layoutId` usage and clear state management with Zustand.
- Provide placeholder content where actual content (like "About Me" text) is pending.
