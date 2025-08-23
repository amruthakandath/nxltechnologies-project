import React from 'react';
import HeroSection from './components/HeroSection';
import ProductJourney from './components/ProductJourney';
import TechnicalSpecs from './components/TechnicalSpecs';
import CallToAction from './components/CallToAction';
import './App.css';
import EarthWireframe from './components/EarthWireframe';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-blue-900">
      <HeroSection />
        <EarthWireframe />
      <ProductJourney />
      <TechnicalSpecs />
      <CallToAction />
    </div>
  );
}

export default App;