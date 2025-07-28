import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import CategoryModal from './components/CategoryModal';
import NoteModal from './components/NoteModal';
import NoteDetailModal from './components/NoteDetailModal';
import NotesGrid from './components/NotesGrid';
import NoteDetail from './components/NoteDetail';
import { loadFromLocalStorage, saveToLocalStorage, STORAGE_KEYS } from './utils/localStorage';

// Default data for first-time users
const defaultCategories = [
  { id: 1, name: 'Life' },
  { id: 2, name: 'School' },
  { id: 3, name: 'Friends' },
  { id: 4, name: 'Work' },
];

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedCategories = loadFromLocalStorage(STORAGE_KEYS.CATEGORIES, defaultCategories);
    const savedNotes = loadFromLocalStorage(STORAGE_KEYS.NOTES, []);
    const savedSelectedCategory = loadFromLocalStorage(STORAGE_KEYS.SELECTED_CATEGORY, savedCategories[3]?.id || savedCategories[0]?.id);

    setCategories(savedCategories);
    setNotes(savedNotes);
    setSelectedCategory(savedSelectedCategory);
    setIsLoading(false);
  }, []);

  // Save categories to localStorage whenever they change
  useEffect(() => {
    if (categories.length > 0 && !isLoading) {
      saveToLocalStorage(STORAGE_KEYS.CATEGORIES, categories);
    }
  }, [categories, isLoading]);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      saveToLocalStorage(STORAGE_KEYS.NOTES, notes);
    }
  }, [notes, isLoading]);

  // Save selected category to localStorage whenever it changes
  useEffect(() => {
    if (selectedCategory !== null && !isLoading) {
      saveToLocalStorage(STORAGE_KEYS.SELECTED_CATEGORY, selectedCategory);
    }
  }, [selectedCategory, isLoading]);

  const filteredNotes = notes.filter(note => note.categoryId === selectedCategory);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading your notes...</p>
        </div>
      </div>
    );
  }

  const handleAddCategory = (name) => {
    const newCategory = {
      id: Date.now(),
      name,
    };
    setCategories([...categories, newCategory]);
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note);
  };

  const handleCloseNoteDetail = () => {
    setSelectedNote(null);
  };

  const handleAddNote = () => {
    setIsNoteModalOpen(true);
  };

  const handleCreateNote = (noteData) => {
    const newNote = {
      id: Date.now(),
      title: noteData.title,
      content: noteData.content,
      categoryId: selectedCategory,
      image: noteData.image,
    };
    setNotes([...notes, newNote]);
    setIsNoteModalOpen(false);
  };

  const handleUpdateNote = (updatedNote) => {
    setNotes(notes.map(note => 
      note.id === updatedNote.id ? updatedNote : note
    ));
  };

  const handleDeleteNote = (noteId) => {
    setNotes(notes.filter(note => note.id !== noteId));
    setSelectedNote(null); // Close the modal after deletion
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        onAddCategory={() => setIsModalOpen(true)}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header with Hamburger */}
        <div className="lg:hidden bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800">Notes</h1>
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Notes Grid */}
            <NotesGrid
              notes={filteredNotes}
              onNoteClick={handleNoteClick}
              onAddNote={handleAddNote}
            />
          </div>
        </div>
      </div>

      {/* Category Modal */}
      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCategory={handleAddCategory}
      />

      {/* Note Modal */}
      <NoteModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        onCreateNote={handleCreateNote}
      />

      {/* Note Detail Modal */}
      <NoteDetailModal
        note={selectedNote}
        isOpen={!!selectedNote}
        onClose={handleCloseNoteDetail}
        onUpdateNote={handleUpdateNote}
        onDeleteNote={handleDeleteNote}
        categories={categories}
      />
    </div>
  );
}

export default App;
