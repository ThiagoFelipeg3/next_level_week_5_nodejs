import express from 'express';
import { createServer } from 'http';
import path from 'path';

import { Server, Socket } from 'socket.io';

import routes from './routers';
import './database';

const app = express();
const pathPublic = path.join(__dirname, '..', 'public');
console.log(__dirname);

app.use(express.static(pathPublic));
app.set('views', pathPublic);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/pages/client', (request, response) => {
    return response.render('html/client.html');
});

const http = createServer(app);
const io = new Server(http);

io.on('connection', (socket: Socket) => {
    // console.log('Se conectou', socket.id);
})

app.use(express.json());
app.use(routes);

export { http, io };