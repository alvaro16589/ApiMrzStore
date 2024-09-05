import { pool } from "../db.js";

const actionOrdersItemsController = {
    //metod INDEX
    getOrdersItems: async (req, res) => {
        try {
            const [rows] = (await pool.query('SELECT * FROM order_items'));
            res.send(rows);
        } catch (error) {
            return res.status(500).json({
                message: 'Something wrong on server'
            })
        }
    },
    //SHOW A OrdersItems

    getOneOrdersItems: async (req, res) => {
        try {
            const [rows] = (await pool.query(('SELECT * FROM order_items WHERE id = ?'), [req.params.id]));
            res.send(rows);
        } catch (error) {
            return res.status(500).json({
                message: 'Something wrong on server'
            })
        }
    },
    //METOD STORE
    createOrdersItems: async (req, res) => {
        try {
            const { order_id, product_id, quantity } = req.body;
            const [rows] = await pool.query('INSERT INTO order_items (order_id, product_id, quantity) VALUES (?,?,?)', [order_id, product_id, quantity]);
            res.send({ rows });
        } catch (error) {

            return res.status(500).json({
                message: 'Something wrong on server, function createOrdersItems'
            })
        }
    },
    //METOD UPDATE
    updateOrdersItems: async (req, res) => {

        try {
            const { id } = req.params;
            const { order_id, product_id, quantity } = req.body;
            const [result] = await pool.query('UPDATE order_items SET order_id = IFNULL(?,order_id), product_id = IFNULL(?,product_id), quantity = IFNULL(?,quantity) WHERE id = ?', [order_id, product_id, quantity, id]);
            //console.log(result)
            if (result.affectedRows === 0) return res.status(404).json({
                message: "OrdersItems not updated"
            }); res.sendStatus(204);
        } catch (error) {
            return res.status(500).json({
                message: 'Something wrong on server'
            })
        }
    },
    //metod DELETE
    deleteOrdersItems: async (req, res) => {

        try {
            const [result] = await pool.query('DELETE FROM order_items WHERE id = ?', [req.params.id]);

            if (result.affectedRows === 0) return res.status(404).json({
                message: "Customer not found"
            }); res.sendStatus(204);
        } catch (error) {
            return res.status(500).json({
                message: 'Something wrong on server'
            })
        }
    }

}

export default actionOrdersItemsController