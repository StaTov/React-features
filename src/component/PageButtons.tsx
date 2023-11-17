import { useSearchParams } from 'react-router-dom';
import './PageButtons.scss';

const PageButtons = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page'));
  const limit = Number(searchParams.get('limit'));
  const totalData = 5000;
  const maxButton = totalData / limit;
  const countButton = 5;

  function createButtons(
    pageNumber: number,
    manyButtons: number,
    totalButtons :number,
  ) {
    if (totalButtons < pageNumber) {
      return [];
    }

    const middle = Math.floor(manyButtons / 2);
    const buttons = Array.from({ length: manyButtons });

    if (pageNumber <= middle) {
      return buttons.map((_, i) => i + 1);
    }

    if (totalButtons < pageNumber + middle) {
      return buttons.map((_, i) => totalButtons - manyButtons + 1 + i);
    }

    return buttons.map((_, i) => pageNumber - middle + i);
  }
  const buttons = createButtons(page, countButton, maxButton);
  return (
    <div className="container__button">
      <button
        className="arrow"
        disabled={buttons[0] === page}
        onClick={() => {
          setSearchParams((prev) => {
            prev.set('page', `${page - 1}`);
            return prev;
          });
        }}
        type="button"
      >
        {'<'}

      </button>
      {page > 5 && (
        <>
          <button
            onClick={() => {
              setSearchParams((prev) => {
                prev.set('page', '1');
                return prev;
              });
            }}
            type="button"
          >
            1
          </button>
          <span>
            ...
          </span>
        </>
      )}
      {buttons.map((n) => (
        <button
          key={n}
          disabled={page === n}
          className="pageButton"
          type="button"
          onClick={() => {
            setSearchParams((prev) => {
              prev.set('page', n.toString());
              return prev;
            });
          }}
        >
          {n}
        </button>

      ))}
      {page < (maxButton - countButton / 2) && (
        <>
          <span>
            ...
          </span>
          <button
            onClick={() => {
              setSearchParams((prev) => {
                prev.set('page', `${maxButton}`);
                return prev;
              });
            }}
            type="button"
          >
            {maxButton}
          </button>

        </>
      )}
      <button
        className="arrow"
        disabled={page === maxButton}
        onClick={() => {
          setSearchParams((prev) => {
            prev.set('page', `${page + 1}`);
            return prev;
          });
        }}
        type="button"
      >
        {'>'}

      </button>
    </div>
  );
};
export default PageButtons;
