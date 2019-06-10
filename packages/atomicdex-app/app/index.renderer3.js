import React from 'react';
import ReactDOM from 'react-dom';

const MOUNT_NODE = document.getElementById('root');

const render = () => {
  ReactDOM.render(<h1>Hello, world</h1>, MOUNT_NODE);
};

render();
