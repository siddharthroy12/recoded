export default function NumberInput({ name, value, onChange }) {
  return (
    <>
      <label htmlFor={name} className="input-label">{name}</label>
      <input
        type="number"
        id={name}
        name={name}
        value={value}
        className="input-box"
        onChange={e => onChange(e.target.value)}
      />
    </>
  );
}
