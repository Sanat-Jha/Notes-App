import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

const Sidebar = ({ categories, selectedCategory, onCategorySelect, onAddCategory }) => {
  return (
    <div className="w-64 bg-white h-full p-6 border-r border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Notes</h1>
      
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
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
  );
};

export default Sidebar;
