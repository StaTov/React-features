import { useGetAllQuery } from './api/rtkq';

function App() {
  const limit = localStorage.getItem('limit');
  const { data, error, isLoading } = useGetAllQuery(limit || '3');
  if (error) {
    return <div>Error</div>;
  }
  if (isLoading) {
    return <div>...loading</div>;
  }
  return (
    <div>
      {data?.map(({ id }) => <div key={id}>{id}</div>)}
    </div>
  );
}

export default App;
