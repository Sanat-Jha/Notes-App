<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Notes Dashboard Project Instructions

This is a React application built with Vite and Tailwind CSS for managing notes with categories. The project follows a component-based architecture with the following structure:

## Component Structure:
- `Sidebar.jsx` - Navigation panel with categories and add category button
- `CategoryModal.jsx` - Modal for adding new categories
- `NotesGrid.jsx` - Grid layout displaying saved notes
- `NoteCard.jsx` - Individual note cards with title and image/avatar
- `NoteDetail.jsx` - Detailed note view with content and actions

## Design System:
- Use Tailwind CSS utility classes for all styling
- Color scheme: Blue primary (#3B82F6), gray backgrounds (#F9FAFB)
- Responsive design: Mobile-first approach with proper breakpoints
- Icons: Use Heroicons React library

## Code Conventions:
- Use functional components with React hooks
- Props should be destructured in component parameters
- Use modern JavaScript features (const/let, arrow functions, template literals)
- Follow React best practices for state management and event handling
- Maintain consistent spacing and indentation

## State Management:
- Use useState for local component state
- Pass state and handlers through props
- Keep state as close to usage as possible

## Styling Guidelines:
- Use semantic class names and proper component structure
- Implement hover and focus states for interactive elements
- Ensure accessibility with proper ARIA labels and keyboard navigation
- Maintain consistent spacing using Tailwind spacing utilities
