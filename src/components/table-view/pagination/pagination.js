import React, {useContext} from 'react';
import tvContext from '../tv-context';

function Pagination() {
  let {state, sendMessage} = useContext(tvContext);
  let {pagination: {currentPage, hasNext}} = state;

  return (
    <div className="tv-pagination">
      {currentPage > 1 && (
        <span
          className="tv-pagination-previous"
          onClick={() => sendMessage('pagination.go-previous', {currentPage})}
        >
          &larr;
        </span>
      )}
      <span className="tv-pagination-current">{currentPage}</span>
      {hasNext && (
        <span
          className="tv-pagination-next"
          onClick={() => sendMessage('pagination.go-next', {currentPage})}
        >
          &rarr;
        </span>
      )}
    </div>
  );
}

export default Pagination;
