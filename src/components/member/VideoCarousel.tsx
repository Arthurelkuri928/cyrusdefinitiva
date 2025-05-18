import React, { useRef, useEffect } from 'react';
import { register } from 'swiper/element/bundle';

// Registrar Swiper como elemento web personalizado
register();

interface VideoCarouselProps {
  className?: string;
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({ className = '' }) => {
  const swiperRef = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    // Configuração do Swiper
    const swiperContainer = swiperRef.current;
    
    if (swiperContainer) {
      // Atribuir propriedades ao elemento swiper
      Object.assign(swiperContainer, {
        slidesPerView: 1,
        spaceBetween: 16,
        grabCursor: true,
        loop: true,
        autoplay: {
          delay: 8000,
          disableOnInteraction: false,
        },
        pagination: {
          clickable: true,
        },
        breakpoints: {
          // Quando a largura da viewport é >= 768px (tablet)
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          // Quando a largura da viewport é >= 1024px (desktop)
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        },
      });
      
      // Inicializar o Swiper
      swiperContainer.initialize();
    }
  }, []);
  
  // Vídeos do YouTube com configurações para autoplay, mute e loop
  const videos = [
    {
      id: '5Od0aOse1wc',
      title: 'Anúncio 1',
    },
    {
      id: 'rczqP0FwWrk',
      title: 'Anúncio 2',
    },
    {
      id: 'jYwzqH6zfXw',
      title: 'Anúncio 3',
    },
  ];
  
  return (
    <div className={`video-carousel-container ${className}`}>
      <swiper-container ref={swiperRef} init="false">
        {videos.map((video) => (
          <swiper-slide key={video.id}>
            <div className="relative overflow-hidden rounded-xl shadow-md">
              <iframe
                src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&loop=1&playlist=${video.id}&controls=0`}
                title={video.title}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full aspect-video"
                loading="lazy"
                frameBorder="0"
              ></iframe>
            </div>
          </swiper-slide>
        ))}
      </swiper-container>
    </div>
  );
};

export default VideoCarousel;
