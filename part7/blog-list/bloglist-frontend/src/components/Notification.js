import { connect } from "react-redux";

const Notification = (props) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  };
  style.display = props.notification.length > 0 ? "" : "none";
  style.backgroundColor = props.className === "error" ? "salmon": "greenyellow";

  return <div style={style}>{props.notification}</div>;
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

const ConectedNotification = connect(mapStateToProps)(Notification);
export default ConectedNotification;
