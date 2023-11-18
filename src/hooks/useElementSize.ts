import { useEffect, useState, useRef } from "react";
import type { MutableRefObject } from "react";

interface IUseElementSize {
  /**
   * @description: 高
   * @return {*}
   */
  height: number;
  /**
   * @description: 宽
   * @return {*}
   */
  width: number;
}

type TargetRef = MutableRefObject<HTMLElement | null>;
const useElementSize = (): [
  TargetRef,
  IUseElementSize["height"],
  IUseElementSize["width"]
] => {
  const targetRef: TargetRef = useRef<HTMLElement | null>(null);

  const [size, setSize] = useState<IUseElementSize>({ height: 0, width: 0 });

  useEffect(() => {
    if (targetRef.current) {
      const height = targetRef.current.clientHeight;
      const width = targetRef.current.clientWidth;
      setSize({ height, width });
    }
    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === targetRef.current) {
          const height = entry.contentRect.height;
          const width = entry.contentRect.width;
          setSize({ height, width });
        }
      });
    });

    if (targetRef?.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef?.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  return [targetRef, size.height, size.width];
};

export default useElementSize;
