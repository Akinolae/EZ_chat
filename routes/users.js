const express = require('express');
const router = express.Router();
const path = require('path');

router.use(express.static(path.join(__dirname, 'src/css')));
router.get('/login', (req, res) => {
    res.render("login");
})

router.get('/register', (req, res) => {
    res.render("register");
})
router.post('/register', (req, res) => {
    res.send("Logged in succesfully");
})
module.exports = router;