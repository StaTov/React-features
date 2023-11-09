import {
  useEffect, useRef, useState,
} from 'react';
import axios from 'axios';

interface IData {
  albumId: number,
  id: number,
  title: string,
  url: string,
  thumbnailUrl: string
}

function App() {
  const page = useRef(1);
  const totalCount = useRef(0);
  const [photo, setPhoto] = useState<IData[]>([]);
  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    if (fetching) {
      axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${page.current}`)
        .then((res) => {
          totalCount.current = res.headers['x-total-count'];
          setPhoto((prev) => [...prev, ...res.data]);
        })
        .finally(() => {
          page.current += 1;
          setFetching(false);
        });
    }
  }, [fetching]);
  const scrollHandler = () => {
    const { documentElement } = document;
    if ((documentElement.scrollHeight - (documentElement.scrollTop + window.innerHeight) < 100)
      && totalCount.current > photo.length) {
      setFetching(true);
    }
  };
  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => document.removeEventListener('scroll', scrollHandler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {photo.map((e) => (
        <div key={e.id}>
          <img src={e.thumbnailUrl} alt="" />
        </div>
      ))}
    </>
  );
}

export default App;
