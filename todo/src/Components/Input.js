import "./Input.css";

function Input({ value, onKeyDown, onChange, placeholder }) {
  return (
    <input
      className="mainInput"
      type="text"
      size="40"
      placeholder={placeholder}
      onKeyDown={onKeyDown}
      value={value}
      onChange={onChange}
    ></input>
  );
}

export default Input;
