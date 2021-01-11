const express = require('express');
const pool = require('../db/dev/pool');
const uuid = require("uuid");

const create_closet =  async (req, res) => {

    const {user_id, name} = req.body;

    const statement = "INSERT INTO closets (closet_id, user_id, name,  created_on) VALUES($1, $2, $3, $4) RETURNING *";
    values = [uuid.v4(), user_id, name, new Date()];

    try {
        const closet = await pool.query(statement, values);
        res.json(closet.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
}

const get_closet = async (req, res) => {
    const { id } = req.params;
    const statement = "SELECT * FROM closets WHERE closet_id = $1";

    try {
        const closet = await pool.query(statement, [id]);
        res.json(closet.rows[0]);

    } catch (error) {
        console.error(error.message);
    }
}

module.exports = {create_closet, get_closet};