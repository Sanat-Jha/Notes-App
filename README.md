# 📝 Notes Dashboard

A modern, responsive Notes Dashboard application built with React and Tailwind CSS. Create, organize, and manage your notes with a beautiful, intuitive interface that works seamlessly across all devices.


## ✨ Features

### 🗂️ **Category Management**
- Navigate between different note categories (Life, School, Friends, Work)
- Create custom categories with an intuitive modal interface
- Visual category selection with active state highlighting

### 📄 **Complete Note Management**
- **Create Notes**: Add new notes with titles, content, and images
- **View Notes**: Detailed note view with full content display
- **Edit Notes**: In-place editing with real-time preview
- **Delete Notes**: Safe deletion with confirmation dialog
- **Image Support**: Upload and display images with notes

### 📱 **Responsive Design**
- **Mobile-First**: Optimized for mobile devices with hamburger navigation
- **Desktop Ready**: Full sidebar experience on larger screens
- **Touch Friendly**: Large tap targets and smooth animations
- **Cross-Device**: Consistent experience across all screen sizes

### 🎨 **Modern UI/UX**
- Clean, minimalist design with Tailwind CSS
- Smooth animations and hover effects
- Modal overlays with backdrop blur
- Professional color scheme and typography
- Accessible keyboard navigation

### 🖼️ **Image Features**
- Drag-and-drop image upload
- Image preview before saving
- Responsive image display in note cards
- Image editing in note edit mode
- Fallback avatars with note initials

## 🚀 Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | Frontend Framework | 18.x |
| **Vite** | Build Tool & Dev Server | 7.x |
| **Tailwind CSS** | Styling Framework | 3.x |
| **Heroicons** | Icon Library | 2.x |
| **JavaScript ES6+** | Programming Language | Latest |

## 🏗️ Project Architecture

```
src/
├── components/
│   ├── Sidebar.jsx              # Responsive navigation sidebar
│   ├── CategoryModal.jsx        # Category creation modal
│   ├── NoteModal.jsx           # Note creation modal
│   ├── NoteDetailModal.jsx     # Note viewing/editing modal
│   ├── NotesGrid.jsx           # Responsive notes grid layout
│   └── NoteCard.jsx            # Individual note card component
├── App.jsx                     # Main application component
├── index.css                   # Tailwind CSS imports & custom styles
└── main.jsx                    # Application entry point
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd notes-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:5173
   ```

## 📱 Component Documentation

### 🔧 Sidebar Component
**Features:**
- Responsive design with mobile hamburger menu
- Category navigation with active states
- Add category functionality
- Smooth slide animations on mobile

**Props:**
- `categories` - Array of category objects
- `selectedCategory` - Currently selected category ID
- `onCategorySelect` - Category selection handler
- `onAddCategory` - Add category handler
- `isMobileOpen` - Mobile sidebar state
- `onMobileClose` - Mobile close handler

### 📝 NoteModal Component
**Features:**
- Clean, borderless form design
- Image upload with preview
- Real-time validation
- Keyboard shortcuts (Escape to close)

**Props:**
- `isOpen` - Modal visibility state
- `onClose` - Close handler
- `onCreateNote` - Note creation handler

### 👁️ NoteDetailModal Component
**Features:**
- Full note content display
- In-place editing mode
- Image management (add/edit/remove)
- Delete confirmation dialog
- Keyboard navigation support

**Props:**
- `note` - Note object to display
- `isOpen` - Modal visibility state
- `onClose` - Close handler
- `onUpdateNote` - Note update handler
- `onDeleteNote` - Note deletion handler
- `categories` - Categories for display

### 🃏 NoteCard Component
**Features:**
- 4:3 aspect ratio for optimal display
- Image support with fallback avatars
- Hover effects and animations
- Add note card variant

**Props:**
- `note` - Note object to display
- `isAddCard` - Boolean for add card variant
- `onClick` - Click handler

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#3B82F6` - Actions and highlights
- **Background**: `#F9FAFB` - Main app background
- **Cards**: `#FFFFFF` - Note cards and modals
- **Text Primary**: `#111827` - Main text content
- **Text Secondary**: `#6B7280` - Supporting text

### Typography
- **Headers**: `font-bold` with appropriate sizing
- **Body**: `font-medium` for readability
- **UI Elements**: `font-semibold` for emphasis

### Spacing & Layout
- **Grid**: Responsive 1-3 column layout
- **Cards**: `aspect-[4/3]` ratio for consistency
- **Padding**: Consistent 1rem increments
- **Margins**: Logical spacing hierarchy

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |

## 🔧 Configuration

### Tailwind CSS
The project uses a custom Tailwind configuration:
```javascript
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      aspectRatio: {
        '4/3': '4 / 3',
      }
    },
  },
  plugins: [],
}
```

### Vite Configuration
Optimized for React development:
```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

## 📱 Responsive Breakpoints

| Breakpoint | Screen Size | Layout |
|------------|-------------|---------|
| `sm` | ≥ 640px | 2 column grid |
| `lg` | ≥ 1024px | 3 column grid + sidebar |
| `xl` | ≥ 1280px | Optimized spacing |

## 🎯 User Experience Features

### ⌨️ Keyboard Shortcuts
- **Escape**: Close modals and cancel actions
- **Enter**: Submit forms (when focused)
- **Tab**: Navigate through interactive elements

### 📱 Mobile Optimizations
- Touch-friendly button sizes (minimum 44px)
- Swipe-friendly card interactions
- Optimized modal sizes for mobile screens
- Hamburger navigation for space efficiency

### 🎨 Animations & Transitions
- Smooth modal slide-ins (300ms)
- Hover effects on interactive elements
- Loading states and feedback
- Micro-interactions for better UX

## 🔮 Future Enhancements

### Planned Features
- [ ] **Data Persistence**: Local storage or database integration
- [ ] **Search & Filter**: Find notes quickly
- [ ] **Rich Text Editor**: Advanced formatting options
- [ ] **Drag & Drop**: Reorganize notes and categories
- [ ] **Export**: PDF or markdown export
- [ ] **Themes**: Dark mode and custom themes
- [ ] **Collaboration**: Share and collaborate on notes
- [ ] **Offline Support**: PWA capabilities

### Performance Optimizations
- [ ] Image lazy loading
- [ ] Virtual scrolling for large note collections
- [ ] Component code splitting
- [ ] Service worker caching

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Add comments for complex logic
- Test on multiple screen sizes
- Ensure accessibility compliance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - The web framework used
- [Tailwind CSS](https://tailwindcss.com/) - For the amazing utility-first CSS framework
- [Heroicons](https://heroicons.com/) - For the beautiful icon set
- [Vite](https://vitejs.dev/) - For the lightning-fast build tool

---

<div align="center">

**Built with ❤️ using React and Tailwind CSS**

[Demo](your-demo-link) • [Documentation](your-docs-link) • [Report Bug](your-issues-link) • [Request Feature](your-issues-link)

</div>
