import React, { useState, useEffect } from 'react';
import Sketch from 'react-p5';

export default function WaitingPage({ state }) {
	const WaitingPageSetup = (p5, parentRef) => {
		p5.createCanvas(window.innerWidth * 0.98, window.innerHeight * 0.9).parent(parentRef);
		p5.background(200);
	};

	const WaitingPageDraw = (p5) => {
		p5.strokeWeight(10);
		p5.point(p5.mouseX, p5.mouseY);
	};

	const startGame = () => {
		state.page.set('building');
	};

	return (
		<div>
			<Sketch setup={WaitingPageSetup} draw={WaitingPageDraw} />
			<button onClick={startGame}>START GAME</button>
		</div>
	);
}
