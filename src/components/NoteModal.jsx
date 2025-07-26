import { useState, useEffect } from 'react';
import { PhotoIcon } from '@heroicons/react/24/outline';

const NoteModal = ({ isOpen, onClose, onCreateNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

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
    <div 
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4"
      onClick={handleClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Content */}
        <form onSubmit={handleSubmit} className="p-0">
          {/* Image Upload Section */}
          <div className="relative rounded-5xl">
            {imagePreview ? (
              <div className="relative h-64 bg-gray-200">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImage(null);
                    setImagePreview(null);
                  }}
                  className="absolute top-4 right-4 w-8 h-8 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all"
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="h-64 bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors">
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label
                  htmlFor="image"
                  className="flex items-center justify-center w-full h-full cursor-pointer"
                >
                  <div className="w-12 h-12 text-gray-500">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                      <path d="M12 4.5C7.5 4.5 4.5 7.5 4.5 12s3 7.5 7.5 7.5 7.5-3 7.5-7.5-3-7.5-7.5-7.5zm3.5 8.5H13v3h-2v-3H8.5v-2H11V8h2v3h2.5v2z"/>
                    </svg>
                  </div>
                </label>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-6">
            {/* Title Section */}
            <div className="mb-6">
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-gray-700 placeholder-gray-400 focus:outline-none border-0 p-0 text-base"
                placeholder="Enter your note title..."
                required
              />
            </div>

            {/* Content Section */}
            <div className="mb-8">
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="6"
                className="w-full text-gray-700 placeholder-gray-400 focus:outline-none border-0 p-0 resize-none text-base leading-relaxed"
                placeholder="Write your note content here..."
                required
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
