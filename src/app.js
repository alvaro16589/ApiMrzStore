import express from "express";
import statusRoutes from "./routes/status.routes.js"
import statusProdRoutes from "./routes/starus_prod.routes.js"
import categoryRoutes from "./routes/category.routes.js"
import OrderRoutes from "./routes/orders.routes.js"
import UsersRoutes from "./routes/users.routes.js"
import ProductsRoutes from "./routes/products.routes.js"
import OrderItemsRoutes from "./routes/orderItems.routes.js"
import ViewsRoutes from "./routes/views.routes.js"
import fileRoutes from "./routes/file.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors";
//import routes
const app = express();
app.use(express.json())//convert  body to jSon sentence
app.use(cookieParser());//middleware for cookies

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
    methods: "GET, PUT, PATCH, POST, DELETE",
    allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
}));


const pref = '/api';
//connect to routes
app.use(pref, statusRoutes);
app.use(pref, statusProdRoutes);
app.use(pref, categoryRoutes);
app.use(pref, OrderRoutes);
app.use(pref, UsersRoutes);
app.use(pref, ProductsRoutes);
app.use(pref, OrderItemsRoutes);
app.use(pref, ViewsRoutes);
app.use(pref, fileRoutes);

//middlewere

app.use((req, res, next) => {
    res.status(400).json({
        message: 'Route not found'
    })
})

export default app
