import "./Button.css";

function Button({ className, onClick, text }) {
  return (
    <button className={"mainButton " + className} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
