import {
  useEffect, useState,
} from 'react';
import axios from 'axios';
import {
  Route, Routes, useSearchParams,
} from 'react-router-dom';
import PageButtons from './component/PageButtons';

const URL = 'https://jsonplaceholder.typicode.com/photos?_limit=10&_page=';
interface IData {
  albumId: number,
  id: number,
  title: string,
  url: string,
  thumbnailUrl: string
}

function App() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('p');
  const [photo, setPhoto] = useState<IData[]>([]);
  useEffect(() => {
    axios.get(URL + page)
      .then((res) => {
        setPhoto(res.data);
      });
  }, [page]);
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
      </Routes>
    </>
  );
}

export default App;
