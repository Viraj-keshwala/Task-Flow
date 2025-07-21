const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });

exports.signup = async (req, res) => {
  const user = await User.create(req.body);
  const token = generateToken(user._id);
  
  res.status(201).json({
    token,
    user: {
      _id: user._id,
      username: user.username,
      role: user.role
    }
  });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  
  if (!user || !(await user.matchPassword(password))) {
    return res.status(400).json({ msg: 'Invalid credentials' });
  }

  const token = generateToken(user._id);

  res.json({
    token,
    user: {
      _id: user._id,
      username: user.username,
      role: user.role
    }
  });
};

