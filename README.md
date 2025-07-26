# Notes Dashboard

A responsive and visually clean Notes Dashboard UI built with React and Tailwind CSS. The interface features a category sidebar, saved notes gallery, and detailed note views.

## Features

- **Category Management**: Navigate between different note categories (Life, School, Friends, Work)
- **Add Categories**: Dynamic category creation with modal interface
- **Notes Grid**: Responsive grid layout displaying saved notes with thumbnails
- **Note Details**: Detailed view with note content and actions
- **Responsive Design**: Mobile-first approach that works on all screen sizes
- **Clean UI**: Modern design with Tailwind CSS styling

## Tech Stack

- **React 18** - Frontend framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Heroicons** - Beautiful SVG icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── Sidebar.jsx          # Navigation panel with categories
│   ├── CategoryModal.jsx    # Modal for adding new categories
│   ├── NotesGrid.jsx        # Grid layout for notes
│   ├── NoteCard.jsx         # Individual note cards
│   └── NoteDetail.jsx       # Detailed note view
├── App.jsx                  # Main application component
├── index.css               # Tailwind CSS imports
└── main.jsx                # Application entry point
```

## Components

### Sidebar
- Displays note categories
- Highlights selected category
- Add category button with modal trigger

### CategoryModal
- Form for adding new categories
- Validation and state management
- Overlay with backdrop

### NotesGrid
- Responsive grid layout (1-3 columns based on screen size)
- Note cards with hover effects
- Add note placeholder card

### NoteCard
- Displays note thumbnail and title
- Supports both image and text-based avatars
- Click handlers for note selection

### NoteDetail
- Full note content display
- Action buttons for note management
- Support for both content and add-new states

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Customization

The app uses Tailwind CSS for styling. You can customize the design by:

1. Modifying the Tailwind configuration in `tailwind.config.js`
2. Adding custom CSS classes in `src/index.css`
3. Updating component styles using Tailwind utility classes

## Future Enhancements

- Note creation and editing functionality
- Local storage persistence
- Search and filtering capabilities
- Drag and drop for note organization
- Rich text editing support
