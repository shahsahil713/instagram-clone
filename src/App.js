import React from "react";

import "./App.css";
import Header from "./components/Header";

import Instagram from "./components/Instagram";
import { StylesProvider } from "@material-ui/core/styles";

function App() {
  return (
    <StylesProvider injectFirst>
      <div className="app">
        <Header />
      </div>
    </StylesProvider>
  );
}

export default App;
