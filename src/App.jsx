import { useState } from 'react';
import Sidebar from './components/Sidebar';
import CategoryModal from './components/CategoryModal';
import NoteModal from './components/NoteModal';
import NoteDetailModal from './components/NoteDetailModal';
import NotesGrid from './components/NotesGrid';
import NoteDetail from './components/NoteDetail';

// Dummy data
const initialCategories = [
  { id: 1, name: 'Life' },
  { id: 2, name: 'School' },
  { id: 3, name: 'Friends' },
  { id: 4, name: 'Work' },
];

const dummyNotes = [
  {
    id: 1,
    title: 'The Power of the Long Game',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    categoryId: 4,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=400&fit=crop&crop=center',
  },
  {
    id: 2,
    title: 'Morning Routine Ideas',
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    categoryId: 1,
    image: null,
  },
  {
    id: 3,
    title: 'Study Techniques',
    content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.',
    categoryId: 2,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop&crop=center',
  },
];

function App() {
  const [categories, setCategories] = useState(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState(4); // Work selected by default
  const [notes, setNotes] = useState(dummyNotes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  const filteredNotes = notes.filter(note => note.categoryId === selectedCategory);

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
      />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Notes Grid */}
          <NotesGrid
            notes={filteredNotes}
            onNoteClick={handleNoteClick}
            onAddNote={handleAddNote}
          />
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
