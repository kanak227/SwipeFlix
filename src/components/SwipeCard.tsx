import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, PanInfo, useAnimation } from 'framer-motion';
import { Star } from 'lucide-react';
import { Movie, SwipeDirection } from '../types/Movie';

interface SwipeCardProps {
  movie: Movie;
  onSwipe: (direction: SwipeDirection) => void;
  isTop: boolean;
  setSwipeProgress?: (progress: number) => void;
  swipeAnimating?: 'left' | 'right' | null;
}

const SwipeCard = ({ movie, onSwipe, isTop, setSwipeProgress, swipeAnimating }: SwipeCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const controls = useAnimation();
  const [swipeDirection, setSwipeDirection] = useState<SwipeDirection | null>(null);

  // Create stars array based on movie rating (0-5 scale)
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.floor(movie.rating);
    const halfFilled = !filled && i < Math.floor(movie.rating + 0.5);
    return { filled, halfFilled };
  });

  // Handle drag end
  const handleDragEnd = async (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const xOffset = info.offset.x;
    const direction = xOffset > 100 ? 'right' : xOffset < -100 ? 'left' : null;

    if (setSwipeProgress) setSwipeProgress(0);

    if (direction) {
      setSwipeDirection(direction);
      await controls.start({
        x: direction === 'right' ? 1000 : -1000,
        opacity: 0,
        rotate: direction === 'right' ? 45 : -45,
        filter: 'blur(24px)',
        transition: { duration: 0.45, ease: "easeOut" }
      });
      onSwipe(direction);
    } else {
      controls.start({ x: 0, rotate: 0, filter: 'blur(0px)' });
    }
  };

  // Report drag progress for glow effect
  useEffect(() => {
    if (!setSwipeProgress) return;
    const unsubscribe = x.onChange((latest) => {
      setSwipeProgress(latest);
      if (cardRef.current) {
        const leftIndicator = cardRef.current.querySelector('.swipe-left-indicator') as HTMLElement;
        const rightIndicator = cardRef.current.querySelector('.swipe-right-indicator') as HTMLElement;
        if (leftIndicator && rightIndicator) {
          if (latest < -50) {
            leftIndicator.style.opacity = `${Math.min(-latest / 100, 1)}`;
            rightIndicator.style.opacity = '0';
          } else if (latest > 50) {
            rightIndicator.style.opacity = `${Math.min(latest / 100, 1)}`;
            leftIndicator.style.opacity = '0';
          } else {
            leftIndicator.style.opacity = '0';
            rightIndicator.style.opacity = '0';
          }
        }
      }
    });
    return () => unsubscribe();
  }, [x, setSwipeProgress]);

  // Animate card when swipeAnimating is set (button press)
  useEffect(() => {
    if (!swipeAnimating) return;
    controls.start({
      x: swipeAnimating === 'right' ? 1000 : -1000,
      opacity: 0,
      rotate: swipeAnimating === 'right' ? 45 : -45,
      filter: 'blur(24px)',
      transition: { duration: 0.45, ease: "easeOut" }
    });
    // No need to call onSwipe here, handled in parent after timeout
    // Reset filter after animation for next card
    return () => {
      controls.set({ x: 0, opacity: 1, rotate: 0, filter: 'blur(0px)' });
    };
  }, [swipeAnimating, controls]);

  return (
    <motion.div
      ref={cardRef}
      className={`swipe-card ${isTop ? 'z-20' : 'z-0'}`}
      animate={controls}
      style={{
        x,
        cursor: isTop ? 'grab' : 'default',
        filter: 'blur(0px)',
      }}
      drag={isTop && !swipeAnimating ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: 'grabbing' }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className="absolute inset-0 bg-center bg-cover rounded-2xl"
        style={{ backgroundImage: `url(${movie.poster})` }}
      />
      <div className="card-content">
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-2xl" />
        <div className="relative z-10">
          <h2 className="mb-1 text-2xl font-bold text-white">{movie.title}</h2>
          <div className="flex items-center mb-2">
            <span className="mr-2 text-sm text-gray-200">{movie.year}</span>
            <div className="flex rating-stars">
              {stars.map((star, index) => (
                <Star
                  key={index}
                  size={16}
                  className={star.filled ? 'text-yellow-400 fill-yellow-400' : star.halfFilled ? 'text-yellow-400 fill-yellow-400 [clip-path:inset(0_50%_0_0)]' : 'text-gray-400'}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {movie.genres.map((genre, index) => (
              <span 
                key={index}
                className="px-2 py-1 text-xs text-white rounded-full bg-white/20 backdrop-blur-sm"
              >
                {genre}
              </span>
            ))}
          </div>
          {movie.description && (
            <p className="text-sm text-gray-200 line-clamp-3">{movie.description}</p>
          )}
        </div>
      </div>
      <div className="swipe-left-indicator">Nope</div>
      <div className="swipe-right-indicator">Like</div>
    </motion.div>
  );
};

export default SwipeCard;