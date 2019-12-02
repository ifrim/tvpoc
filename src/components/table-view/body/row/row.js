import React, {useContext} from 'react';
import tvContext from '../../tv-context';
import Cell from './cell/cell';

function Row({row, rowIndex}) {
  let {state, sendMessage} = useContext(tvContext);
  let classes = [
    'tv-row',
    row.selected && 'tv-row-selected'
  ].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      {state.showCheckboxColumn && (
        <div className={`tv-cell tv-cell-row-checkbox`}>
          <input
            type="checkbox"
            checked={row.selected}
            onChange={e => sendMessage('rows.select-row', {rowIndex, selected: e.target.checked})}
          />
        </div>
      )}
      {state.columns.map(col => (
        <Cell
          key={col.id}
          value={row.values[col.id]}
          row={row}
          rowIndex={rowIndex}
          column={col}
          state={state}
        />
      ))}
    </div>
  );
}

export default Row;