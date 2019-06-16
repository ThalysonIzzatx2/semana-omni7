import React, { Component } from 'react';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
    'Unrecognized WebSocket'
])

import Routes from './routes';

type Props = {};
export default function App() {
    return <Routes />
}