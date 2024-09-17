import { User } from '../models/user.js';
import bcrypt from "bcrypt";
import { User } from '../models/user.js';
import jwt from "jsonwebtoken";
import InputValidation from '../validations/user/inputValidation.js';
import { mySecret } from '../config/secrets.js';
const inputValidation = new InputValidation();

async function register (req, res) {
  try {
    const {
      username, name, email, password,
      birthYear, address, gender, isSeller
    } = req.body;

    inputValidation.validate(req.body);
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    // Save new user in MongoDB
    user = new User({
      username, name, email, password,
      birthYear, address, gender, isSeller
    });
    await user.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
}

async function login (req, res)  {
  const { emailOrUsername, password } = req.body;
  // Validating inputs here...
  try {
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
    });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const payload = { userId: user._id, isAdmin: user.isAdmin };
    const token = jwt.sign(payload, mySecret, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
}



export {register,login}
