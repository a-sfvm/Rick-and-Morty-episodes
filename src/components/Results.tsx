import React from "react";

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
  return (
    <ul>
      {episodes.map((episode) => (
        <li key={episode.id} style={{ marginBottom: "20px" }}>
          <h3>Episode {episode.episode.substring(4)} - {episode.name}</h3>
          <p><strong>Air Date:</strong> {episode.air_date}</p>
          <h4>Characters:</h4>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {episode.characters.map((character) => (
              <div key={character.id}>
                <img src={character.image} alt={character.name} width={50} height={50} />
                <p>{character.name}</p>
              </div>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Results;
