import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MainTemplate.scss";

const MainTemplate = () => {
  const [description, setDescription] = useState(
    "오델로 게임에 오신 것을 환영합니다!!!"
  );
  return (
    <div className="main-template">
      <h1>Otheelo</h1>
      <div className="description">{description}</div>
      <div className="button-box">
        <button
          onMouseOver={() => setDescription("1인용 오델로 게임입니다.")}
          onMouseOut={() =>
            setDescription("오델로 게임에 오신 것을 환영합니다!!!")
          }
        >
          <Link to="/classic">Play Game</Link>
        </button>
        <button
          onMouseOver={() => setDescription("오델로의 규칙입니다.")}
          onMouseOut={() =>
            setDescription("오델로 게임에 오신 것을 환영합니다!!!")
          }
        >
          <Link to="/rule">Rule Book</Link>
        </button>
      </div>
    </div>
  );
};

export default MainTemplate;
