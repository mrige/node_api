const express = require('express');
const auth = require('../auth');
const { create_cloth, get_closet_clothes, get_cloth, search_cloth } = require('../controllers/cloth_controller');
const router =  express.Router();

router.post("/cloths",auth, create_cloth);
router.get("/cloths/search",auth, search_cloth);
router.get("/cloths/closet/:closet_id",auth,get_closet_clothes );
router.get("/cloths/:id",auth, get_cloth);

module.exports = router;