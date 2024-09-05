import { pool } from "../db.js";

const actionUsersController = {
    //metod INDEX
    getUsers: async (req, res) => {
        try {
            const [rows] = (await pool.query('SELECT * FROM users'));
            res.send(rows);
        } catch (error) {
            return res.status(500).json({
                message: 'Something wrong on server'
            })
        }
    },
    //SHOW A Users

    getOneUsers: async (req, res) => {
        try {
            const [rows] = (await pool.query(('SELECT * FROM users WHERE id = ?'), [req.params.id]));
            res.send(rows);
        } catch (error) {
            return res.status(500).json({
                message: 'Something wrong on server'
            })
        }
    },
    //METOD STORE
    createUsers: async (req, res) => {
        try {
            const { name, last_name, email, gender, date_of_birth } = req.body;
            const [rows] = await pool.query('INSERT INTO users (name, last_name, email, gender, date_of_birth) VALUES (?,?,?,?,?)', [name, last_name, email, gender, date_of_birth ]);
            res.send({ rows });
        } catch (error) {

            return res.status(500).json({
                message: 'Something wrong on server, function createUsers'
            })
        }
    },
    //METOD UPDATE
    updateUsers: async (req, res) => {

        try {
            const { id } = req.params;
            const { 
                name, 
                last_name, 
                email, 
                gender, 
                date_of_birth  
            } = req.body;
            const [result] = await pool.query('UPDATE users SET name = IFNULL(?,name), last_name = IFNULL(?,last_name), email = IFNULL(?,email), gender = IFNULL(?,gender), date_of_birth = IFNULL(?,date_of_birth) WHERE id = ?', 
                [
                    name, 
                    last_name, 
                    email, 
                    gender, 
                    date_of_birth, 
                    id
                ]);
            //console.log(result)
            if (result.affectedRows === 0) return res.status(404).json({
                message: "Users not updated"
            }); res.sendStatus(204);
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: 'Something wrong on server'
            })
        }
    },
    //metod DELETE
    deleteUsers: async (req, res) => {

        try {
            const [result] = await pool.query('DELETE FROM users WHERE id = ?', [req.params.id]);

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

export default actionUsersController