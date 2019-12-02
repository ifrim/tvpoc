import React from 'react';

function CellSelect({value, row, rowIndex, column, state, onMessage: sendMessage}) {
  if(state.mode === 'view') return value;

  function onChange(newValue) {
    sendMessage('cell.change', {previousValue: value, newValue, row, rowIndex, column});
  }

  return (
    <select value={value} onChange={e => onChange(e.target.value)}>
      {column.options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );
}

export default CellSelect;
