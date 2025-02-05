import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Results from "./Results";
import loadingMortyImg from "../assets/loading-morty.png"

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
    <div className="p-6 text-center">
      <h2 className="text-3xl font-bold text-green-400">Search Rick & Morty Episodes by Season</h2>
      <select
        value={season}
        onChange={(event) => setSeason(event.target.value)}
        className="mt-4 mb-10 p-2 bg-gray-200 text-gray-800 rounded-md text-lg "
      >
        <option value="S01">Season 1</option>
        <option value="S02">Season 2</option>
        <option value="S03">Season 3</option>
        <option value="S04">Season 4</option>
        <option value="S05">Season 5</option>
      </select>

      {loading &&
        <div>
          <img
            src={loadingMortyImg}
            alt="loadingMortyImg"
            className=
            "w-14 h-14 sm:w-16 sm:h-16 align-middle mx-auto rounded-full border border-green-400 animate-spin"
          />
          <p className="my-2">... loading ...</p>
        </div>
      }
      {error && <p>Error: {error.message}</p>}
      {data?.episodes?.results && <Results episodes={data.episodes.results} />}
    </div>
  );
};

export default Search;
