import Button from "./Button";
import "./Notification.css";

function Notification({ text, onClose }) {
  return <div className="notification">{text} <Button className='close-btn' onClick={onClose} text={'X'}/></div>;
}

export default Notification;
