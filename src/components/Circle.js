import React from "react";
import "./Circle.scss";

const Circle = ({ color }) => {
  return <div className="circle" style={{ backgroundColor: color }} />;
};

export default Circle;
