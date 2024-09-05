import { pool } from "../db.js";

const actionCategoryController = {
    //metod INDEX
    getCategory: async (req, res) => {
        try {
            const [rows] = (await pool.query('SELECT * FROM category'));
            res.send(rows);
        } catch (error) {
            return res.status(500).json({
                message: 'Something wrong on server'
            })
        }
    },
    //SHOW A Category

    getOneCategory: async (req, res) => {
        try {
            const [rows] = (await pool.query(('SELECT * FROM category WHERE id = ?'), [req.params.id]));
            res.send(rows);
        } catch (error) {
            return res.status(500).json({
                message: 'Something wrong on server'
            })
        }
    },
    //METOD STORE
    createCategory: async (req, res) => {
        try {
            const { category } = req.body;
            const [rows] = await pool.query('INSERT INTO category (category) VALUES (?)', [category]);
            res.send({ rows });
        } catch (error) {

            return res.status(500).json({
                message: 'Something wrong on server, function createCategory'
            })
        }
    },
    //METOD UPDATE
    updateCategory: async (req, res) => {

        try {
            const { id } = req.params;
            const { category } = req.body;
            const [result] = await pool.query('UPDATE category SET category = IFNULL(?,category) WHERE id = ?', [category, id]);
            //console.log(result)
            if (result.affectedRows === 0) return res.status(404).json({
                message: "Category not updated"
            }); res.sendStatus(204);
        } catch (error) {
            return res.status(500).json({
                message: 'Something wrong on server'
            })
        }
    },
    //metod DELETE
    deleteCategory: async (req, res) => {

        try {
            const [result] = await pool.query('DELETE FROM category WHERE id = ?', [req.params.id]);

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

export default actionCategoryController