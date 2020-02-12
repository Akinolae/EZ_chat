const express = require('express');
const bcryptjs = require('bcryptjs');
const router = express.Router();
// const path = require('path');
const knex = require('knex');

// Sets up the database connection that collects and saves the data of the user to the database!
const database = knex({
    client: 'mysql',
    version: '5.7',
    connection: {
        host: '127.0.0.1',
        user: 'Akinola',
        password: 'Thegreatest1994',
        database: 'my_app'
    }
});
// We initialized the middleware here!

router.use(express.static(__dirname + 'src/css'));
router.use(express.json())
router.use(express.urlencoded({
    extended: false
}))
// ====================================

router.get('/login', (req, res) => {
    res.render("login");
})

router.get('/main', (req, res) => {
    res.render("main");
})
router.get('/register', (req, res) => {
    res.render("register");
})
router.post('/register', (req, res) => {
    const {
        firstName,
        email,
        password,
        password2,
        user_age
    } = req.body;

    const hash_password = bcryptjs.hashSync(password);
    const hash_password2 = bcryptjs.hashSync(password2);
    const date = new Date();

    const errors = [];
    if (!firstName || !email || !password || !password2 || !user_age) {
        errors.push({
            msg: "fields cannot be empty"
        })
    }

    if (password !== password2) {
        errors.push({
            msg: "passowrds must match"
        })
    }
    if (password.length < 9) {
        errors.push({
            msg: "password should be atleast 9 characters"
        })
    }

    if (errors.length > 0) {
        res.render("register")
    } else {
        database.transaction(data => {
            data.insert({
                    user_name: firstName,
                    user_email: email,
                    user_age: user_age,
                    password_validate: hash_password2,
                    user_password: hash_password,
                    reg_date: date

                }).into('Users')
                .then(user => {
                    res.render('login')
                }).then(data.commit).catch(data.rollback)
        }).catch(err => {
            res.json(`user with ${email} already exists`);
        })
    }
})

module.exports = router;