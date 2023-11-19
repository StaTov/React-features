import { useEffect, useRef, useState } from 'react';

const useObserver = (triggerOnce = false): [React.RefObject<HTMLDivElement>, boolean] => {
  const observer = useRef<IntersectionObserver>();
  const ref = useRef<HTMLDivElement>(null);
  const trigger = useRef(triggerOnce);
  const [isView, setIsView] = useState(false);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (trigger.current) {
          setIsView(true);
          return;
        }
        setIsView(entry.isIntersecting);
      },
    );
    if (ref.current) {
      observer.current.observe(ref.current);
    }
    return () => {
      observer.current?.disconnect();
    };
  }, []);

  return [ref, isView];
};

export default useObserver;
