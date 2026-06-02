import { useEffect, useRef } from 'react';

export default function PixelCard({ colors = '#ffffff,#a3a3a3,#525252', className = '', children }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const isActiveRef = useRef(false);
  const pixelsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    const ctx = canvas.getContext('2d');
    let initialized = false;
    let width = 0;
    let height = 0;

    const animate = () => {
      // Lazy initialize when layout is ready
      if (!initialized) {
        width = container.offsetWidth;
        height = container.offsetHeight;
        if (width > 0 && height > 0) {
          canvas.width = width;
          canvas.height = height;
          
          const colorsArray = colors.split(',');
          const pixels = [];
          
          for (let x = 0; x < width; x += 15) {
            for (let y = 0; y < height; y += 15) {
              pixels.push({
                x,
                y,
                color: colorsArray[Math.floor(Math.random() * colorsArray.length)],
                size: 0,
                maxSize: Math.random() * 2 + 1,
                speed: Math.random() * 0.3 + 0.1,
                targetSize: 0,
              });
            }
          }
          pixelsRef.current = pixels;
          initialized = true;
        } else {
          animationRef.current = requestAnimationFrame(animate);
          return;
        }
      }

      ctx.clearRect(0, 0, width, height);
      const isActive = isActiveRef.current;
      
      pixelsRef.current.forEach(p => {
        if (isActive) {
           p.targetSize = p.maxSize;
        } else {
           p.targetSize = 0;
        }

        if (p.size < p.targetSize) {
          p.size += p.speed;
        } else if (p.size > p.targetSize) {
          p.size -= p.speed * 2;
        }
        
        if (isActive && p.size >= p.maxSize) {
           p.size += (Math.random() > 0.5 ? 0.3 : -0.3);
        }

        if (p.size < 0) p.size = 0;
        if (p.size > p.maxSize * 1.5) p.size = p.maxSize * 1.5;

        if (p.size > 0) {
          ctx.fillStyle = p.color;
          const offset = (p.maxSize - p.size) / 2;
          ctx.fillRect(p.x + offset, p.y + offset, p.size, p.size);
        }
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [colors]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden transition-colors ${className}`}
      onMouseEnter={() => { isActiveRef.current = true; }}
      onMouseLeave={() => { isActiveRef.current = false; }}
      onPointerEnter={() => { isActiveRef.current = true; }}
      onPointerLeave={() => { isActiveRef.current = false; }}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0" 
      />
      {children}
    </div>
  );
}
