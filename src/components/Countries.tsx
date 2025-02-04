import CountryItem from "./CountryItem";

const Countries = () => {
  const countriesResults = [
    { name: 'Portugal', language: 'Portuguese' },
    { name: 'Spain', language: 'Spanish' },
    { name: 'France', language: 'French' }
  ]

  return (
    <ul>
      {countriesResults.map((item) => (
        <CountryItem name={item.name} language={item.language}/>
      ))}
    </ul>
  );
};

export default Countries;
