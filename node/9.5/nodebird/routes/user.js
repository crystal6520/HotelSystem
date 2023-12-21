const express = require('express');

const { isLoggedIn } = require('../middlewares');
const { follow } = require('../controllers/user');
const { unfollow } = require('../controllers/user');
const { edit } = require('../controllers/user');

const router = express.Router();

// POST /user/:id/follow
router.post('/:id/follow', isLoggedIn, follow);
router.delete('/:id/unfollow', isLoggedIn, unfollow);
router.patch('/:id/edit', isLoggedIn, edit);


module.exports = router;