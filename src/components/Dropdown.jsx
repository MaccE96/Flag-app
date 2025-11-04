export default function Dropdown({ value, onChange }) {
  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="dropdown"
    >
      <option value="">Alla regioner</option>
      {regions.map((region) => (
        <option key={region} value={region}>
          {region}
        </option>
      ))}
    </select>
  );
}
