## UX/UI Specification: Andre Emanuel Portfolio Website

### 1. Introduction / Preamble

This document provides a detailed specification for the User Experience (UX) and User Interface (UI) of the Andre Emanuel [[Portfolio]] Website. 

It expands upon the Project Requirements Document ([[PRD]]) and the [[Frontend Architecture]], translating abstract concepts into concrete visual and interactive guidelines. 

The goal is to ensure a cohesive, aesthetically pleasing, and highly functional user interface that aligns with Andre's professional brand and technical expertise.


### 2. Core Design Principles

The UI/UX design is guided by the following principles:

- ##### Minimalism with Impact: 
  Clean layouts and efficient use of space, allowing key elements to stand out.

- ##### Aesthetic Pleasure: 
  A focus on visually stunning and contemporary design, leveraging modern trends.

- ##### Intuitive Navigation: 
  Clear, easy-to-understand pathways for users to find information and interact.

- ##### Innovative Interactions: 
  Implementation of unique animations and transitions to create a memorable experience.

- ##### Performance-Driven Design: 
  Visual effects are carefully considered to ensure smooth performance across devices.

- ##### Showcase as Centerpiece: 
  The design flow prioritizes and highlights the project showcase section.


### 3. Overall Aesthetic & Styling Foundation

- #### Overarching Aesthetic: 
  Neon/[[Cyberpunk]]. This will be conveyed through color, light effects, and dynamic elements.
  
- #### Primary Color Palette: 
  Dark primary colors derived from the [[Catppuccin Frappe]] color scheme. This establishes a deep, rich, and sophisticated base.
  
- #### Accent Colors:
	- `#33ccff` (Neon Blue/Cyan)
	
	- `#00ff99` (Neon Green/Lime) These will be used strategically for Call-to-Action (CTA) buttons, interactive elements, highlights, and subtle glows to create visual pop.
	
	- A linear gradient from #33ccff to `#00ff99` will be used for prominent interactive elements, CTAs, and highlights 
	
- #### Typography:
	  
	- ##### Headings (H1, H2, H3): 
	  A modern, geometric sans-serif font (e.g., 'JetBrains Mono Nerd Font', 'Space Mono', 'Oxanium', or a similar futuristic-leaning typeface) for a clean, tech-inspired feel.
	
	- ##### Body Text: 
	  A highly readable sans-serif font (e.g., 'Inter', 'Roboto', 'Open Sans', or 'JetBrains Mono Nerd Font') for main content, ensuring clarity.
	
	- ##### Dynamic Text/Code: 
	  A monospace font where appropriate to reinforce the developer aspect.
	
- #### Global Effects:
	- ##### Animated Background: 
	  A low-opacity, heavily blurred, looping vaporwave/synthwave video (e.g., abstract landscape, moving planet) will provide a dynamic, atmospheric backdrop across the site. This will enhance the frosted glass effects.
	
	- ##### Fuzzy Blurs: 
	  Strategic application of advanced blur techniques (potentially CSS filters or SVG filters) to create a softer, more organic blur than standard backdrop-filter, enhancing depth and visual texture.


### 4. Key Section UX/UI Breakdown
#### 4.1. Hero Section (Initial Full-Screen State)

- ##### Layout: 
	Occupies 100% viewport height. Divided into two main vertical areas:
	
	- ###### Left (approx. 70% width): 
	  Main text area for introduction.
	  
	- ###### Right (approx. 30% width): 
	  Stacked call-to-action (CTA) buttons.
	
- ##### Background: 
	The looping vaporwave/synthwave video, heavily blurred (e.g., `backdrop-filter: blur(20px)` on foreground elements) and set at a low opacity to serve as an atmospheric, dynamic backdrop.
	
- ##### Foreground Elements (Text & Buttons): 
	These elements will have a distinct Frosted Glass effect:
	- Slightly translucent background using `rgba()` with a low alpha value (e.g., `rgba(0, 0, 0, 0.2)`).
	  
	- Prominent `backdrop-filter: blur(10px - 15px)` to create the frosted glass appearance, allowing the blurred background video to show through.
	
	- Subtle 1px border with a very low opacity white/light color, adding a slight sheen.
	
- ##### HeroText (`HeroText.js`):
	  
	- ###### Content:
		- H1: "Hello, my name is Andre" (prominent, strong typography)
		  
		- H2: "I am a " + cycling text (e.g., "Web Developer", "UI/UX Designer", "Linux Power User (I use Arch btw)").
		
	- ###### Animation: 
		The cycling text will use a smooth, short fade-out/fade-in or subtle slide transition (e.g., 0.5s duration) every ~7 seconds.
	
- ##### HeroCallToActions (`HeroCallToActions.js`):
	  
	- ###### Elements: 
	  Stacked buttons: "Work with me" (primary CTA, uses accent colors), "About Me", "Projects", "Connect With Me" (which will open a dropdown).
	  
	- ###### Styling: 
	  Buttons will have a slightly raised appearance, perhaps with a very subtle outer shadow or glow from the accent colors, to give them a tangible feel without being Neumorphic at this stage.


#### 4.2. Navbar (Dynamic Transformation from Hero)

- ##### Trigger: 
	Upon scrolling down, when the top of the viewport crosses a defined threshold (e.g., the bottom of the initial Hero section).
	
