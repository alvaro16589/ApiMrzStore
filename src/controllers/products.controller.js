import { pool } from "../db.js";

import path from 'path';
import fs from 'fs';

const actionProductsController = {
    //metod INDEX
    getProducts: async (req, res) => {
        try {
            const [rows] = (await pool.query('SELECT * FROM products'));
            res.send(rows);
        } catch (error) {
            return res.status(500).json({
                message: 'Something wrong on server'
            })
        }
    },
    //SHOW A Products

    getOneProducts: async (req, res) => {
        try {
            const [rows] = (await pool.query(('SELECT * FROM products WHERE id = ?'), [req.params.id]));
            res.send(rows);
        } catch (error) {
            return res.status(500).json({
                message: 'Something wrong on server'
            })
        }
    },
    //METOD STORE
    createProducts: async (req, res) => {
        try {
            const {
                name,
                description,
                price,
                image,
                status_prod_id,
                category_id
            } = req.body;
            const [rows] = await pool.query('INSERT INTO products (name, description, price, image, status_prod_id, category_id) VALUES (?,?,?,?,?,?)',
                [
                    name,
                    description,
                    price,
                    image,
                    status_prod_id,
                    category_id
                ]);
            res.send({ rows });
        } catch (error) {

            return res.status(500).json({
                error,
                message: 'Something wrong on server, function createProducts'
            })
        }
    },
    //METOD UPDATE
    updateProducts: async (req, res) => {

        try {

            const { id } = req.params;
            const {
                name,
                description,
                price,
                image,
                status_prod_id,
                category_id
            } = req.body;
            // eliminar la imagen anterior
            const [filename] = (await pool.query(('SELECT image FROM products WHERE id = ?'), [id]));

            const filePath = path.join(process.cwd(), 'uploads', nameFileCut(filename[0].image));
            if (fs.existsSync(filePath) && image !== filename[0].image) {
                fs.unlinkSync(filePath);
            }
            //end eliminar la imagen anterior
            const [result] = await pool.query('UPDATE products SET name = IFNULL(?,name), description = IFNULL(?,description), price = IFNULL(?,price), image = IFNULL(?,image), status_prod_id = IFNULL(?,status_prod_id), category_id = IFNULL(?,category_id) WHERE id = ?',
                [
                    name,
                    description,
                    price,
                    image,
                    status_prod_id,
                    category_id,
                    id
                ]);
            //console.log(result)
            if (result.affectedRows === 0) return res.status(404).json({
                message: "Products not updated"
            }); res.sendStatus(204);
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: 'Something wrong on server'
            })
        }
    },
    //metod DELETE
    deleteProducts: async (req, res) => {

        try {
            const [result] = await pool.query('DELETE FROM products WHERE id = ?', [req.params.id]);

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

function nameFileCut(name) {
    let c = name.length - 1, recap = '';
    while(c>0){
        if(name[c]==='/') return recap;
        recap = name[c] + recap;
        c--;
    }

}
export default actionProductsController