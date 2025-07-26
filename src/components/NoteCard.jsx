import { PlusIcon } from '@heroicons/react/24/outline';

const NoteCard = ({ note, isAddCard = false, onClick }) => {
  if (isAddCard) {
    return (
      <button
        onClick={onClick}
        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center aspect-[4/3] border-2 border-dashed border-gray-300 hover:border-blue-400"
      >
        <PlusIcon className="w-12 h-12 text-gray-400" />
      </button>
    );
  }

  return (
    <div
      onClick={onClick}
      className=" overflow-hidden transition-all duration-200 cursor-pointer"
    >
      <div className="aspect-[4/3] bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center relative">
        {note.image ? (
          <img
            src={note.image}
            alt={note.title}
            className="w-full h-full object-cover rounded-xl  "
          />
        ) : (
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
            <span className="text-3xl font-bold text-blue-500">
              {note.title.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 text-base leading-tight">
          {note.title}
        </h3>
      </div>
    </div>
  );
};

export default NoteCard;
