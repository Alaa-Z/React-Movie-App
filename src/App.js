import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import "./App.css";

// Components
import Home from "./components/Home"
import UpdateForm from './components/UpdateForm';


function App () {
  return (
    <Router>
      <div className='App'>
      <Routes>
        <Route path='/' exact element={<Home />} />
        {/* <Route path='/add' exact element={<AddForm />} /> */}
        {/* <Route path='/update' element={<UpdateForm />} /> */}
        <Route path=':id' exact element={<UpdateForm />} />
      </Routes>      
      </div>
    </Router>
  );
}

export default App;