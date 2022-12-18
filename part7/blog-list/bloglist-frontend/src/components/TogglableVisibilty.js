import { useState } from "react";
import PropTypes from "prop-types";

const TogglableVisibility = (props) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisible}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisible}>hide</button>
      </div>
    </div>
  );
};

TogglableVisibility.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default TogglableVisibility;
