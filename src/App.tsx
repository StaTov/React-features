import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageButtons from './component/PageButtons';

const URL = 'https://jsonplaceholder.typicode.com/photos';
interface IData {
  albumId: number,
  id: number,
  title: string,
  url: string,
  thumbnailUrl: string
}

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [photos, setPhotos] = useState<IData[] | null>(null);
  useEffect(() => {
    let page = Number(searchParams.get('page'));
    let limit = Number(searchParams.get('limit'));

    page = page > 0 ? page : 1;
    limit = limit > 0 ? limit : 5;

    setSearchParams((prev) => {
      prev.set('page', String(page));
      prev.set('limit', String(limit));
      return prev;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const page = searchParams.get('page');
    const limit = searchParams.get('limit');
    const controller = new AbortController();

    axios.get(URL, {
      signal: controller.signal,
      params: {
        _limit: limit,
        _page: page,
      },
    }).then(((res) => {
      setPhotos(res.data);
    }))
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e);
      });

    return () => controller.abort();
  }, [searchParams]);
  return (
    <div>
      {photos?.map((e) => <div key={e.id}>{e.id}</div>)}
      <PageButtons />
    </div>
  );
};

export default App;
