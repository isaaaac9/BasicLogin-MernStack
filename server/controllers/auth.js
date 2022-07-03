const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    //check user
    const { username, password } = req.body;
    var user = await User.findOne({ username });
    if (user) {
      return res.status(400).send("User Already exists");
    }
    const salt = await bcrypt.genSalt(10);
    user = new User({
      username,
      password,
    });
    //Encrypt
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.send("Register success");
  } catch (error) {
    console.log(error);
    res.status(500).send("server error!");
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    var user = await User.findOneAndUpdate({ username }, { new: true });
    if (user && user.enabled) {
      //Checkpassword
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send("Password Invalid");
      }
      //Payload
      const payload = {
        user: {
          username: user.username,
          role: user.role,
        },
      };
      //GenToken
      jwt.sign(payload, "jwtSecret", { expiresIn: 3600 }, (error, token) => {
        if (error) throw error;
        res.json({ token, payload });
      });
    } else {
      return res.status(400).send("User not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error!");
  }
};

exports.currentUser = async (req, res) => {
  try {
    console.log("controller", req.user);
    const user = await User.findOne({
      username: req.user.username,
    })
      .select("-password")
      .exec();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error!");
  }
};

exports.listUser = async (req, res) => {
  try {
    res.send("list Get user");
  } catch (error) {
    console.log(error);
    res.status(500).send("server error!");
  }
};

exports.EditUser = async (req, res) => {
  try {
    res.send("Edit user");
  } catch (error) {
    console.log(error);
    res.status(500).send("server error!");
  }
};

exports.RemoveUser = async (req, res) => {
  try {
    res.send("Delete user");
  } catch (error) {
    console.log(error);
    res.status(500).send("server error!");
  }
};
