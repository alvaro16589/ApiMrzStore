import { pool } from "../db.js";

const actionOrdersController = {
    //metod INDEX
    getOrders: async (req, res) => {
        try {
            const [rows] = (await pool.query('SELECT * FROM orders'));
            res.send(rows);
        } catch (error) {
            return res.status(500).json({
                message: 'Something wrong on server'
            })
        }
    },
    //SHOW A Orders

    getOneOrders: async (req, res) => {
        try {
            const [rows] = (await pool.query(('SELECT * FROM orders WHERE id = ?'), [req.params.id]));
            res.send(rows);
        } catch (error) {
            return res.status(500).json({
                message: 'Something wrong on server'
            })
        }
    },
    //METOD STORE
    createOrders: async (req, res) => {
        try {
            const { user_id, status_id } = req.body;
            const [rows] = await pool.query('INSERT INTO orders (user_id, status_id) VALUES (?,?)', [user_id, status_id]);
            res.send({ rows });
        } catch (error) {

            return res.status(500).json({
                message: 'Something wrong on server, function createOrders'
            })
        }
    },
    //METOD UPDATE
    updateOrders: async (req, res) => {

        try {
            const { id } = req.params;
            const { user_id, status_id } = req.body;
            const [result] = await pool.query('UPDATE orders SET user_id = IFNULL(?,user_id), status_id = IFNULL(?,status_id) WHERE id = ?', [user_id, status_id, id]);
            //console.log(result)
            if (result.affectedRows === 0) return res.status(404).json({
                message: "Orders not updated"
            }); res.sendStatus(204);
        } catch (error) {
            return res.status(500).json({
                message: 'Something wrong on server'
            })
        }
    },
    //metod DELETE
    deleteOrders: async (req, res) => {

        try {
            const [result] = await pool.query('DELETE FROM orders WHERE id = ?', [req.params.id]);

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

export default actionOrdersController