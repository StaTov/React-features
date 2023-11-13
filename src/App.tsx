import {
  useEffect, useState,
} from 'react';
import axios from 'axios';
import {
  Route, Routes, useLocation, useSearchParams,
} from 'react-router-dom';
import PageButtons from './component/PageButtons';

interface IData {
  albumId: number,
  id: number,
  title: string,
  url: string,
  thumbnailUrl: string
}
const URL = 'https://jsonplaceholder.typicode.com/photos';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [photo, setPhoto] = useState<IData[]>([]);

  useEffect(() => {
    let page = Number(searchParams.get('page'));
    let limit = Number(searchParams.get('limit'));

    page = page > 1 ? page : 1;
    limit = limit >= 10 ? limit : 10;

    setSearchParams((prev) => {
      prev.set('page', String(page));
      prev.set('limit', String(limit));
      return prev;
    }, { replace: true, state: location.state });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const page = searchParams.get('page');
    const limit = searchParams.get('limit');
    const controller = new AbortController();
    axios.get(`${URL}?_limit=${limit}&_page=${page}`, {
      signal: controller.signal,
    })
      .then((res) => {
        setPhoto(res.data);
      })
      .catch((e) => console.log(e));
    return () => {
      controller.abort();
    };
  }, [searchParams]);

  return (
    <>
      <PageButtons />
      <Routes>
        <Route
          path="/"
          element={
            photo.map((e) => (
              <div key={e.id}>
                <img src={e.thumbnailUrl} alt="" />
              </div>
            ))
          }
        />
        <Route path="/1" element={<div>1</div>} />
      </Routes>
    </>
  );
}

export default App;
