import React, { useState, useEffect } from 'react';
import MainViewport from './MainViewport';
import WaitingPage from './WaitingPage';
import io from 'socket.io';

var socket = io();

//States component manages the values and update functions of all state variables
//and syncs their values with the backend
const States = () => {
	//Page status: waiting page, building phase, testing phase, result page
	const [pageState, setPageState] = useState('waiting');
	useEffect(() => {
		socket.emit('updatePageState', pageState);
	}, [pageState]);
	socket.on('updatePageState', setPageState);

	//synced states
	//const [userPosition, setUserPosition] = useState([{ x1: 0, y1: 0, x2: 0, y2: 0 }]);
	//useEffect(() => {
	//	socket.emit('upUserPosition', userPosition);
	//}, [userPosition]);
	//socket.on('downUserPosition', setUserPosition);

	//const [gameTime, setGameTime] = useState(0);
	//const [factoryState, setFactoryState] = useState({ avialable: false });
	//const [trussState, setTrussState] = useState({ x: 0, y: 0, type: 'wood' });

	return {
		page: {
			value: pageState,
			set: setPageState,
		},
		position: {},
	};
};

export default function App() {
	var state = States();

	socket.on('connection', () => {
		console.log(`socket connected`);
	});

	if (state.page.value === 'waiting') {
		//return waiting component
		return (
			<div className="App">
				<WaitingPage state={state} />
			</div>
		);
	} else if (state.page.value === 'building') {
		//return building component
		return (
			<div className="App">
				<MainViewport state={state} socket={socket} />
			</div>
		);
	} else if (state.page.value === 'testing') {
		//return testing component
	} else if (state.page.value === 'result') {
		//return result component
	}
}
