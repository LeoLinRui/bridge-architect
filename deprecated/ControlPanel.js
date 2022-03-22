import React, { useState, useEffect } from 'react';
import Sketch from 'react-p5';

export default function ControlPanel() {
	const ControlPanelSetup = (p5, parentRef) => {
		p5.createCanvas(window.innerWidth * 0.98, window.innerHeight * 0.17).parent(parentRef);
	};

	const ControlPanelDraw = (p5) => {
		p5.background(200);
		p5.strokeWeight(50);
		p5.point(p5.mouseX, p5.mouseY);
	};

	return <Sketch setup={ControlPanelSetup} draw={ControlPanelDraw} />;
}
