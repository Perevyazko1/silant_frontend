import React from 'react';
import {MainPage} from "../pages/MainPage";
import {Route, Routes} from "react-router-dom";
import {ListCarPage} from "../pages/ListCarPage";


function App() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/listcar" element={<ListCarPage/>}/>
        </Routes>

    </div>
  );
}

export default App;
