import { Link } from "react-router-dom";

export default function CountryCard({ country }) {
  if (!country || !country.name) return null;

  const name = country.name.common || "Unknown";
  const population = country.population
    ? country.population.toLocaleString()
    : "N/A";
  const region = country.region || "N/A";
  const capital = country.capital?.[0] || "N/A";
  const flag = country.flags?.svg || "";
  const altText = `Flagga för ${name}`;

  return (
    <Link to={`/${name}`} className="country-card">
      <img src={flag} alt={altText} className="country-flag" />
      <div className="card-info">
        <h3>{name}</h3>
        <p>
          <strong>Population:</strong> {population}
        </p>
        <p>
          <strong>Region:</strong> {region}
        </p>
        <p>
          <strong>Capital:</strong> {capital}
        </p>
      </div>
    </Link>
  );
}