import express from "express";
import statusRoutes from "./routes/status.routes.js"
import statusProdRoutes from "./routes/starus_prod.routes.js"
import categoryRoutes from "./routes/category.routes.js"
import OrderRoutes from "./routes/orders.routes.js"
import UsersRoutes from "./routes/users.routes.js"
import ProductsRoutes from "./routes/products.routes.js"
import OrderItemsRoutes from "./routes/orderItems.routes.js"
import ViewsRoutes from "./routes/views.routes.js"
//import routes
const app = express();
app.use(express.json())//convert  body to jSon sentence
const pref = '/api';
app.use((req, res, next) => {//permisos cors para los request de angular
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
})

//connect to routes
app.use(pref, statusRoutes);
app.use(pref, statusProdRoutes);
app.use(pref, categoryRoutes);
app.use(pref, OrderRoutes);
app.use(pref, UsersRoutes);
app.use(pref, ProductsRoutes);
app.use(pref, OrderItemsRoutes);
app.use(pref, ViewsRoutes);
//middlewere

app.unsubscribe((req, res, next) => {
    res.status(400).json({
        message: 'Route not found'
    })
})

export default app
