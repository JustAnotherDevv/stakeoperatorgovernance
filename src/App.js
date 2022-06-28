import React from 'react';
import Header from './components/header/Header'
import Home from './components/Home/Home';
import {Routes, Route} from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import { connect } from "react-redux";

function App() {
  return (
    <div className="AppMain--wrapperBox">
    <Header />
    <Toaster
      position="bottom-left"
      reverseOrder={true}
      toastOptions={{
        style: {
          marginRight: "2rem",
          borderRadius: 0,
          padding: "16px",
          color: "#000",
          background: "#7AE7FF",
        },
      }}
    />
    <Routes>
     <Route exact path='/' element={<Home />} />
     </Routes>
    </div>
  );
}

export default App;
