import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TOTAL_FRAMES = 140;

const AnimatedBackground = () => {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let loadedCount = 0;
    const preloadImages = () => {
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        const frameNum = String(i).padStart(3, '0');
        img.src = `/bg-frames/ezgif-frame-${frameNum}.jpg`;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === TOTAL_FRAMES) {
            setImagesPreloaded(true);
          }
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === TOTAL_FRAMES) {
            setImagesPreloaded(true);
          }
        };
      }
    };
    
    preloadImages();
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') {
      // Play automatically at 30 FPS on other pages
      const interval = setInterval(() => {
        setCurrentFrame(prev => (prev >= TOTAL_FRAMES ? 1 : prev + 1));
      }, 33);
      return () => clearInterval(interval);
    }

    // Map scroll progress to frames on the home page
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      let progress = 0;
      if (scrollHeight > 0) {
        progress = scrollTop / scrollHeight;
      }
      
      // Calculate frame index based on progress (1 to TOTAL_FRAMES)
      const frameIndex = Math.min(
        Math.max(Math.floor(progress * (TOTAL_FRAMES - 1)) + 1, 1),
        TOTAL_FRAMES
      );
      
      setCurrentFrame(frameIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Init call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const frameNum = String(currentFrame).padStart(3, '0');
  const currentSrc = `/bg-frames/ezgif-frame-${frameNum}.jpg`;

  return (
    <div className="fixed inset-0 z-[-10] w-full h-full overflow-hidden pointer-events-none bg-black">
      {/* Background frames */}
      <img 
        src={currentSrc} 
        alt="Background Frame" 
        className="absolute inset-0 w-full h-full object-cover opacity-60 transition-opacity duration-300"
      />
      
      {/* Darker Gradient overlay to reduce brightness and ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950/80 via-gray-900/70 to-gray-950/90 mix-blend-multiply"></div>
      
      {/* Cyber/grid overlay effect */}
      <div 
        className="absolute inset-0 opacity-[0.05]" 
        style={{
          backgroundImage: 'linear-gradient(#00d4ff 1px, transparent 1px), linear-gradient(90deg, #00d4ff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      ></div>
    </div>
  );
};

export default AnimatedBackground;
