import { pool } from "../db.js";
import jwt from 'jsonwebtoken';

import bcrypt from "bcrypt";


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
            const {
                email,
                password
            } = req.body;// data form user

            const userSearch = (await pool.query(('SELECT password FROM users WHERE email = ? '),//search password by email
                [
                    email
                ]));

            if (userSearch[0].length > 0) {//if user exist
                const isMatch = await bcrypt.compare(password, userSearch[0][0].password);

                if (isMatch) {//if password match

                    const [rows] = (await pool.query(('SELECT id, name, last_name, email, gender, date_of_birth, rol FROM users WHERE email = ?'),
                        [
                            email,
                            password
                        ]));

                    // JWT CREATION
                    const token = jwt.sign(
                        { 
                            id: rows[0].id, 
                            name: rows[0].name, 
                            email: rows[0].email
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: '1h'
                        })

                    res.cookie('access_token', token, {
                        // domain: 'localhost', // o omite este atributo
                        httpOnly: true, // Prevents JavaScript access to the cookie
                        path: '/',
                        secure: false, // process.env.NODE_ENV === 'production', // Use secure cookies in production
                        sameSite: 'lax', //'Lax o 'Strict' o 'None' Prevent CSRF attacks
                        maxAge: 1000 * 60 * 60 // 1 hour
                    }).send({ rows, token });//SEND TOKEN
                } else {
                    throw new Error('La contraseña es incorrecta. Por favor, inténtelo de nuevo.');
                }

            } else {
                throw new Error('Email de usuario no encontrado. Por favor, verifique su dirección.');
            }


        } catch (Error) {

            return res.status(401).json({
                message: Error.message ?? 'Something wrong on server, function getOneUsers'
            })
        }
    },
    // logout
    logout: (req, res) => {
        res.clearCookie('access_token').json({
            message: 'Logout successful'
        });
    },
    // logwatcher
    logWatcher: async (req, res) => {
        const token = req.cookies.access_token; // Obtiene el token del cookie
        
        if (token) {
            try {
                // Verifica y decodifica el token
                const data = jwt.verify(token, process.env.JWT_SECRET);
                console.log(data);
                const [rows] = (await pool.query(('SELECT id, name, last_name, email, gender, date_of_birth, rol FROM users WHERE id = ?'),
                        
                            data.id
                        ));
                console.log(rows);
                res.send(rows);

            } catch (error) {
                return res.status(401).json({
                message: 'Ha ocurrido un error al verificar el token.'
            })
            }
        }


    },
    //METOD STORE
    createUsers: async (req, res) => {
        try {
            const {
                name,
                last_name,
                email,
                gender,
                date_of_birth,
                password,
                rol
            } = {
                name: req.body.name,
                last_name: req.body.last_name,
                email: req.body.email,
                gender: req.body.gender,
                date_of_birth: req.body.date_of_birth,
                password: await bcrypt.hash(req.body.password, 10),
                rol: req.body.rol
            };
            const [rows] = await pool.query('INSERT INTO users (name, last_name, email, gender, date_of_birth, password, rol) VALUES (?,?,?,?,?,?,?)',
                [
                    name,
                    last_name,
                    email,
                    gender,
                    date_of_birth,
                    password,
                    rol
                ]);
            res.send({ rows });
        } catch (error) {
            console.log(error)
            return res.status(500).json({

                message: 'Something wrong on server, function createUsers',


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
                date_of_birth,
                password,
                rol
            } = req.body;
            const [result] = await pool.query('UPDATE users SET name = IFNULL(?,name), last_name = IFNULL(?,last_name), email = IFNULL(?,email), gender = IFNULL(?,gender), date_of_birth = IFNULL(?,date_of_birth), password = IFNULL(?,password), rol = IFNULL(?,rol) WHERE id = ?',
                [
                    name,
                    last_name,
                    email,
                    gender,
                    date_of_birth,
                    password,
                    rol,
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