const CountryItem: React.FC<{ name: string; language: string }> = (props) => {
  return (
    <li>
      <h3>{props.name}</h3>
      <p>{props.language}</p>
    </li>
  );
};

export default CountryItem;
