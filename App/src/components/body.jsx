export function Body({pics,  currentIndex, goToPrevious, goToNext, goToImage, galleryRef }){
    return(
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
    )
}