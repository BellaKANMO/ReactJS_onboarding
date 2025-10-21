import './index.css'
import { useState, useRef, useEffect } from 'react';

const pics =[
  {
    imageUrl :"./images/QUENN.jpg",
    name : "Quenn",
    id :0,
    reason : "First, let me get you in my mood... This is my lock screen picture. It globally show you who i am !"
  },
  {imageUrl: "./images/at_the_cross.jpg",
   id:1,
   name : "at_the_cross",
   reason : "I had this picture first, for a while but i wanted something different, more joyful"},
  {imageUrl: "./images/blow_minds.jpg", 
   id:2,
   name : "blow_minds",
   reason : "I tried this but the picture was too small to fit the screen and i didn't want to stretch, i was ugly when stretched"},
  {imageUrl: "./images/from_rivers.jpg", 
   id:3,
   name : "from_rivers",
   reason : "I reallt like this one but the width doesn't like me too. It's too large so i can't have all the text on my screen"},
  {imageUrl: "./images/light_in_darkness.jpg",
   id:4,
   name : "light_in_darkness",
   reason : "This makes you feel like the light in darknes right ? Yeah but it's too small for the screen too. Sad ? Me too !"},
  {imageUrl: "./images/love_purple.jpg",
   id:5,
   name : "love_purple",
   reason : "Everything here describes me, don't you think so ? My favourite color (purple), the color of my soul (gold) but... I dare you to guest..."},
  {imageUrl: "./images/unamable.jpg",
   id:6,
   name : "unamable",
   reason : "I feel like i'm searching for my wadding dress and when i think i found it, it's blurry aaaarhg"},
  ]

function getUrl(pic){
  return(
    pic.imageUrl
  )
}

// function App() {
//   const picsItems = pics.map(pic => 
//     <li>
//       <img src={getUrl(pic)}
//            alt={pic.name} />
//       <p>
//         <b> {pic.name}:</b>
//         {' '+ pic.reason}
//       </p>
//     </li>
//   );
//   return (
//     <>
//       <h1 className='head'>Bienvenu dans mon univers un peu fou</h1>
//       <p style={{color: 'black'}}>I gave myself an objetive: find a background for my computer thats reflects me...</p>
//       <div className='body'>
//         <p>
//           <ul>{picsItems}</ul>
//         </p>
        
//       </div>
//     </>
//   )
// }

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const galleryRef = useRef(null);

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? pics.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    scrollToImage(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === pics.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    scrollToImage(newIndex);
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
    scrollToImage(index);
  };

  const scrollToImage = (index) => {
    if (galleryRef.current) {
      const gallery = galleryRef.current;
      const imageWidth = gallery.children[0]?.offsetWidth || 280;
      const gap = 20;
      gallery.scrollTo({
        left: index * (imageWidth + gap),
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const gallery = galleryRef.current;
    
    const handleScroll = () => {
      if (gallery) {
        const imageWidth = gallery.children[0]?.offsetWidth || 280;
        const gap = 20;
        const scrollPosition = gallery.scrollLeft;
        const newIndex = Math.round(scrollPosition / (imageWidth + gap));
        setCurrentIndex(newIndex);
      }
    };

    if (gallery) {
      gallery.addEventListener('scroll', handleScroll);
      return () => gallery.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="app-container">
      <h1 className='head'>Bienvenu dans mon univers un peu fou</h1>
      <p className="intro-text">
        I gave myself an objective: find a background for my computer that reflects me...
      </p>
      
      <div className="gallery-section">
        <div className="gallery-container">
          <div className="gallery" ref={galleryRef}>
            {pics.map((pic, index) => (
              <div 
                key={pic.id} 
                className={`gallery-item ${index === currentIndex ? 'active' : ''}`}
              >
                <img 
                  src={pic.imageUrl} 
                  alt={pic.name}
                  onClick={() => goToImage(index)}
                />
                <div className="image-overlay">
                  <h3>{pic.name}</h3>
                </div>
              </div>
            ))}
          </div>
          
          <div className="gallery-controls">
            <button className="nav-btn prev-btn" onClick={goToPrevious}>
              ‹
            </button>
            
            <div className="gallery-indicators">
              {pics.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => goToImage(index)}
                />
              ))}
            </div>
            
            <button className="nav-btn next-btn" onClick={goToNext}>
              ›
            </button>
          </div>
          
          <div className="image-counter">
            {currentIndex + 1} / {pics.length}
          </div>
        </div>
        
        <div className="image-details">
          <h2>{pics[currentIndex].name}</h2>
          <p>{pics[currentIndex].reason}</p>
        </div>
      </div>
    </div>
  );
}

export default App
