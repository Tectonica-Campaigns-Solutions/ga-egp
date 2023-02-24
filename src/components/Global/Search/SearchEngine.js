import React, { useState } from 'react';
import { buildClient } from '@datocms/cma-client-browser';

import { useSiteSearch } from 'react-datocms';
const client = buildClient({ apiToken: 'a835f214689eaa72fa0f49fd3c5c1f' });
export default function SearchEngine() {
  const [query, setQuery] = useState('');
  const { state, error, data } = useSiteSearch({
    client,
    buildTriggerId: '26249',
    resultsPerPage: 10,
  });
  
  return (
    <div className="mt-5">
      <label htmlFor="search-input">Search this website</label>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          state.setQuery(query);
        }}
      >
        <input
          id="search-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      {!data && !error && <p>Loading...</p>}
      {error && <p>Error! {error}</p>}
      {data && (
        <>
          {data.pageResults.map((result) => (
            <div key={result.id}>
              <a href={result.url}>{result.title}</a>
              <div>{result.bodyExcerpt}</div>
              <div>{result.url}</div>
            </div>
          ))}
          {/* <p>Total results: {data.totalResults}</p> */}
          
        </>
      )}
    </div>
  );
}