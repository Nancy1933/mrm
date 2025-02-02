const User = require("../models/user.model");

exports.signup = async (req, res) => {
    try {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        await user.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.signin = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) return res.status(404).json({ message: "User not found" });
        if (user.password !== req.body.password) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Возвращаем упрощенный объект пользователя
        res.json({
            id: user._id,
            username: user.username,
            email: user.email,
            accessToken: "mock-token-" + Date.now()
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};