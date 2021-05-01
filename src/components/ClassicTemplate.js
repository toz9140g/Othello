import React from "react";
import "./ClassicTemplate.scss";

const ClassicTemplate = ({ children }) => {
  return (
    <div className="main-template">
      <h1>Otheelo</h1>
      <div className="description">1인용 오델로 게임입니다.</div>
      <div className="game-box">{children}</div>
    </div>
  );
};

export default ClassicTemplate;
