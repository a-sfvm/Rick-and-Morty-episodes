import React from 'react';
import Country  from '../models/country';

interface CountryResultCardProps {
  country: Country;
}

const CountryResultCard: React.FC<CountryResultCardProps> = ({ country }) => {
  return (
    <div className="border p-4 rounded mb-2 flex items-center">
      <div className="text-4xl mr-4">{country.emoji}</div>
      <div>
        <h3 className="font-bold text-xl">
          {country.name} ({country.native})
        </h3>
        <p>
          <strong>Capital:</strong> {country.capital || 'N/A'}
        </p>
        <p>
          <strong>Continent:</strong> {country.continent.name}
        </p>
        <div>
          <strong>Languages:</strong>
          <ul className="list-disc list-inside">
            {country.languages.map((lang) => (
              <li key={lang.code}>
                {lang.name} ({lang.native})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CountryResultCard;
