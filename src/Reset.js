import React from "react";
import "./reset.css";
function Reset(props) {
  return (
    <div className="reset" onClick={props.toggleReset}>
      RESET
    </div>
  );
}

export default Reset;
