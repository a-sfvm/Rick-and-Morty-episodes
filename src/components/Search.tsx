import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Results from "./Results";

const GET_EPISODES = gql`
  query GetEpisodes($season: String!) {
    episodes(filter: { episode: $season }) {
      results {
        id
        name
        air_date
        episode
        characters {
          id
          name
          image
        }
      }
    }
  }
`;

const Search: React.FC = () => {
  const [season, setSeason] = useState<string>("S01");

  const { data, loading, error } = useQuery(GET_EPISODES, {
    variables: { season },
  });

  return (
    <div>
      <h2>Search Rick & Morty Episodes by Season</h2>
      <select value={season} onChange={(e) => setSeason(e.target.value)}>
        <option value="S01">Season 1</option>
        <option value="S02">Season 2</option>
        <option value="S03">Season 3</option>
        <option value="S04">Season 4</option>
        <option value="S05">Season 5</option>
      </select>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data?.episodes?.results && <Results episodes={data.episodes.results} />}
    </div>
  );
};

export default Search;
