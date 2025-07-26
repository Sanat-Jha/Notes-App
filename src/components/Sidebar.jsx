import { useState, useEffect } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

const Sidebar = ({ categories, selectedCategory, onCategorySelect, onAddCategory, isMobileOpen, onMobileClose }) => {
  // Handle escape key for mobile
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobileOpen) {
        onMobileClose();
      }
    };

    if (isMobileOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileOpen, onMobileClose]);

  const handleCategorySelect = (categoryId) => {
    onCategorySelect(categoryId);
    // Close mobile sidebar when category is selected
    if (isMobileOpen) {
      onMobileClose();
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 bg-white h-screen p-6 border-r border-gray-200 sticky top-0">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Notes</h1>
        
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                selectedCategory === category.id
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <button
          onClick={onAddCategory}
          className="mt-6 mx-auto w-50 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
        >
          <PlusIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-40"
            onClick={onMobileClose}
          />
          
          {/* Sidebar */}
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="p-6">
              {/* Header with close button */}
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Notes</h1>
                <button
                  onClick={onMobileClose}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <XMarkIcon className="w-6 h-6 text-gray-600" />
                </button>
              </div>
              
              {/* Categories */}
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              
              {/* Add Category Button */}
              <button
                onClick={() => {
                  onAddCategory();
                  onMobileClose();
                }}
                className="mt-6 mx-auto w-50 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
              >
                <PlusIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
