import { useState } from "react";

import "./App.css";
import Navbar from "./components/navbar";

function App() {
  return (
    <>
      <Navbar />
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </>
  );
}

export default App;
