const express = require('express');
const pool = require('../db/dev/pool');
const uuid = require("uuid");

const create_cloth = async (req, res) => {
    const {closet_id, name, cloth_type, color} = req.body;

    const statement = "INSERT INTO cloths (cloth_id, closet_id, name, cloth_type, color, created_on ) VALUES($1, $2, $3, $4, $5, $6) RETURNING *";

    const values = [
        uuid.v4(),
        closet_id,
        name,
        cloth_type,
        color,
        new Date()
      ];

      try {
          const cloth = await pool.query(statement, values);
          res.send(cloth.rows[0]);
      } catch (error) {
        res.status(400).send(error);
      }
}

const get_closet_clothes = async (req, res) => {
    const {closet_id} = req.params;

    const statement = "SELECT * FROM cloths WHERE closet_id = $1"

    try {
        const cloth = await pool.query(statement, [closet_id]);
        res.send(cloth.rows[0]);
    }catch (error) {
        res.status(400).send(error);
    }
}

const get_cloth = async (req, res) => {
    const {id} = req.params;

    const statement = "SELECT * FROM cloths WHERE cloth_id = $1"

    try {
        const cloth = await pool.query(statement, [id]);
        res.send(cloth.rows[0]);
    }catch (error) {
        res.status(400).send(error);
    }
}

const search_cloth = async (req, res) => {
    const {search_term} = req.query;

    const statement = "SELECT * FROM cloths WHERE to_tsvector(name || ' ' || cloth_type || ' ' || color) @@ to_tsquery($1)";

    try {
        const cloth = await pool.query(statement, [search_term]);
        res.send(cloth.rows);
    }catch (error) {
        res.status(400).send(error);
    }
}
module.exports = { create_cloth, get_closet_clothes, get_cloth, search_cloth}