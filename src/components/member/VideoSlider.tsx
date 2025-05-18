import React, { useState, useEffect, useRef } from 'react';
import './VideoSlider.css';

interface VideoSliderProps {
  slides: {
    image: string;
    title: string;
    description: string;
    topic?: string;
    author?: string;
  }[];
}

const VideoSlider: React.FC<VideoSliderProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const resetAutoPlayTimer = () => {
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }
    
    autoPlayTimeoutRef.current = setTimeout(() => {
      handleNext();
    }, 7000); // Auto advance after 7 seconds
  };
  
  useEffect(() => {
    resetAutoPlayTimer();
    
    return () => {
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
      }
    };
  }, [currentIndex]);
  
  const handleNext = () => {
    if (!carouselRef.current) return;
    
    carouselRef.current.classList.add('next');
    
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      if (carouselRef.current) {
        carouselRef.current.classList.remove('next');
      }
    }, 500);
    
    resetAutoPlayTimer();
  };
  
  const handlePrev = () => {
    if (!carouselRef.current) return;
    
    carouselRef.current.classList.add('prev');
    
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
      if (carouselRef.current) {
        carouselRef.current.classList.remove('prev');
      }
    }, 500);
    
    resetAutoPlayTimer();
  };
  
  // Reorder slides so current is first, then wrap around
  const orderedSlides = [...slides.slice(currentIndex), ...slides.slice(0, currentIndex)];
  
  return (
    <div className="carousel" ref={carouselRef}>
      {/* Main slides */}
      <div className="list">
        {orderedSlides.map((slide, index) => (
          <div className="item" key={index}>
            <img src={slide.image} alt={slide.title} />
            <div className="content">
              {slide.author && <div className="author">{slide.author}</div>}
              <div className="title">{slide.title}</div>
              {slide.topic && <div className="topic">{slide.topic}</div>}
              <div className="des">{slide.description}</div>
              <div className="buttons">
                <button>SAIBA MAIS</button>
                <button>ACESSAR</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Thumbnails */}
      <div className="thumbnail">
        {orderedSlides.map((slide, index) => (
          <div className="item" key={index}>
            <img src={slide.image} alt={slide.title} />
            <div className="content">
              <div className="title">{slide.title}</div>
              <div className="description">Destaque</div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation arrows */}
      <div className="arrows">
        <button id="prev" onClick={handlePrev}>&lt;</button>
        <button id="next" onClick={handleNext}>&gt;</button>
      </div>
      
      {/* Time indicator */}
      <div className="time" ref={timeRef}></div>
    </div>
  );
};

export default VideoSlider;
