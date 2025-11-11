export default function Search({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search for a country..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="search-input"
    />
  );
}
