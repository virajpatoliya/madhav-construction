
import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleLinkHoverStart = () => setLinkHovered(true);
    const handleLinkHoverEnd = () => setLinkHovered(false);

    // Track cursor position
    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    // Track when cursor leaves the window
    window.addEventListener('mouseout', (e) => {
      if (e.relatedTarget === null) {
        setHidden(true);
      }
    });

    // Add event listeners for links and buttons
    const links = document.querySelectorAll('a, button, .btn-primary, .btn-outline');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleLinkHoverStart);
      link.addEventListener('mouseleave', handleLinkHoverEnd);
    });

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleLinkHoverStart);
        link.removeEventListener('mouseleave', handleLinkHoverEnd);
      });
    };
  }, []);

  useEffect(() => {
    // Re-add event listeners for links and buttons after navigation/DOM changes
    const handleLinkHoverStart = () => setLinkHovered(true);
    const handleLinkHoverEnd = () => setLinkHovered(false);
    
    const links = document.querySelectorAll('a, button, .btn-primary, .btn-outline');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleLinkHoverStart);
      link.addEventListener('mouseleave', handleLinkHoverEnd);
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleLinkHoverStart);
        link.removeEventListener('mouseleave', handleLinkHoverEnd);
      });
    };
  }, [window.location.pathname]);

  // Only show custom cursor on non-touch devices
  if (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0) {
    return null;
  }

  return (
    <>
      <div 
        className={`custom-cursor-dot ${hidden ? 'opacity-0' : 'opacity-100'}`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          transform: clicked ? 'translate(-50%, -50%) scale(0.8)' : 'translate(-50%, -50%)',
          backgroundColor: linkHovered ? '#e9b949' : '#333',
        }}
      />
      <div 
        className={`custom-cursor-outline ${hidden ? 'opacity-0' : 'opacity-100'}`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          transform: linkHovered 
            ? 'translate(-50%, -50%) scale(1.5)' 
            : clicked 
              ? 'translate(-50%, -50%) scale(0.8)' 
              : 'translate(-50%, -50%)',
          borderColor: linkHovered ? '#e9b949' : '#333',
        }}
      />
    </>
  );
};

export default CustomCursor;
