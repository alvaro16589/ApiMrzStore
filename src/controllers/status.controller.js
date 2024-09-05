import { pool } from "../db.js";

const actionStatusController = {
    //metod INDEX
    getStatus: async (req, res) => {
        try {
            const [rows] = (await pool.query('SELECT * FROM status'));
            res.send(rows);
        } catch (error) {
            return res.status(500).json({
                message: 'Something wrong on server'
            })
        }
    },
    //SHOW A Status

    getOneStatus: async (req, res) => {
        try {
            const [rows] = (await pool.query(('SELECT * FROM status WHERE id = ?'), [req.params.id]));
            res.send(rows);
        } catch (error) {
            return res.status(500).json({
                message: 'Something wrong on server'
            })
        }
    },
    //METOD STORE
    createStatus: async (req, res) => {
        try {
            const { state } = req.body;
            const [rows] = await pool.query('INSERT INTO status (state) VALUES (?)', [state]);
            res.send({ rows });
        } catch (error) {

            return res.status(500).json({
                message: 'Something wrong on server, function createStatus'
            })
        }
    },
    //METOD UPDATE
    updateStatus: async (req, res) => {

        try {
            const { id } = req.params;
            const { state } = req.body;
            const [result] = await pool.query('UPDATE status SET state = IFNULL(?,state) WHERE id = ?', [state, id]);
            //console.log(result)
            if (result.affectedRows === 0) return res.status(404).json({
                message: "Status not updated"
            }); res.sendStatus(204);
        } catch (error) {
            return res.status(500).json({
                message: 'Something wrong on server'
            })
        }
    },
    //metod DELETE
    deleteStatus: async (req, res) => {

        try {
            const [result] = await pool.query('DELETE FROM status WHERE id = ?', [req.params.id]);

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

export default actionStatusController