import useObserver from '../hooks/useObserver';

const Test = () => {
  const [ref, isView] = useObserver();

  return (
    <>
      <div style={{ backgroundColor: 'red', height: '100vh' }}>
        Hello
      </div>
      <div ref={ref} />
    </>
  );
};

export default Test;
