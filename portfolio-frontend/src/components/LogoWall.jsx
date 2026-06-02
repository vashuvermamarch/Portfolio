import { useState } from 'react';

function LogoWall({
  items = [],
  direction = 'horizontal',
  pauseOnHover = false,
  size = 'clamp(8rem, 1rem + 20vmin, 25rem)',
  duration = '60s',
  bgColor = 'transparent',
  bgClass = ''
}) {
  const [isPaused, setIsPaused] = useState(false);

  const wrapperClass = [
    'flex',
    'flex-col',
    'gap-[calc(var(--size)/14)]',
    'mx-auto',
    'max-w-full',
    'p-[20px_10px]',
    direction === 'vertical' ? 'flex-row justify-center h-full' : '',
    bgClass
  ]
    .filter(Boolean)
    .join(' ');

  const marqueeClass = [
    'relative',
    'flex',
    'overflow-hidden',
    'select-none',
    'gap-[calc(var(--size)/14)]',
    'justify-start',
    'w-full',
    'mask-horizontal',
    direction === 'vertical' ? 'flex-col h-full mask-vertical' : ''
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article
      className={wrapperClass}
      style={{
        '--size': size,
        '--duration': duration,
        '--color-bg': bgColor,
        '--color-text': 'white'
      }}
    >
      <div
        className={marqueeClass}
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      >
        <div
          className={`flex shrink-0 justify-around gap-[calc(var(--size)/14)] min-w-full ${
            direction === 'vertical' ? 'flex-col min-h-full animate-marquee-vertical' : 'animate-marquee'
          }`}
          style={{
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              className={`bg-[var(--color-bg)] rounded-xl flex items-center justify-center object-contain ${
                direction === 'vertical'
                  ? 'w-[calc(var(--size)/1.5)] p-[calc(var(--size)/6)]'
                  : 'w-[var(--size)] p-[calc(var(--size)/10)]'
              }`}
            >
              {item.imgUrl ? (
                <img src={item.imgUrl} alt={item.altText} className="w-full h-full object-contain" />
              ) : (
                item.icon
              )}
            </div>
          ))}
        </div>
        <div
          aria-hidden="true"
          className={`flex shrink-0 justify-around gap-[calc(var(--size)/14)] min-w-full ${
            direction === 'vertical' ? 'flex-col min-h-full animate-marquee-vertical' : 'animate-marquee'
          }`}
          style={{
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
        >
          {items.map((item, idx) => (
            <div
              key={`dup1-${idx}`}
              className={`bg-[var(--color-bg)] rounded-xl flex items-center justify-center object-contain ${
                direction === 'vertical'
                  ? 'w-[calc(var(--size)/1.5)] p-[calc(var(--size)/6)]'
                  : 'w-[var(--size)] p-[calc(var(--size)/10)]'
              }`}
            >
              {item.imgUrl ? (
                <img src={item.imgUrl} alt={item.altText} className="w-full h-full object-contain" />
              ) : (
                item.icon
              )}
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        article {
          --gap: calc(var(--size) / 14);
          --scroll-start: 0;
          --scroll-end: calc(-100% - var(--gap));
        }
        
        .mask-horizontal {
          mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
        }

        .animate-marquee {
          animation: scroll-x var(--duration) linear infinite;
        }

        @keyframes scroll-x {
          from {
            transform: translateX(var(--scroll-start));
          }
          to {
            transform: translateX(var(--scroll-end));
          }
        }
      `}} />
    </article>
  );
}

export default LogoWall;
