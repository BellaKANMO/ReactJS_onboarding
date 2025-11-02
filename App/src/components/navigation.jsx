import { useState} from 'react';

export default function Navigation(pics) {
 const [currentIndex, setCurrentIndex] = useState(0);
 const galleryRef = useRef(null);

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? 0 : currentIndex - 1;
    setCurrentIndex(newIndex);
    scrollToImage(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === pics.length - 1;
    const newIndex = isLastImage ? pics.length - 1 : currentIndex + 1;
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
    return {
        goToPrevious,
        goToNext,
        goToImage,
        galleryRef,
        currentIndex,   
        galleryRef,
    };
}