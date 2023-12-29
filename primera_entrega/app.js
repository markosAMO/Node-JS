import express from 'express';
const app = express();
import productRoutes from './src/routes/products.js'
import cartRoutes from './src/routes/carts.js'

app.use(express.json());
app.use('/products', productRoutes);
app.use('/carts', cartRoutes);

app.listen(8080, () => console.log("Server listen in port 8080"));

