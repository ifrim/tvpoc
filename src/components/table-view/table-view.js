import React, {useState, useEffect, useCallback} from 'react';
import tvContext from './tv-context';
import Header from './header/header';
import Body from './body/body';
import Pagination from './pagination/pagination';
import cloneDeep from 'lodash/cloneDeep';

function TableView({config, onMessage: sendMessage}) {

  let [state, setState] = useState(null);

  let defaultCompareFn = (a, b) => a === b ? 0 : a > b ? 1 : -1;

  function onMessage(message, data) {
    if(message === 'cell.change') {
      let {row, rowIndex, column, newValue} = data;
      let stateRow = state.rows[rowIndex];
      setState({
        ...state,
        rows: [
          ...state.rows.slice(0, rowIndex),
          {
            ...stateRow,
            values: {...stateRow.values, [column.id]: newValue}
          },
          ...state.rows.slice(rowIndex + 1)
        ]
      });
      sendMessage(message, data);
    }

    if(message === 'rows.select-all') {
      setState({
        ...state,
        rows: state.rows.map(row => ({...row, selected: data}))
      });
      sendMessage(message, data);
    }

    if(message === 'rows.select-row') {
      let {rowIndex, selected} = data;
      let stateRow = state.rows[rowIndex];
      setState({
        ...state,
        rows: [
          ...state.rows.slice(0, rowIndex),
          {...stateRow, selected},
          ...state.rows.slice(rowIndex + 1)
        ]
      });
      sendMessage(message, data);
    }

    if(message === 'columns.sort') {
      let columnId = data;
      let direction = state.sort.columnId !== columnId || state.sort.direction === 'DESC' ? 'ASC' : 'DESC';
      let column = state.columns.find(col => col.id === columnId);
      let compFn = (a, b) => {
        let v1 = a.values[columnId];
        let v2 = b.values[columnId];
        let compareFn = column.compareFn ?? defaultCompareFn;
        let compResult = compareFn(v1, v2);
        return direction === 'ASC' ? compResult : -compResult;
      };
      setState({
        ...state,
        sort: {columnId, direction},
        rows: [...state.rows.sort(compFn)]
      });
      sendMessage(message, data);
    }

    if(message === 'pagination.go-previous') {
      sendMessage(message, data);
    }

    if(message === 'pagination.go-next') {
      sendMessage(message, data);
    }
  }

  useEffect(() => {
    let compState = cloneDeep(config);

    let defaultSort = {columnId: null, direction: 'ASC'};
    compState.sort = {...defaultSort, ...compState.sort};
    setState(compState);
  }, []);

  useEffect(() => {
    sendMessage('tv-api', {
      getState: () => state,
      setState: newState => setState(newState),
      setMode: mode => setState({...state, mode}),
      showCheckboxColumn: show => setState({...state, showCheckboxColumn: show}),
      updatePagination: (rows, pagination) => {
        setState({
          ...state,
          rows,
          pagination
        })
      }
    });
  }, [state]);

  if (state === null) return <div>Not initialized UI</div>;

  return (
    <tvContext.Provider value={{state, sendMessage: onMessage}}>
      <div className="table-view">
        <Header />
        <Body />
        <Pagination data={state.pagination} />
      </div>
    </tvContext.Provider>
  );
}

export default TableView;