- ##### Transition (Framer Motion `layoutId`): 
	The elements from the Hero section (HeroText content, `HeroCallToActions` buttons) will smoothly morph into their Navbar counterparts.
	
	- ###### Andre's Name: 
	  The "Hello, my name is Andre" text will shrink and reposition to the left of the Navbar, displaying "Andre Emanuel" (or a simplified logo).
	
	- ###### Buttons: 
	  The stacked buttons will seamlessly slide horizontally and transform into the compact Navbar links, aligning to the right.
	  
- ##### State: 
	The Navbar will become `position: fixed` (sticky) at the top of the viewport.
	
- ##### Design: 
	Maintains the Frosted Glass effect (translucent background, heavy blur) with the Catppuccin Frappe dark palette.


#### 4.3. Project Showcase / Main Section

- ##### Layout: 
	A responsive grid or flexible layout optimized for various screen sizes, allowing project tiles to adjust dynamically.
	
- ##### ProjectTile (Inactive State):
	- Displays a compelling screenshot of the project.
	
	- Clean, minimalist design, possibly with a subtle border or inner shadow.
	
- ##### ProjectTile (Hover State):
	
	- ###### Animation: 
		A "bouncy" bezier curve animation (slight scale up, subtle skew/rotation) using Framer Motion's `whileHover`.
		
	- ###### Visual: 
		The tile's background will transition to a Frosted Glass effect, overlaying the screenshot with a blurred, translucent layer. A subtle accent-color glow (e.g., `#00ff99`) might emanate from the edges.
		
	- ###### Information Overlay: 
		Descriptive text (date, technologies used, industry sector) will smoothly fade in or slide up from the bottom of the tile, ensuring readability over the frosted background.
	
- ##### ProjectDetailsModal (Active/Expanded State on Click):
	
	- ###### Appearance: 
		A full-screen overlay or a large side-panel that slides in, centered or from the right.
		
	- ###### Design: 
		Predominantly Neumorphic elements. The modal background itself will have a soft, extruded, "inflated" appearance with subtle inner and outer shadows, providing a tactile contrast to the glassmorphism.
		
	- ###### Content:
		- ##### Image Gallery: 
			A carousel of high-resolution project screenshots.
			
		- ##### Detailed Description: 
			Comprehensive text about the project's goals, challenges, solutions, and outcomes.
			
		- ##### "Visit website" Button: 
			Prominently displayed, styled with accent colors, indicating it leads to an external site.
		
	- ###### Transition: 
		Smooth entry/exit animations (e.g., scale-up fade-in, slide-in from side) using Framer Motion.


#### 4.4. About Me Section

- ##### Layout: 
	Clean, organized text blocks.
	
- ##### Design: 
	Could utilize a simple, minimalist layout, potentially with subtle frosted glass sections or a distinct background color from the Catppuccin Frappe palette to differentiate it. Placeholder text will be used initially.


#### 4.5. Contact Page

- ##### Form Design: 
	Clean, modern input fields with subtle borders and clear focus states (e.g., border glows with accent colors on focus).
	
- ##### Submit Button: 
	Prominent, styled with accent colors (`#33ccff` or `#00ff99`), with engaging micro-interactions on hover/click (e.g., subtle press down, color shift).
	
- ##### Success/Error Messages: 
  Clearly styled messages for form submission status.


#### 4.6. Footer

- ##### Design: 
	Clean, unobtrusive design. Dark background from Catppuccin Frappe.
	
- ##### Content: 
	Sitemap links, copyright information, basic contact details, and social media icons (linking to Instagram, X, LinkedIn, GitHub). Icons will match the overall aesthetic (e.g., neon outlines, subtle glows).



### 5. Animations & Micro-interactions (Overall)

- #### Scroll Reveal: 
	Sections or key elements will animate into view (e.g., fade in from slightly below, subtle scale-up) as they enter the viewport using Intersection Observer.
	
- #### Button/Link Interactions:
	- Subtle "press down" effect on button clicks.
	
	- Glows, underlines, or color shifts on link hovers using accent colors.
	
	- Ripple effects on clicks where appropriate.
	
- #### Text Cycling: 
	Smooth, short transitions for the dynamic text in the Hero section.
	
- #### Page Transitions: 
	While a SPA, consider subtle cross-fade or slide animations when navigating between major routes (e.g., home to about, home to contact).


### 6. Responsive Design

- #### Breakpoints: 
	Standard breakpoints will be defined for mobile (up to 767px), tablet (768px - 1023px), and desktop (1024px+).
	
- #### Layout Adjustments:
	
	- ##### Hero Section: 
		On smaller screens, the text and button stack will likely reconfigure to a vertical layout. Font sizes will scale down. The transformation to Navbar will remain, but the initial state might be more compact.
		
	- ##### Navbar: 
		Will remain compact on mobile, potentially with a hamburger menu for navigation links.
		
	- ##### Project Showcase: 
		Grid layout will adapt, displaying fewer columns on smaller screens (e.g., 1 or 2 columns on mobile).
		
	- ##### Project Details Modal: 
		Will become full-screen overlays on mobile for optimal viewing.
	
- #### Font Sizes & Spacing: 
	Adjusted proportionally across breakpoints to maintain readability and aesthetic balance.