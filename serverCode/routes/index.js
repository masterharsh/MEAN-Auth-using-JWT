const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');

let auth = jwt({
    secret: 'harsh',
    userProperty: 'payload'
});

let ctrlProfile = require('../controllers/profile');

let ctrlAuth = require('../controllers/authentication');

//profile

router.get('/member', auth, ctrlProfile.profileRead);

//authentication

router.post('/signup', ctrlAuth.register);
router.post('/home', ctrlAuth.login);

module.exports = router;