const express = require('express');
const auth = require('../auth');
const { create_closet, get_closet } = require('../controllers/closet_controller');

const router = express.Router();

router.post('/closets',auth, create_closet);
router.get('/closets/:id',auth, get_closet);

module.exports = router;