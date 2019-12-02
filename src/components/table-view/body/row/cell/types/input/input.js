import React from 'react';

function CellInput({value, row, rowIndex, column, state, onMessage: sendMessage}) {
  if(state.mode === 'view') return value;

  function onChange(newValue) {
    sendMessage('cell.change', {previousValue: value, newValue, row, rowIndex, column});
  }

  return (
    <input value={value} onChange={e => onChange(e.target.value)} />
  );
}

export default CellInput;
