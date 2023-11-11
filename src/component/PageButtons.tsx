import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function PageButtons() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('p'));
  const [tens, setTens] = useState(page % 10
    ? Math.floor(page / 10) * 10
    : Math.floor(page / 10) * 10 - 10);
  const buttonPage = Array.from({ length: 10 }, (_, i) => i + 1 + tens);
  return (
    <div>
      <button
        disabled={tens === 0}
        onClick={() => {
          if (tens > 0) {
            setSearchParams({ p: `${tens - 9}` });
            setTens(tens - 10);
          }
        }}
        type="button"
      >
        {'<'}

      </button>
      {buttonPage.map((n) => (

        <button
          key={n}
          disabled={page === n}
          type="button"
          onClick={() => {
            setSearchParams({ p: `${n}` });
          }}
        >
          {n}
        </button>

      ))}
      <button
        disabled={tens >= 490}
        onClick={() => {
          setSearchParams({ p: `${tens + 11}` });
          setTens(tens + 10);
        }}
        type="button"
      >
        {'>'}

      </button>
    </div>
  );
}
export default PageButtons;
