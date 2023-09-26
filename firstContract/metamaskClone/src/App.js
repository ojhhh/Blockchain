import "./App.css";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { Main } from "./components/layout";

function App() {
  // console.log("new Web3(window.ethereum : ",new Web3(window.ethereum));
  // console.log(" : ",new Web3(window.ethereum));
  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
