const express = require('express')
const {registerUser, loginUser} = require('../controllers/authController')

const validateInput = require('../middlewares/validateInput')


const router = express.Router();


router.post('/register', validateInput(['username', 'email', 'password']), registerUser);
router.post('/login', validateInput(['username', 'password']), loginUser);
router.post('/refresh', (req, res) => {
    const { token } = req.body;
  
    if (!token) {
      return res.status(400).json({ message: 'Token is required.' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const newToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      res.status(200).json({ token: newToken });
    } catch (error) {
      res.status(401).json({ message: 'Invalid or expired token.' });
    }
  });
  
module.exports = router;