export default function Search({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Sök efter land..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="search-input"
    />
  );
}
