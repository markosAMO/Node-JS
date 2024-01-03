import express from 'express';
import productRoutes from './src/routes/products.js'
import cartRoutes from './src/routes/carts.js'
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import __dirname from '/utils.js';

const app = express();
app.use(express.json());
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

const httpServer = app.listen(8080, () => console.log("Server listen in port 8080"));

const socketServer = new Server(httpServer);
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname+'/public'));
app.use('/', viewsRouter);

socketServer.on('connection', socket => {
    console.log("nuevo cliente conectado");
})
