// App.jsx

import React from 'react';
import Navbar from './assets/Navbar'; 
import MainDashboard from './assets/MainDashboard'; // NEW IMPORT

function App() {
  return (
    <>
      <Navbar /> 
      
      {/* RENDER THE NEW DASHBOARD BELOW THE NAVBAR */}
      <MainDashboard /> 
      
      {/* Other main application content can follow */}
      <main className="p-8">
        {/* ... */}
      </main>
    </>
  );
}

export default App;