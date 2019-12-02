import React from 'react';

function CellTextarea({value, row, rowIndex, column, state, onMessage: sendMessage}) {
  if(state.mode === 'view') return value;

  function onChange(newValue) {
    sendMessage('cell.change', {previousValue: value, newValue, row, rowIndex, column});
  }

  return (
    <textarea value={value} onChange={e => onChange(e.target.value)}></textarea>
  );
}

export default CellTextarea;
