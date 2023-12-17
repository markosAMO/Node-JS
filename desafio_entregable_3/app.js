import express from 'express';
const app = express();
import productRoutes from './src/routes/products.js'

app.use('/products', productRoutes);

app.listen(8080, () => console.log("Server listen in port 8080"));
