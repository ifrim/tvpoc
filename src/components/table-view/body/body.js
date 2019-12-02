import React, {useContext} from 'react';
import tvContext from '../tv-context';
import Row from './row/row';

function Body() {
  let {state} = useContext(tvContext);

  return (
    <div className="tv-body">
      {state.rows.map((row, index) => (
        <Row key={index} row={row} rowIndex={index} />
      ))}
    </div>
  );
}

export default Body;
