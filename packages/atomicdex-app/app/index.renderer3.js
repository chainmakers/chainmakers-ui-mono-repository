import React from 'react';
import ReactDOM from 'react-dom';

const MOUNT_NODE = document.getElementById('root');

const render = (AppComponent, messages) => {
  ReactDOM.render(<h1>Hello, world</h1>, MOUNT_NODE);
};

render();
