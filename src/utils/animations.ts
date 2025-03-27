
import { useEffect, useState } from 'react';

export const useDelayedMount = (show: boolean, delayTime = 500) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (show && !mounted) {
      setMounted(true);
    } else if (!show && mounted) {
      timeoutId = setTimeout(() => {
        setMounted(false);
      }, delayTime);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [show, delayTime, mounted]);

  return mounted;
};

export const staggeredAnimation = (index: number, baseDelay = 50) => ({
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      delay: index * baseDelay / 1000,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: { 
      duration: 0.2,
      ease: [0.16, 1, 0.3, 1]
    }
  }
});
