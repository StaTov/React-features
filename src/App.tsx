import {
  useEffect, useRef, useState,
} from 'react';
import axios from 'axios';
import Page from './components/Page';
import { IData } from './types/photo';

const App = () => {
  const [page, setPage] = useState(1);
  const [photo, setPhoto] = useState<IData[]>([]);
  const [isloading, setIsLoading] = useState(false);
  const controller = useRef<AbortController>();
  const lastElement = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver>();
  const totalPhoto = useRef(0);

  useEffect(() => {
    if (isloading) return;
    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && photo.length < totalPhoto.current) {
          setPage((p) => p + 1);
        }
      },
    );
    if (lastElement.current) {
      observer.current.observe(lastElement.current);
    }
    // eslint-disable-next-line consistent-return
    return () => {
      observer?.current?.disconnect();
    };
  }, [isloading, photo.length]);

  useEffect(() => {
    setIsLoading(true);
    controller.current = new AbortController();
    axios.get('https://jsonplaceholder.typicode.com/photos', {
      signal: controller.current.signal,
      params: {
        _limit: 10,
        _page: page,
      },
    })
      .then((res) => {
        setPhoto((prev) => [...prev, ...res.data]);
        totalPhoto.current = res.headers['x-total-count'];
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));

    return () => controller?.current?.abort();
  }, [page]);

  return (
    <>
      <Page photo={photo} />
      <div ref={lastElement} />
    </>
  );
};

export default App;
