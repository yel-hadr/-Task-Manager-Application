const User = require('../models/User')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const registerUser = async (req, res) => {
    try {
        
        const {username , email, password} = req.body;


        // console.log(username, email, password)
    
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
    
        const existingUser = await User.findOne({ 
            $or: [
              { email: email },
              { username: username }
            ]
          });
        
        if (existingUser) {
            return res.status(400).json({ message: 'this Email  or  username is already in use.' });
        }
    
        const newUser = new User({
            username,
            email,
            password
        })
        // console.log(newUser)
        await newUser.save();
    
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
          });
          res.status(201).json({
            message: 'User registered successfully.',
            user: {
              id: newUser._id,
              username: newUser.username,
              email: newUser.email,
            },
            token,
          });
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
}
const loginUser = async (req, res) => {
  try {
    const {username , password} = req.body;

    console.log(username , password)
    if (!username || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({
      message: 'Login successful.',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
}
module.exports = { registerUser, loginUser }