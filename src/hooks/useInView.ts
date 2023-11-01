import { useEffect, useState, useRef } from "react";
import type { MutableRefObject } from "react";

type TargetRef = MutableRefObject<HTMLElement | null>;
const useInView = (
  options: IntersectionObserverInit = {
    root: null,
    rootMargin: "0px",
    threshold: 0, // 0 部分可见即为可见 1 部分可见为不可见
  },
  triggerOnce = false
): [TargetRef, boolean] => {
  const [inView, setInView] = useState(false);
  const targetRef: TargetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else {
          setInView(false);
        }
      });
    }, options);

    if (targetRef?.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef?.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(targetRef.current);
      }
    };
  }, [options, triggerOnce]);

  return [targetRef, inView];
};

export default useInView;
