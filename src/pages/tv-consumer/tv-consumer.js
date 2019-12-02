import React, {useState} from 'react';
import TableView from '../../components/table-view/table-view';
import ViewsCell from './views-cell/views-cell';
import {getPage} from './some-service';

function TVConsumer() {
  let descriptionCompareFn = (a, b) => a.length === b.length ? 0 : a.length > b.length ? 1 : -1;
  let config = {
    columns: [
      {id: 'name', label: 'Name', type: 'string', sortable: true},
      {id: 'page', label: 'Page Link', type: 'link'},
      {id: 'title', label: 'Title', type: 'input'},
      {id: 'status', label: 'Status', type: 'select', options: ['active', 'pending', 'inactive', 'a really really really long option']},
      {id: 'translate', label: 'Translate', type: 'checkbox', trueLabel: 'Yes', falseLabel: 'No'},
      {id: 'description', label: 'Description', type: 'textarea', sortable: true, compareFn: descriptionCompareFn },
      {id: 'views', label: 'Views', type: ViewsCell, sortable: true}
    ],
    rows: [
      {
        values: {
          name: 'Home',
          page: {
            link: 'https://tyk.io',
            label: 'tyk.io'
          },
          title: 'Tyk',
          status: 'active',
          translate: true,
          description: 'nice',
          views: 23
        },
        selected: true
      },
      {
        values: {
          name: 'Docs',
          page: {
            link: 'https://tyk.io/support/documentation/',
            label: 'tyk docs'
          },
          title: 'Tyk Docs',
          status: 'active',
          translate: false,
          description: 'nice also',
          views: 15
        },
        selected: false
      },
      {
        values: {
          name: 'Contact',
          page: {
            link: 'https://tyk.io/about/contact/',
            label: 'tyk contact'
          },
          title: 'Tyk Contact',
          status: 'pending',
          translate: true,
          description: 'nice again',
          views: 0
        },
        selected: false
      }
    ],
    mode: 'edit',
    showCheckboxColumn: true,
    pagination: {
      currentPage: 1,
      hasNext: true
    }
  };

  let [tv, setTV] = useState(null);

  function onMessage(message, data) {
    console.log('TV Message', message, ':', data);

    if(message === 'tv-api') {
      setTV(data);
    }

    if(message === 'pagination.go-previous') {
      if(data.currentPage === 1) return;
      let nextPage = data.currentPage - 1;
      getPage(nextPage)
        .then(({rows, hasNext}) => {
          tv.updatePagination(rows, {currentPage: nextPage, hasNext});
        });
    }

    if(message === 'pagination.go-next') {
      let nextPage = data.currentPage + 1;
      getPage(nextPage)
        .then(({rows, hasNext}) => {
          tv.updatePagination(rows, {currentPage: nextPage, hasNext});
        });
    }
  }

  return (
    <div className="tv-consumer">
      <label><input type="checkbox" defaultChecked={true} onChange={e => tv.setMode(e.target.checked ? 'edit' : 'view')} />Edit Mode</label>
      <label><input type="checkbox" defaultChecked={true} onChange={e => tv.showCheckboxColumn(e.target.checked)} />Show checkbox column</label>
      <TableView config={config} onMessage={onMessage} />
    </div>
  );
}

export default TVConsumer;