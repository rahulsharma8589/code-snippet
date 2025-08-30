// components/SnippetForm.jsx
import React, { useState } from 'react';

export default function SnippetForm({ onSubmit, initialData = {}, onCancel }) {
  const [title, setTitle] = useState(initialData.title || '');
  const [code, setCode] = useState(initialData.code || '');
  const [language, setLanguage] = useState(initialData.language || 'javascript');
  const [tags, setTags] = useState((initialData.tags || []).join(', '));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !code || !language) {
        alert('Please fill in all required fields: Title, Code, and Language.');
        return;
    }
    onSubmit({ 
        title, 
        code, 
        language, 
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag) // Filter out empty tags
    });
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-6">
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Title</label>
            <input
            id="title"
            type="text"
            placeholder="e.g., React Fetch Hook"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
            />
        </div>
        <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-300 mb-1">Code</label>
            <textarea
            id="code"
            placeholder="const [data, setData] = useState(null);"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 h-48 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
            />
        </div>
        <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-300 mb-1">Language</label>
            <input
            id="language"
            type="text"
            placeholder="e.g., javascript"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
            />
        </div>
        <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-1">Tags</label>
            <input
            id="tags"
            type="text"
            placeholder="react, hooks, fetch (comma-separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
        </div>
        <div className="flex space-x-4">
            <button type="submit" className="flex-1 py-2 bg-blue-600 rounded hover:bg-blue-700 font-semibold">
                Save Snippet
            </button>
            <button type="button" onClick={onCancel} className="flex-1 py-2 bg-gray-600 rounded hover:bg-gray-700 font-semibold">
                Cancel
            </button>
        </div>
        </form>
    </div>
  );
}
