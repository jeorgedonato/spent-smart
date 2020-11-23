import React from "react";
import "./style.css"

function Container(props) {
  return <div className={`container${props.fluid ? "-fluid" : ""} overflow-auto `} {...props} />;
}

export default Container;
