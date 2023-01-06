import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

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
        <Button onClick={toggleVisible}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisible}>hide</Button>
      </div>
    </div>
  );
};

TogglableVisibility.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default TogglableVisibility;
