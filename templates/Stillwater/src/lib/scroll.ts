import Lenis from "lenis";

let lenis: Lenis | null = null;

export function initSmoothScroll() {
  if (lenis) return lenis;
  lenis = new Lenis({
    duration: 1.35,
    easing: (t: number) => 1 - Math.pow(1 - t, 4),
    smoothWheel: true,
    touchMultiplier: 1.4,
  });

  function raf(time: number) {
    lenis?.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  return lenis;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: -72, duration: 1.6 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
