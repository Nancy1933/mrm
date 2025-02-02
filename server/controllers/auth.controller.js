const db = require("../models");
const User = db.user;

exports.signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    user.save()
        .then(() => res.send({ message: "User registered successfully!" }))
        .catch(err => res.status(500).send({ message: err.message }));
};

exports.signin = (req, res) => {
    // Логика входа (пока можно оставить пустой)
    res.send({ message: "Login logic will be here" });
};