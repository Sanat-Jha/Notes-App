import NoteCard from './NoteCard';

const NotesGrid = ({ notes, onNoteClick, onAddNote }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Saved Notes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onClick={() => onNoteClick(note)}
          />
        ))}
        <NoteCard
          isAddCard={true}
          onClick={onAddNote}
        />
      </div>
    </div>
  );
};

export default NotesGrid;
