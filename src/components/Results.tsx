import React from "react";
import { useState } from "react";

interface Character {
  id: string;
  name: string;
  image: string;
}

interface Episode {
  id: string;
  name: string;
  air_date: string;
  episode: string;
  characters: Character[];
}

interface ResultsProps {
  episodes: Episode[];
}



const Results: React.FC<ResultsProps> = ({ episodes }) => {
  const [hoveredChars, setHoveredChars] = useState<{ [key: string]: string | null }>({});
  const excludedNames = ["Rick Sanchez", "Morty Smith", "Beth Smith", "Jerry Smith", "Summer Smith"];

  const handleMouseEnter = (episodeId: string, charId: string) => {
    setHoveredChars((prev) => ({ ...prev, [episodeId]: charId }));
  };

  const handleMouseLeave = (episodeId: string) => {
    setHoveredChars((prev) => ({ ...prev, [episodeId]: null }));
  };

  return (
    <div className="mx-auto mt-6 px-4 sm:px-6 lg:px-8">
      <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {episodes.map((episode: any) => (
          <li
            key={episode.id}
            className="border-4 border-green-400 text-gray-800 p-4 rounded-lg shadow-lg"
          >
            <h3 className="text-lg font-semibold">"{episode.name}"</h3>
            <p className="text-sm text-gray-400">{episode.air_date}</p>
            <p className="text-sm text-gray-500">{episode.episode}</p>
            <div className="mt-4 mb-6 flex items-center place-content-center gap-2">
              {episode.characters
                .filter((char: any) => !excludedNames.includes(char.name))
                .slice(0, 6)
                .map((char: any) => (
                  <div key={char.id} className="w-14 h-14 sm:w-16 sm:h-16">
                    <img
                      src={char.image}
                      alt={char.name}
                      className="w-100 h-100 rounded-full border border-gray-600"
                      onMouseEnter={() => handleMouseEnter(episode.id, char.id)}
                      onMouseLeave={() => handleMouseLeave(episode.id)}
                    />
                  </div>
                ))}
            </div>
            <p className="text-sm text-center mt-2">
              {hoveredChars[episode.id] ? (
                <span className="text-green-300">
                  {episode.characters.find((char: any) => char.id === hoveredChars[episode.id])?.name}
                </span>
              ) : (
                <span className="text-gray-500">special character</span>
              )}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
