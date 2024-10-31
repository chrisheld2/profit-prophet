import React, { useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import Company from './components/company/company';

import Button from '@mui/material/Button';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {

  const version: number = 1.0;

  function test() {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=35&longitude=139&hourly=temperature_2m')
      .then(response => response.json())
      .then(data => {
        console.log('Weather data:', data);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }





  return (
    <div>

      version: {version}


      <Button variant="contained" onClick={test}>Hello world</Button>

      <Company></Company>
    </div>
  );
}

export default App;
