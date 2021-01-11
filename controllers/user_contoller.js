const express = require('express');
const pool = require('../db/dev/pool');
const uuid = require("uuid");
const bcrypt = require('bcryptjs');
const {validate_user, create_user_token} = require('../validation');

const create_user= async (req, res) => {
    const {email, first_name, last_name, password, is_admin} = req.body;

    const { error } = validate_user(email, password);
    if(error.length > 0) {return res.status(400).send(error[0])};

    const statement = "INSERT INTO users (user_id, email, first_name, last_name, password, is_admin, created_on) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *";
    
    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(password, salt);

    const values = [
        uuid.v4(),
        email,
        first_name,
        last_name,
        hash_password,
        is_admin,
        new Date()
      ];

    try {
        const user = await pool.query(statement, values);
        //needs imporvement
        if(!user) return res.status(400).send("This email already exist");
        res.json(user.rows[0]);

    } catch (error) {
        res.status(400).send(error.message);
    }
}

const get_user= async (req, res) => {
    const { id } = req.params;

    const statement  = "SELECT * FROM users WHERE user_id = $1";

    try {
        const user = await pool.query(statement, [id]);
        res.json(user.rows[0]);

    } catch (error) {
        console.error(error.message);
    }
}

const login = async (req, res) => {
    const {email, password} = req.body
    const { error } = validate_user(email, password);
    if(error.length > 0) return res.status(400).send("Invalid Email or Password");

    const statement  = "SELECT * FROM users WHERE  email = $1";

    try {

        const user = await pool.query(statement, [email]);
        if(!user) return res.status(400).send("Invalid Email or Password");

        const is_valid_passowrd = await bcrypt.compare(password, user.rows[0].password);
        if(!is_valid_passowrd) return res.status(400).send("Invalid Email or Password");

        const token = create_user_token(user.rows[0].user_id);
        res.header('auth-token', token).send(token);
        //res.status(200).send("SUCCESS!!");

    } catch (error) {
        res.status(400).send(error.message);
    }


}

module.exports = {create_user, get_user, login};
