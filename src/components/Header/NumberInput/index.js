export default function NumberInput({ name, value, onChange }) {
  let onChangeInput = (event) => {
    if (event.target.value >= 0) {
      onChange(event.target.value);
    } else {
      onChange(0);
    }
  }
  return (
    <div className="select-input">
      <label htmlFor={name} className="input-label">{name}</label>
      <input
        type="number"
        id={name}
        name={name}
        value={value}
        className="input-box"
        onChange={onChangeInput}
      />
    </div>
  );
}
