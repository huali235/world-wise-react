import styles from "./CountryList.module.css";
import Spinner from "../Spinner/Spinner";
import CountryItem from "../CountryItem/CountryItem";
import Message from "../Message/Message";

function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map " />
    );

  const countries = Object.values(
    cities
      .map((city) => ({ country: city.country, emoji: city.emoji }))
      .reduce((acc, cur) => {
        acc[cur.country] = cur;
        return acc;
      }, {})
  );

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.emoji} />
      ))}
    </ul>
  );
}

export default CountryList;
