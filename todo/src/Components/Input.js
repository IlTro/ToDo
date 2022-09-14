import "./Input.css";

function Input({ value, onKeyDown, onChange }) {
  return (
    <input
      className="mainInput"
      type="text"
      size="40"
      placeholder="I want to..."
      onKeyDown={onKeyDown}
      value={value}
      onChange={onChange}
    ></input>
  );
}

export default Input;
