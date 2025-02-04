import React, { useState, FormEvent } from 'react';
import { COMMON_LANGUAGES } from '../services/languageService';

interface LanguageSearchFormProps {
  onSearch: (searchTerm: string) => void;
}

const LanguageSearchForm: React.FC<LanguageSearchFormProps> = ({ onSearch }) => {
  const [searchMethod, setSearchMethod] = useState<'dropdown' | 'text'>('dropdown');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [searchText, setSearchText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const searchTerm = searchMethod === 'dropdown' ? selectedLanguage : searchText;

    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="mb-6">
      <div className="mb-4">
        <label className="inline-flex items-center mr-4">
          <input
            type="radio"
            className="form-radio"
            checked={searchMethod === 'dropdown'}
            onChange={() => setSearchMethod('dropdown')}
          />
          <span className="ml-2">Choose from common languages</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio"
            checked={searchMethod === 'text'}
            onChange={() => setSearchMethod('text')}
          />
          <span className="ml-2">Search for a language</span>
        </label>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        {searchMethod === 'dropdown' ? (
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="flex-grow p-2 border rounded"
          >
            <option value="">Select a Language</option>
            {COMMON_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Type a language name (e.g., Danish, Malayalam)..."
            className="flex-grow p-2 border rounded"
          />
        )}

        <button
          type="submit"
          disabled={searchMethod === 'dropdown' ? !selectedLanguage : !searchText.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default LanguageSearchForm;
