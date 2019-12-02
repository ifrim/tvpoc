import React from 'react';

function ViewsCell({value, row, rowIndex, column, state, onMessage: sendMessage}) {
  if(state.mode === 'view') return value;

  function onChange(newValue) {
    sendMessage('cell.change', {previousValue: value, newValue, row, rowIndex, column});
  }

  return (
    <div className="tv-cell-views">
      <button onClick={() => { if(value > 0) onChange(value -1); }}>-</button>
      {value}
      <button onClick={() => onChange(value + 1)}>+</button>
    </div>
  );
}

export default ViewsCell;