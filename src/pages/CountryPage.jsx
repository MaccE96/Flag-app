import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../components/Loader";
import arrowLight from "../assets/arrow-left-dark.svg";
import arrowDark from "../assets/arrow-left.svg";

export default function CountryPage() {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const [theme, setTheme] = useState(
    document.documentElement.getAttribute("data-theme") || "light"
  );

  useEffect(() => {
    const obs = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute("data-theme") || "light");
    });

    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    async function fetchCountry() {
      try {
        setError(null);
        setLoading(true);

        const res = await fetch(
          `https://restcountries.com/v3.1/name/${name}?fullText=true`
        );
        if (!res.ok) throw new Error(`Fel vid API-anrop: ${res.status}`);

        const data = await res.json();
        const countryData = data[0];
        setCountry(countryData);

        if (countryData.borders && countryData.borders.length > 0) {
          const borders = await fetch(
            `https://restcountries.com/v3.1/alpha?codes=${countryData.borders.join(
              ","
            )}`
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
  if (!country) return null;

  const nativeName =
    Object.values(country.name.nativeName || {})[0]?.common ||
    country.name.common;
  const domain = country.tld?.[0] || "N/A";
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c) => c.name)
        .join(", ")
    : "N/A";
  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  return (
    <main className="container country-details">
      <Link to="/" className="back-button">
        <img
          src={theme === "light" ? arrowLight : arrowDark}
          alt="Back"
          className="back-icon"
        />
        Back
      </Link>

      <section className="country-info">
        <img
          src={country.flags.svg}
          alt={`Flagga för ${country.name.common}`}
          className="country-flag"
        />

        <div className="country-text">
          <h2>{country.name.common}</h2>

          <div className="country-columns">
            <div className="column">
              <p>
                <strong>Population:</strong>{" "}
                {country.population.toLocaleString()}
              </p>
              <p>
                <strong>Region:</strong> {country.region}
              </p>
              <p>
                <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
              </p>
              <p>
                <strong>Native name:</strong> {nativeName}
              </p>
            </div>

            <div className="column">
              <p>
                <strong>Top Level Domain:</strong> {domain}
              </p>
              <p>
                <strong>Currencies:</strong> {currencies}
              </p>
              <p>
                <strong>Language:</strong> {languages}
              </p>
            </div>
          </div>

          {borderCountries.length > 0 && (
            <div className="borders">
              <h4>Border Countries:</h4>
              <div className="border-list">
                {borderCountries.map((b) => (
                  <Link
                    key={b.cca3}
                    to={`/${b.name.common}`}
                    className="border-btn"
                  >
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
