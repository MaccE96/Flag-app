import { Link } from "react-router-dom";

export default function CountryCard({ name, capital, flag }) {
  return (
    <Link to={`/${name}`} className="country-card">
      <img src={flag} alt={`Flagga för ${name}`} />
      <div className="card-info">
        <h3>{name}</h3>
        <p>Huvudstad: {capital}</p>
      </div>
    </Link>
  );
}
