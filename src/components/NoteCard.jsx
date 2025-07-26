import { PlusIcon } from '@heroicons/react/24/outline';

const NoteCard = ({ note, isAddCard = false, onClick }) => {
  if (isAddCard) {
    return (
      <button
        onClick={onClick}
        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 flex items-center justify-center min-h-[200px] border-2 border-dashed border-gray-300 hover:border-blue-400"
      >
        <PlusIcon className="w-12 h-12 text-gray-400" />
      </button>
    );
  }

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer"
    >
      <div className="aspect-square bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center relative">
        {note.image ? (
          <img
            src={note.image}
            alt={note.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-blue-500">
              {note.title.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">
          {note.title}
        </h3>
      </div>
    </div>
  );
};

export default NoteCard;
