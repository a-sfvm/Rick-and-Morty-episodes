export default interface Country {
  code: string;
  name: string;
  native: string;
  capital: string | null;
  continent: {
    name: string;
  };
  languages: Array<{
    code: string;
    name: string;
    native: string;
  }>;
  emoji: string;
}
