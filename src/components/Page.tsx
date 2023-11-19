import { IData } from '../types/photo';

interface IProps {
  photo: IData[];
}

const Page = ({ photo }: IProps) => (
  <div style={{ minHeight: '100vh' }}>
    {photo.map((e) => (
      <div key={e.id}>
        <div>{e.id}</div>
        <img src={e.thumbnailUrl} alt="" />
      </div>
    ))}
  </div>
);

export default Page;
