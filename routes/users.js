const express = require('express');
const auth = require('../auth');
const { create_user, get_user, login } = require('../controllers/user_contoller');

const router =  express.Router();

router.post("/users/register", create_user);
router.get("/users/:id",auth, get_user);
router.post("/users/login", login);

module.exports = router;
