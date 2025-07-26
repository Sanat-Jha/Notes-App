import { PlusIcon } from '@heroicons/react/24/outline';

const NoteDetail = ({ note, isAddCard = false, onAddNote }) => {
  if (isAddCard) {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="aspect-video bg-gray-200 flex items-center justify-center">
          <button
            onClick={onAddNote}
            className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors"
          >
            <PlusIcon className="w-8 h-8 text-gray-600" />
          </button>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Add New Note</h3>
          <p className="text-gray-600 mb-4">Click to create a new note</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
        {note.image ? (
          <img
            src={note.image}
            alt={note.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
            <span className="text-3xl font-bold text-blue-500">
              {note.title.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          {note.title}
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {note.content}
        </p>
        <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          Add
        </button>
      </div>
    </div>
  );
};

export default NoteDetail;
