import React from 'react';
import ReactDOM from 'react-dom';
import Main from './pages/main/main.js';
import './index.scss';

ReactDOM.render(
	<Main />,
	document.querySelector('#app')
);

if(module.hot) module.hot.accept();