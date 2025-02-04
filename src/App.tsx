import React, { useState } from 'react';
import LanguageSearchForm from './components/LanguageSearchForm';
import CountryResultCard from './components/CountryResultCard';
import { searchCountriesByLanguage } from './services/countriesGraphQL';
import Country from './models/country';
import { COMMON_LANGUAGES } from './services/languageService';

const App: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const handleLanguageSearch = async (languageCode: string) => {
    setLoading(true);
    setError(null);
    setSelectedLanguage(languageCode);

    try {
      const searchResults = await searchCountriesByLanguage(languageCode);
      setCountries(searchResults);
    } catch (err) {
      setError('Failed to fetch countries. Please try again.');
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  const getLanguageName = (code: string) => {
    const language = COMMON_LANGUAGES.find(lang => lang.code === code);
    return language ? language.name : code;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Countries Language Explorer</h1>
      <LanguageSearchForm onSearch={handleLanguageSearch} />

      {loading && <p className="text-center">Loading countries...</p>}

      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && selectedLanguage && (
        <div>
          <h2 className="text-xl mb-4">
            Countries speaking {getLanguageName(selectedLanguage)}
          </h2>
          {countries.length === 0 ? (
            <p className="text-center">No countries found for this language.</p>
          ) : (
            countries.map(country => (
              <CountryResultCard key={country.code} country={country} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default App;
