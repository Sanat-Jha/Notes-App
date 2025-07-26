import { useEffect, useState } from 'react';
import { XMarkIcon, PhotoIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const NoteDetailModal = ({ note, isOpen, onClose, onUpdateNote, onDeleteNote, categories }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editImage, setEditImage] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);
  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (showDeleteConfirm) {
          handleCancelDelete();
        } else if (isEditing) {
          handleCancelEdit();
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isEditing, showDeleteConfirm, onClose]);

  // Initialize edit values when note changes or editing starts
  useEffect(() => {
    if (note && isEditing) {
      setEditTitle(note.title);
      setEditContent(note.content);
      setEditImagePreview(note.image);
      setEditImage(null);
    }
  }, [note, isEditing]);

  // Reset states when modal closes or note changes
  useEffect(() => {
    if (!isOpen || !note) {
      setIsEditing(false);
      setShowDeleteConfirm(false);
      setEditTitle('');
      setEditContent('');
      setEditImage(null);
      setEditImagePreview(null);
    }
  }, [isOpen, note]);

  const handleStartEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTitle('');
    setEditContent('');
    setEditImage(null);
    setEditImagePreview(null);
  };

  const handleSaveEdit = () => {
    if (editTitle.trim() && editContent.trim()) {
      const updatedNote = {
        ...note,
        title: editTitle.trim(),
        content: editContent.trim(),
        image: editImagePreview
      };
      onUpdateNote(updatedNote);
      setIsEditing(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setEditImage(null);
    setEditImagePreview(null);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDeleteNote(note.id);
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  if (!isOpen || !note) return null;

  // Find the category name for this note
  const category = categories.find(cat => cat.id === note.categoryId);
  const categoryName = category ? category.name : 'Unknown';

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={isEditing || showDeleteConfirm ? undefined : onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              {categoryName}
            </span>
            {isEditing && (
              <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full flex items-center space-x-1">
                <PencilIcon className="w-3 h-3" />
                <span>Editing</span>
              </span>
            )}
          </div>
          <button
            onClick={isEditing ? handleCancelEdit : onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {isEditing ? (
            /* Edit Mode */
            <div className="space-y-6">
              {/* Image Upload Section */}
              <div className="pb-6 border-b border-gray-100">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Image
                </label>
                <div className="flex flex-col items-start">
                  {editImagePreview ? (
                    <div className="relative mb-4">
                      <img
                        src={editImagePreview}
                        alt="Preview"
                        className="w-40 h-32 object-cover rounded-lg shadow-md"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="w-40 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4 hover:border-blue-400 transition-colors">
                      <PhotoIcon className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  <input
                    type="file"
                    id="edit-image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="edit-image"
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors cursor-pointer text-sm"
                  >
                    {editImagePreview ? 'Change Image' : 'Add Image'}
                  </label>
                </div>
              </div>

              {/* Title Input */}
              <div>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full text-2xl font-bold text-gray-900 border-0 focus:outline-none focus:ring-0 p-0"
                  placeholder="Note title..."
                />
              </div>

              {/* Content Input */}
              <div>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows="10"
                  className="w-full text-gray-700 leading-relaxed border-0 focus:outline-none focus:ring-0 p-0 resize-none"
                  placeholder="Write your note content..."
                />
              </div>
            </div>
          ) : (
            /* View Mode */
            <div>
              {/* Image */}
              {note.image && (
                <div className="mb-6">
                  <img
                    src={note.image}
                    alt={note.title}
                    className="w-full max-h-80 object-cover rounded-lg shadow-md"
                  />
                </div>
              )}

              {/* Title */}
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {note.title}
              </h1>

              {/* Content */}
              <div className="prose prose-gray max-w-none">
                <div className="text-gray-700 leading-relaxed text-base">
                  {note.content.split('\n').map((paragraph, index) => (
                    <p key={index} className={index > 0 ? 'mt-4' : ''}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Metadata */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Note ID: {note.id}</span>
                  <span>Category: {categoryName}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-between">
            {/* Delete Button (left side) */}
            <button
              onClick={handleDeleteClick}
              className="px-4 py-2 text-red-600 bg-white border border-red-300 rounded-md hover:bg-red-50 transition-colors flex items-center space-x-2"
              disabled={isEditing}
            >
              <TrashIcon className="w-4 h-4" />
              <span>Delete</span>
            </button>

            {/* Main Actions (right side) */}
            <div className="flex space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    disabled={!editTitle.trim() || !editContent.trim()}
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleStartEdit}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center space-x-2"
                  >
                    <PencilIcon className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Delete Confirmation Dialog */}
        {showDeleteConfirm && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-xl">
            <div className="bg-white rounded-lg shadow-xl p-6 mx-4 max-w-sm w-full">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                <TrashIcon className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                Delete Note
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to delete "{note.title}"? This action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={handleCancelDelete}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteDetailModal;
