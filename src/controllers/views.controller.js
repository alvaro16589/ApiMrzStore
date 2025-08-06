import { pool } from "../db.js";

const actionViewsController = {
    //metod INDEX
    getAllProductsCatStatus: async (req, res) => {
        try {
            const [rows] = (await pool.query('SELECT * FROM category_product_view'));
            res.send(rows);
        } catch (error) {
            return res.status(500).json({
                message: 'Something wrong on server'
            })
        }
    },
    //metod INDEX
    getAllProductsAndOrders: async (req, res) => {
        try {
            const {id_user} = req.body
            const [rows] = (await pool.query(
                `SELECT 
                    order_items.id, 
                    order_items.order_id, 
                    order_items.product_id, 
                    quantity, 
                    order_items.created_at, 
                    products.name, 
                    description, 
                    price, 
                    image, 
                    state 
                FROM order_items 
                INNER JOIN products ON order_items.product_id = products.id 
                INNER JOIN orders ON orders.id = order_items.order_id 
                INNER JOIN status ON status.id = orders.status_id
                WHERE orders.user_id = ?`,
                [id_user] ));
            res.send(rows);
        } catch (error) {
            return res.status(500).json({
                message: 'Something wrong on server'
            })
        }
    }



}

export default actionViewsController