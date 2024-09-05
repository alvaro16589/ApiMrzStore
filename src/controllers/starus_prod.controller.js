import { pool } from "../db.js";

const actionStatusProdController = {
    //metod INDEX
    getStatusProd: async (req, res) => {
        try {
            const [rows] = (await pool.query('SELECT * FROM status_prod'));
            res.send(rows);
        } catch (error) {
            return res.status(500).json({
                message: 'Something wrong on server'
            })
        }
    },
    //SHOW A Status

    getOneStatusProd: async (req, res) => {
        try {
            const [rows] = (await pool.query(('SELECT * FROM status_prod WHERE id = ?'), [req.params.id]));
            res.send(rows);
        } catch (error) {
            return res.status(500).json({
                message: 'Something wrong on server'
            })
        }
    },
    //METOD STORE
    createStatusProd: async (req, res) => {
        try {
            const { state_p } = req.body;
            const [rows] = await pool.query('INSERT INTO status_prod (state_p) VALUES (?)', [state_p]);
            res.send({ rows });
        } catch (error) {

            return res.status(500).json({
                message: 'Something wrong on server, function createStatusProd'
            })
        }
    },
    //METOD UPDATE
    updateStatusProd: async (req, res) => {

        try {
            const { id } = req.params;
            const { state_p } = req.body;
            const [result] = await pool.query('UPDATE status_prod SET state_p = IFNULL(?,state_p) WHERE id = ?', [state_p, id]);
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
    deleteStatusProd: async (req, res) => {

        try {
            const [result] = await pool.query('DELETE FROM status_prod WHERE id = ?', [req.params.id]);

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

export default actionStatusProdController