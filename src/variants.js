export const fadeIn = (direction, delay) => {
    return {
      hidden: {
        opacity: 0,
        scale: 0.8,
        y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
        x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
      },
      show: {
        opacity: 1,
        scale: 1,
        y: 0,
        x: 0,
        transition: {
          type: 'spring',
          stiffness: 70,
          damping: 15,
          duration: 1.5,
          delay: delay,
          ease: [0.42, 0, 0.58, 1],
        },
      },
    };
  };
  