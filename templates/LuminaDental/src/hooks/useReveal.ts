import { useEffect, useRef, useCallback, type RefObject } from 'react';

interface UseRevealOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
  staggerDelay?: number;
}

export function useReveal(options: UseRevealOptions = {}): RefObject<HTMLDivElement | null> {
  const { threshold = 0.1, rootMargin = '0px 0px -40px 0px', delay = 0 } = options;
  const ref = useRef<HTMLDivElement | null>(null);

  const observerCallback = useCallback((node: HTMLElement) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('revealed');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );
    observer.observe(node);
    return observer;
  }, [threshold, rootMargin, delay]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = observerCallback(node);
    return () => observer.disconnect();
  }, [observerCallback]);

  return ref;
}

export function useRevealStagger(count: number, options: UseRevealOptions = {}) {
  const { threshold = 0.1, rootMargin = '0px 0px -40px 0px', delay = 0, staggerDelay = 120 } = options;
  const elementRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    elementRefs.current.length = count;
  }, [count]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    elementRefs.current.forEach((node, index) => {
      if (!node) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                entry.target.classList.add('revealed');
              }, delay + index * staggerDelay);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold, rootMargin }
      );

      observer.observe(node);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [threshold, rootMargin, delay, count, staggerDelay]);

  return elementRefs;
}
