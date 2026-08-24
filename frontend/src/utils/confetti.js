import confetti from 'canvas-confetti';

/**
 * Triggers a celebratory confetti burst when a single task is completed
 */
export function triggerTaskConfetti() {
  confetti({
    particleCount: 50,
    spread: 60,
    origin: { y: 0.8 },
    colors: ['#22d3ee', '#6366f1', '#10b981', '#f59e0b', '#782522'],
    ticks: 200,
    gravity: 1.2,
    scalar: 0.9,
  });
}

/**
 * Triggers an all-done grand fireworks celebration when 100% tasks are completed
 */
export function triggerGrandCelebration() {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 40 * (timeLeft / duration);

    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 },
      colors: ['#22d3ee', '#a855f7', '#6366f1', '#10b981', '#f43f5e'],
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 },
      colors: ['#22d3ee', '#a855f7', '#6366f1', '#10b981', '#f43f5e'],
    });
  }, 250);
}
