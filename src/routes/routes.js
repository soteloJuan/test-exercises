const { Router } = require('express');
const { exercisesOne } = require('../controllers/one.controller');
const { exercisesTwo } = require('../controllers/two.controller');

const router = Router();

router.post('/exercisesOne', exercisesOne);
router.post('/exercisesTwo', exercisesTwo);


module.exports = router;
