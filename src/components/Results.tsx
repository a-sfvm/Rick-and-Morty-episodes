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
  const [isHovered, setIsHovered] = useState(false);

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
            <div className="mt-4 flex items-center gap-2">
              {episode.characters.slice(4, 10).map((char: any) => (
                <div key={char.id} className="w-14 h-14 sm:w-16 sm:h-16">
                  <img
                    src={char.image}
                    alt={char.name}
                    className="w-100 h-100 rounded-full border border-gray-600"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  />
                  <p className={isHovered ? "text-green-300" : ""}>
                    {isHovered ? char.name : ""}
                  </p>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;
