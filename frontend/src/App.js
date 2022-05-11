import Home from "./pages/home/Home";
import Despesas from "./pages/despesas/Despesas";
import Rendimentos from "./pages/rendimentos/Rendimentos";

// Styles
import "./styles/App.scss";

// Third party libraries
import {BrowserRouter, Routes, Route} from "react-router-dom";
import React from 'react';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/despesas" element={<Despesas />} />
          <Route path="/rendimentos" element={<Rendimentos />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
