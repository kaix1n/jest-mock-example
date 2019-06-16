import React, { useState, useEffect } from 'react';

const fetch = keywords =>
  new Promise(resolve => {
    setTimeout(() => {
      const index = ['- 1', '- 2', '- 3'];
      const response = index.map((item, i) => `${keywords} ${item}`);
      return resolve(response);
    }, 10000);
  });

const Loading = () => 'loading';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const onInputChange = event => setInputValue(event.target.value);

  useEffect(() => {
    if (inputValue) {
      let cancel = false;
      setLoading(true);
      fetch(inputValue).then(response => {
        if (!cancel) {
          console.log({ response });
          cancel = true;
          setSearchResult(response);
          setLoading(false);
        }
      });
      return () => {
        cancel = true;
      };
    } else {
      setSearchResult([]);
    }
  }, [inputValue]);

  const result = loading ? (
    <Loading />
  ) : (
    searchResult.map((item, i) => <div key={i}>{item}</div>)
  );

  return (
    <div>
      <input type="text" value={inputValue} onChange={onInputChange} />
      {result}
    </div>
  );
};

export default App;
