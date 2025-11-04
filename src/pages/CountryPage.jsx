import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../components/Loader";

export default function CountryPage() {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🗺️ Hämtar det valda landet
  useEffect(() => {
    async function fetchCountry() {
      try {
        setError(null);
        setLoading(true);

        const res = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
        if (!res.ok) throw new Error(`Fel vid API-anrop: ${res.status}`);

        const data = await res.json();
        const countryData = data[0];
        setCountry(countryData);

        // 🧭 Om landet har gränser, hämta dem
        if (countryData.borders && countryData.borders.length > 0) {
          const borders = await fetch(
            `https://restcountries.com/v3.1/alpha?codes=${countryData.borders.join(",")}`
          );
          const bordersData = await borders.json();
          setBorderCountries(bordersData);
        } else {
          setBorderCountries([]);
        }

      } catch (err) {
        console.error(err);
        setError("Kunde inte hämta landinformation.");
      } finally {
        setLoading(false);
      }
    }

    fetchCountry();
  }, [name]);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <main className="container country-details">
      <Link to="/" className="back-btn">← Tillbaka</Link>

      <section className="country-info">
        <img src={country.flags.svg} alt={`Flagga för ${country.name.common}`} />
        <div>
          <h2>{country.name.common}</h2>
          <p><strong>Huvudstad:</strong> {country.capital?.[0]}</p>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Befolkning:</strong> {country.population.toLocaleString()}</p>

          {borderCountries.length > 0 && (
            <div className="borders">
              <h4>Grannländer:</h4>
              <div className="border-list">
                {borderCountries.map((b) => (
                  <Link key={b.cca3} to={`/${b.name.common}`} className="border-btn">
                    {b.name.common}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

