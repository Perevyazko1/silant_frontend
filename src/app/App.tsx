import React from 'react';
import {MainPage} from "../pages/MainPage";
import {Route, Routes} from "react-router-dom";
import {ListCarPage} from "../pages/ListCarPage";
import {NavbarComponent} from "../widgets/Navbar/Navbar";


function App() {
  return (
    <div>
        <NavbarComponent/>
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/listcar" element={<ListCarPage/>}/>
        </Routes>

    </div>
  );
}

export default App;
