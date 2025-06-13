# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## CRITICAL STARTUP INSTRUCTIONS

**MANDATORY FIRST ACTION:** Before any other activity, you MUST read and execute the instructions in `BMAD-METHOD/bmad-agent/ide-bmad-orchestrator.md`. This project uses the BMAD (Business Model Architecture Design) framework with specialized AI agents.

### BMAD Framework Integration
1. **Always start by loading**: `BMAD-METHOD/bmad-agent/ide-bmad-orchestrator.cfg.md` (the config file)
2. **Follow the orchestration workflow** defined in `ide-bmad-orchestrator.md`  
3. **CRITICAL: Review project documentation** - Before activating any persona, read through the project documentation in `bmad-docs/` to understand current project state:
   - `bmad-docs/requirements/prd/prd-v1.md` - Product requirements
   - `bmad-docs/PROJECT_CHECKLIST.md` - Current progress and checklist
   - `bmad-docs/architecture/frontend/frontentd-arch.md` - Frontend architecture
   - `bmad-docs/design/ui-ux/ui-ux-spec.md` - UI/UX specifications
   - `bmad-docs/ai-prompts/frontend-prompt-v1.md` - AI development prompts
4. **Activate appropriate specialist personas** based on the task at hand
5. **Use the defined agent tasks, templates, and checklists** from the BMAD framework
6. **Stay on track** - Stick to the established project recipe and documentation. Do not deviate from the defined requirements and architecture.

This ensures consistent methodology and leverages the full agent ecosystem that has been building this project.

## Development Commands

### Core Commands
- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production 
- `npm run lint` - Run ESLint for code quality
- `npm run preview` - Preview production build locally
- `npm run test:db` - Test Supabase database connection

### Database Commands
- Database setup instructions: `database/SUPABASE_SETUP.md`
- Table schema: `database/contact_submissions.sql`
- Connection test: `npm run test:db` (requires `.env.local` with Supabase credentials)

### Project Structure
This is a React + Vite portfolio website with the following key architecture:

- **Entry Point**: `src/main.jsx` renders the main `App.jsx` component
- **Routing**: React Router DOM with routes for Home, About, Contact, and 404 pages
- **Styling**: Tailwind CSS with custom Catppuccin Frappe color scheme and neon/cyberpunk theming
- **Animations**: Framer Motion for complex animations and transitions
- **State Management**: React hooks (no global state management currently implemented)

## Key Components & Architecture

### Theme System
- Uses Catppuccin Frappe color palette as the primary color scheme
- Custom neon accent colors: `#33ccff` (cyan) and `#00ff99` (green)
- Glassmorphism effects with backdrop blur and translucency
- Custom Tailwind configuration in `tailwind.config.js` with extended color palette, animations, and utilities

### Hero Section (`src/components/HeroSection.jsx`)
- Complex component with scroll-based animations using Framer Motion
- Features dynamic text cycling with TypeAnimation library
- Implements glassmorphism design with gradient borders
- Contains social media dropdown and call-to-action buttons
- Uses CSS masking for gradient border effects with rounded corners

### Layout & Navigation
- `App.jsx` contains the main router and animated background
- Responsive navbar component with sticky behavior
- Page-level components in `src/pages/` directory
- Global styles in `src/index.css` with CSS custom properties

### Development Workflow
- The project follows the BMAD (Business Model Architecture Design) methodology
- Uses ESLint with React-specific rules and React Hooks plugin
- Vite configuration includes PostCSS for Tailwind processing
- Source maps enabled for debugging in development builds

### Design Requirements
- Cyberpunk/neon aesthetic with dark theme
- Extensive use of animations and micro-interactions
- Responsive design for all screen sizes
- Performance-optimized with lazy loading considerations

## Important Files
- `bmad-docs/PROJECT_CHECKLIST.md` - Comprehensive development checklist and progress tracking
- `bmad-docs/stories/` - BMAD story files for development tracking
- `DEVLOG.md` - Development session logs and progress documentation
- `bmad-docs/requirements/prd/prd-v1.md` - Complete product requirements document
- `src/data/projects.js` - Project showcase data structure

## BMAD Story Management
- **Story Files Location**: All story files are organized in `bmad-docs/stories/` directory
- **Story Naming Convention**: `{EpicNum}.{StoryNum}.story.md` (e.g., `2.1.story.md`)
- **Story Templates**: Use templates from `BMAD-METHOD/bmad-agent/templates/story-tmpl.md`
- **Story DoD Checklist**: Located at `BMAD-METHOD/bmad-agent/checklists/story-dod-checklist.md`

## Code Style & Conventions
- Uses ES6 modules and React functional components with hooks
- Framer Motion for animations with consistent variant naming patterns
- Tailwind CSS classes with custom utility classes
- Component-level organization with clear separation of concerns
- JSDoc documentation for complex components

## Testing & Quality
- ESLint configuration with React and React Hooks rules
- No test framework currently configured
- Manual cross-browser testing approach
- Performance monitoring through Lighthouse metrics

## Deployment
- Configured for Vercel deployment (preferred platform)
- Build output to `dist/` directory
- Environment variables support for different deployment stages