import React from "react";
import { Route } from "react-router";
import "./App.css";
import MainPage from "./pages/MainPage";
import ClassicPage from "./pages/ClassicPage";
import RulePage from "./pages/RulePage";

const App = () => {
  return (
    <>
      <Route component={MainPage} path="/" exact />
      <Route component={ClassicPage} path="/classic" />
      <Route component={RulePage} path="/rule" />
    </>
  );
};

export default App;
