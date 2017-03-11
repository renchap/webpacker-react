import React from 'react';
import WebpackerReact from 'webpacker-react';
import HelloReact from 'components/hello';

const A = (props) => <div>Component A</div>;

WebpackerReact.setup({A, HelloReact});
