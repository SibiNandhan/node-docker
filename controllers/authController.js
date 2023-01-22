const User = require("./../models/userModel");

const signup = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    req.session.user = newUser;
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const findUser = await User.findOne({ username: username });
    if (!findUser) {
      throw new Error("No user found");
    }
    if (findUser.password !== password) {
      throw new Error("Incorrect email or password");
    }
    req.session.user = findUser;
    res.status(200).json({ status: "success" });
  } catch (err) {
    next(err);
  }
};

module.exports = { login, signup };
