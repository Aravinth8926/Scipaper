export const EASINGS = {
  ease: [0.25, 0.1, 0.25, 1],
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  spring: { type: "spring" as const, stiffness: 300, damping: 30 },
  springBouncy: { type: "spring" as const, stiffness: 400, damping: 25 },
  springGentle: { type: "spring" as const, stiffness: 200, damping: 30 },
} as const;

export const DURATIONS = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
} as const;

export const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASINGS.easeOut },
  },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: EASINGS.easeOut },
  },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -24 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: EASINGS.easeOut },
  },
};

export const slideInRight = {
  initial: { opacity: 0, x: 24 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: EASINGS.easeOut },
  },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASINGS.easeOut },
  },
};
