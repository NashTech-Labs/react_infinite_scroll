// App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import InfiniteScroll from 'react-infinite-scroll-component';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = () => {
    // Simulating fetching data from an API
    setTimeout(() => {
      const newData = generateData(page, 10); // Generate some dummy data
      setData([...data, ...newData]);
      setLoading(false);
      setPage(page + 1);
      if (page >= 5) {
        // Assume we only have 5 pages of data
        setHasMore(false);
      }
    }, 1000); // Simulated delay
  };

  const generateData = (page, perPage) => {
    // Generate dummy data
    return Array.from({ length: perPage }, (_, index) => ({
      id: page * perPage + index,
      name: `Item ${page * perPage + index}`,
      description: `Description ${page * perPage + index}`
    }));
  };

  return (
    <div className="App">
      <h1>Infinite Scroll Table</h1>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more data to load</p>}
      >
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
  );
}

export default App;
