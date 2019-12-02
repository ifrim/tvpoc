import React from 'react';

function CellLink({value, column}) {
  let link = value.link;
  let label = value.label ?? value.link;
  return (
    <div className="tv-cell-link">
      <a href={link} title={label}>{label}</a>
    </div>
  );
}

export default CellLink;
