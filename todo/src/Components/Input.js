import './Input.css'

function Input(props) {
  return (
    <input 
      className="mainInput"
      type="text"
      size="40"
      placeholder="I want to..."
      onKeyDown = {props.onKeyDown}
      >
    </input>
  );
}

export default Input;
