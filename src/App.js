import React, { useState, useEffect } from 'react';

const fetch = keywords =>
  new Promise(resolve => {
    setTimeout(() => {
      const index = ['- 1', '- 2', '- 3'];
      const response = index.map((item, i) => `${keywords} ${item}`);
      return resolve(response);
    }, 10000);
  });

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
    <div className="loading">{'loading'}</div>
  ) : (
    searchResult.map((item, i) => (
      <div className="item" key={i}>
        {item}
      </div>
    ))
  );

  return (
    <div>
      <input type="text" value={inputValue} onChange={onInputChange} />
      {result}
    </div>
  );
};

export default App;
