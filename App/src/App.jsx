import './index.css'
import { useState } from 'react';
import { pics } from './components/images.jsx';
import { Body } from './components/body.jsx';
import { Header } from './components/header.jsx';
import { Navigation } from './components/navigation.jsx';


function App() {
  
  return (
    <div className="app-container">
      <Header />
      <div className="gallery-section">
        <Navigation pics={pics} />
        <Body
          pics={pics}
          currentIndex={currentIndex}
          goToPrevious={goToPrevious}
          goToNext={goToNext}
          goToImage={goToImage}
          galleryRef={galleryRef}
        
        />
        <div className="image-details">
          <h2>{pics[currentIndex].name}</h2>
          <p>{pics[currentIndex].reason}</p>
        </div>
      </div>
    </div>
  );
}

export default App
