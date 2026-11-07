import { useEffect } from 'react';
import { lockScroll, unlockScroll } from './smoothScroll';

/** Lock page scrolling (Lenis + native) while `active` is true. */
export default function useScrollLock(active) {
  useEffect(() => {
    if (!active) return undefined;
    lockScroll();
    return unlockScroll;
  }, [active]);
}
