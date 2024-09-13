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
 
 
    

}

export default actionViewsController