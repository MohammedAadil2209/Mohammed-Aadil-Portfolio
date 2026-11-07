import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Ignore the viewport-height changes caused by mobile address bars showing /
// hiding, otherwise every ScrollTrigger refreshes mid-scroll and the page jumps.
ScrollTrigger.config({ ignoreMobileResize: true });

let lenis = null;
let lockCount = 0;
let pendingScroll = null;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Create the single Lenis instance and drive it from GSAP's ticker so Lenis,
 * ScrollTrigger and every scrubbed tween update in the exact same frame.
 * Touch devices keep native (momentum) scrolling, which is always the smoothest
 * option on phones; Lenis only smooths wheel / trackpad input.
 */
export function initSmoothScroll() {
  if (lenis) return lenis;

  lenis = new Lenis({
    lerp: prefersReducedMotion() ? 1 : 0.1,
    wheelMultiplier: 1,
    smoothWheel: !prefersReducedMotion(),
    syncTouch: false,
    autoResize: true,
  });

  lenis.on('scroll', ScrollTrigger.update);

  const raf = (time) => lenis && lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  // Smooth in-page anchor navigation for every <a href="#..."> on the site.
  const onClick = (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    const hash = a.getAttribute('href');
    e.preventDefault();
    if (hash === '#' || hash === '#top') {
      scrollToTarget(0);
      return;
    }
    const el = document.querySelector(hash);
    if (el) scrollToTarget(el);
  };
  document.addEventListener('click', onClick);

  // Late-loading fonts/images can change section heights; re-measure once.
  const onLoad = () => ScrollTrigger.refresh();
  if (document.readyState === 'complete') requestAnimationFrame(onLoad);
  else window.addEventListener('load', onLoad, { once: true });

  lenis.__cleanup = () => {
    document.removeEventListener('click', onClick);
    window.removeEventListener('load', onLoad);
    gsap.ticker.remove(raf);
  };

  return lenis;
}

export function destroySmoothScroll() {
  if (!lenis) return;
  lenis.__cleanup?.();
  lenis.destroy();
  lenis = null;
  lockCount = 0;
  pendingScroll = null;
}

export const getLenis = () => lenis;

export function scrollToTarget(target, opts = {}) {
  // A menu/modal is still closing: scroll as soon as the page is unlocked.
  if (lockCount > 0) {
    pendingScroll = [target, opts];
    return;
  }
  if (lenis) {
    lenis.scrollTo(target, {
      duration: 1.4,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      ...opts,
    });
  } else if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' });
  } else {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Reference-counted scroll lock for modals / drawers. Stops Lenis (so wheel
 * input can't scroll the page behind an overlay) and freezes native scroll.
 */
export function lockScroll() {
  lockCount += 1;
  if (lockCount === 1) {
    lenis?.stop();
    document.documentElement.classList.add('scroll-locked');
  }
}

export function unlockScroll() {
  if (lockCount === 0) return;
  lockCount -= 1;
  if (lockCount === 0) {
    document.documentElement.classList.remove('scroll-locked');
    lenis?.start();
    if (pendingScroll) {
      const [target, opts] = pendingScroll;
      pendingScroll = null;
      requestAnimationFrame(() => scrollToTarget(target, opts));
    }
  }
}
