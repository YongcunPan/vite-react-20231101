import { useEffect, useRef } from 'react';
import { equals } from 'ramda';

const useDeepEffect = (callback: () => void, deps: any) => {
  const emitEffect = useRef(0);
  const prevDeps = useRef(deps);
  if (!equals(prevDeps.current, deps)) {
    // 当深比较不相等的时候，修改emitEffect.current的值，触发下面的useEffect更新
    emitEffect.current++;
  }
  prevDeps.current = deps;
  return useEffect(callback, [emitEffect.current]);
};

export default useDeepEffect;
