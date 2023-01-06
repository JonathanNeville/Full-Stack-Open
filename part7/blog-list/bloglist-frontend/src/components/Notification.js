import { Alert } from "@mui/material";
import { connect } from "react-redux";

const Notification = (props) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  };
  style.display = props.notification.length > 0 ? "" : "none";
  style.backgroundColor =
    props.className === "error" ? "salmon" : "greenyellow";

  const alertDisplay = props.notification.length > 0 ? "" : "none";
  const severity = props.className === "error" ? "error" : "success";

  return (
    <Alert severity={severity} sx={{ display: alertDisplay, margin: 1 }}>
      {props.notification}
    </Alert>
  );
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

const ConectedNotification = connect(mapStateToProps)(Notification);
export default ConectedNotification;
