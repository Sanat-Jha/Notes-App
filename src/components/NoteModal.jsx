import { useState } from 'react';
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';

const NoteModal = ({ isOpen, onClose, onCreateNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onCreateNote({ 
        title: title.trim(), 
        content: content.trim(),
        image: imagePreview 
      });
      setTitle('');
      setContent('');
      setImage(null);
      setImagePreview(null);
    }
  };

  const handleClose = () => {
    setTitle('');
    setContent('');
    setImage(null);
    setImagePreview(null);
    onClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Create New Note</h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Image Upload Section */}
          <div className="mb-6 pb-6 border-b border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Choose Image
            </label>
            <div className="flex flex-col items-center">
              {imagePreview ? (
                <div className="relative mb-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4 hover:border-blue-400 transition-colors">
                  <PhotoIcon className="w-8 h-8 text-gray-400" />
                </div>
              )}
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="image"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors cursor-pointer text-sm"
              >
                Choose Image
              </label>
            </div>
          </div>

          <div className="mb-4">
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-0 py-3 text-lg font-medium placeholder-gray-400 focus:outline-none border-0"
              placeholder="Note title..."
              required
            />
          </div>

          <div className="mb-6">
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="8"
              className="w-full px-0 py-2 placeholder-gray-400 focus:outline-none border-0 resize-none"
              placeholder="Start writing your note..."
              required
            />
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Create Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
