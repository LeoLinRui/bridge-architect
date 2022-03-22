import express from 'express';
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
	transports: ['websocket'], //set to use websocket only
}); //this loads socket.io and connects it to the server.

const port = process.env.PORT || 8080;

console.log('Initializing server...');

app.use(express.static(__dirname + '/public'));
//we just have 1 route to the home page rendering an index html
app.get('/', (req, res) => {
	res.render('index.html');
});

//run the server which uses express
http.listen(port, () => {
	console.log(`Server is active at port:${port}`);
});

//intialize state variable
var state = {};
state.userPosition = {};

//configuration for position data broadcasting
io.on('connection', (socket) => {
	console.log(`${socket.id} connected`);

	state.userPosition[socket.id] = { x: 0, y: 0 };

	socket.on('disconnect', () => {
		delete state.userPosition[socket.id];
		console.log(`${socket.id} disconnected`);
	});

	socket.on('upUserPosition', (data) => {
		state.userPosition[socket.id].x = data.x;
		state.userPosition[socket.id].y = data.y;
	});
});

const dataRate = 30;
setInterval(() => {
	io.emit('downUserPosition', dataRate);
}, 1000 / dataRate);
