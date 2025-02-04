import { GraphQLClient } from 'graphql-request';

import Country from '../models/country';

export const countriesClient = new GraphQLClient('https://countries.trevorblades.com/graphql');

export const LANGUAGE_SEARCH_QUERY = `
  query SearchCountriesByLanguage($code: String!) {
    countries(filter: { OR: [
      { languages: { code: { regex: $code, options: "i" } } },
      { languages: { name: { regex: $code, options: "i" } } }
    ]}) {
      code
      name
      native
      capital
      continent {
        name
      }
      languages {
        code
        name
        native
      }
      emoji
    }
  }
`;

interface CountriesResponse {
  countries: Array<Country>;
}

export async function searchCountriesByLanguage(searchTerm: string): Promise<Country[]> {
  try {
    const isLanguageCode = /^[a-zA-Z]{2,3}$/.test(searchTerm);

    const searchRegex = isLanguageCode ? `^${searchTerm}$` : searchTerm;

    const variables = { code: searchRegex };
    const data = await countriesClient.request<CountriesResponse>(LANGUAGE_SEARCH_QUERY, variables);
    return data.countries;
  } catch (error) {
    console.error('Countries Search Error:', error);
    throw error;
  }
}
