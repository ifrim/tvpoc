import React, {useContext} from 'react';
import CellTypes from './types';
import tvContext from '../../../tv-context';

function Cell({value, row, rowIndex, column, state}) {
  let {sendMessage} = useContext(tvContext);
  let Component = typeof column.type === 'string' ? CellTypes[column.type] : column.type;
  let classes = [
    'tv-cell',
    `tv-cell-${typeof column.type === 'string' ? column.type : 'custom'}`,
    `mode-${state.mode}`
  ].join(' ');
  return (
    <div className={classes}>
      <Component
        value={value}
        row={row}
        rowIndex={rowIndex}
        column={column}
        onMessage={sendMessage}
        state={state}
      />
    </div>
  );
}

export default Cell;
