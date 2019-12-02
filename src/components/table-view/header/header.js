import React, {useContext} from 'react';
import tvContext from '../tv-context';

function Header() {
  let {state, sendMessage} = useContext(tvContext);
  let getColClasses = col => [
    'tv-column',
    col.sortable && 'tv-column-sortable',
    !col.sortable ?
      '' :
      state.sort.columnId !== col.id ?
        'tv-column-not-sorted' :
        state.sort.direction === 'ASC' ?
          'tv-column-sorted-asc' :
          'tv-column-sorted-desc'
  ].filter(Boolean).join(' ');

  return (
    <div className="tv-header">
      {state.showCheckboxColumn && (
        <div className="tv-column tv-column-checkbox">
          <input
            type="checkbox"
            checked={state.rows.every(row => row.selected)}
            onChange={e => sendMessage('rows.select-all', e.target.checked)}
          />
        </div>
      )}
      {state.columns.map(col => (
        <div
          key={col.id}
          className={getColClasses(col)}
          onClick={() => col.sortable && sendMessage('columns.sort', col.id)}
        >
          {col.label}
        </div>
      ))}
    </div>
  );
}

export default Header;
