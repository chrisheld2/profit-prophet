import React, { useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import Company from './components/company/company';
import LineChart from './components/LineChart';

function App() {

  const version: number = 1.0;


  return (
    <div>
      
          version: {version}
      

      <h3>Chart</h3>

        <Company></Company>
    </div>
  );
}

export default App;
