import React from 'react';

function CellCheckbox({value, row, rowIndex, column, state, onMessage: sendMessage}) {
  let trueLabel = column.trueLabel ?? 'true';
  let falseLabel = column.falseLabel ?? 'false';
  if(state.mode === 'view') return Boolean(value) ? trueLabel : falseLabel;

  function onChange(newValue) {
    sendMessage('cell.change', {previousValue: Boolean(value), newValue, row, rowIndex, column});
  }

  return (
    <input type="checkbox" checked={Boolean(value)} onChange={e => onChange(e.target.checked)} />
  );
}

export default CellCheckbox;
