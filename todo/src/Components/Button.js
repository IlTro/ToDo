import './Button.css'

function Button(props) {
    return (
        <button className={"mainButton " + props.className} onClick={props.onClick}>{props.text}</button>
    );
  }
  
  export default Button;
  