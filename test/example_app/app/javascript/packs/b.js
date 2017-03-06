import React from 'react';
import WebpackerReact from 'webpacker-react';

const HelloReact = (props) => <div>This component will be ignored</div>;
const B = (props) => <div>Component B</div>;

WebpackerReact.setup({HelloReact, B});