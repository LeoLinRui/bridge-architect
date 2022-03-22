import React, { useState, useEffect } from 'react';
import Sketch from 'react-p5';

export default function MainViewPort({ state, socket }) {
	var H = 0;
	var W = 0;
	var cvs;

	const MainViewportSetup = (p5, parentRef) => {
		p5.frameRate(30); //set framerate to 30, same as server

		H = window.innerHeight * 0.97;
		W = window.innerWidth * 0.99;

		cvs = p5.createCanvas(W, H).parent(parentRef);

		cvs.mousePressed(() => {
			//when user click on the canvas, update position
			socket.emit('upUserPosition', {
				x: p5.mouseX / W, //send relative number of position between 0 and 1
				y: p5.mouseY / H, //so it positions are the relatively the same on different screen sizes.
			});
		});

		socket.on('downUserPosition', (data) => {
			//get the data from the server
			state.position = data;
		});
	};

	const MainViewportDraw = (p5) => {
		cvs.background(200);
		cvs.strokeWeight(50);
		for (const id in state.position) {
			const position = state.position[id].value;
			cvs.point(position.x, position.y);
		}
	};

	return <Sketch setup={MainViewportSetup} draw={MainViewportDraw} />;
}
