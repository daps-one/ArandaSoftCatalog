import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/shared/navbar';
import { routes } from './routing';

export const App = () => {


  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          {
            routes.map(route => <Route path={route.path} element={route.component} />)
          }
        </Routes>
      </Router>
    </>
  )
};
