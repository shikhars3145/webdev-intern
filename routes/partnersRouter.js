const express = require('express');
const partnerController = require('../controllers/partnersController')

const router = express.Router();

router.route('/').post(partnerController.getPartners);

module.exports = router;