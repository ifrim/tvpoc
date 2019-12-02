import React from 'react';

function CellString({value, column}) {
  return (
    <div
      className="tv-cell-string"
      title={value}
    >
      {value}
    </div>
  );
}

export default CellString;
