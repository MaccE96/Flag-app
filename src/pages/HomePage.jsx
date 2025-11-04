import { useEffect, useState } from "react";
import { getAllCountries } from "../api/Countries";
import CountryCard from "../components/CountryCard";
import Search from "../components/Search";
import Dropdown from "../components/Dropdown";
import Loader from "../components/Loader";

export default function HomePage() {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllCountries();
        setCountries(data);
        setFiltered(data);
      } catch (err) {
        console.error(err);
        setError("Kunde inte hämta länder.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // 🧭 Filtrering baserat på sök & region
  useEffect(() => {
    let result = countries;

    if (region) {
      result = result.filter((c) => c.region === region);
    }

    if (search.trim()) {
      result = result.filter((c) =>
        c.name.common.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(result);
  }, [search, region, countries]);

  if (loading) return <Loader />;

  if (error) return <p>{error}</p>;

  return (
    <main className="container">
      <div className="filter-bar">
        <Search value={search} onChange={setSearch} />
        <Dropdown value={region} onChange={setRegion} />
      </div>

      <div className="country-grid">
        {filtered.map((country) => (
          <CountryCard
            key={country.cca3}
            name={country.name.common}
            capital={country.capital?.[0] || "Ingen huvudstad"}
            flag={country.flags.svg}
          />
        ))}
      </div>
    </main>
  );
}
