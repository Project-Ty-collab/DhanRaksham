import React from 'react';
import Home from './pages/Home/Home'; // Importing the Home component
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <Home />
      <Footer/>
    </div>
  );
}

export default App;
