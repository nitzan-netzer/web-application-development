import { User } from '../models/user.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import InputValidation from '../validations/user/inputValidation.js';
import { mySecret } from '../config/secrets.js';
import DbValidation from "../validations/user/dbValidation.js";

const inputValidation = new InputValidation();
const dbValidation = new DbValidation()

async function register (req, res) {
  try {
    const {
      username, name, email, password,
      birthYear, address, gender, isSeller
    } = req.body;


    inputValidation.validate(req.body);
    await dbValidation.validate(req.body);

    const user = new User({
      username, name, email, password,
      birthYear, address, gender, isSeller
    });
    await user.save();
    res.status(200).json({ msg: 'User registered successfully', user: {
        userId: user._doc.userId,
        username: user._doc.username,
        name: user._doc.name,
        email: user._doc.email,
        birthYear: user._doc.birthYear,
        address: user._doc.address,
        gender: user._doc.gender,
        isSeller: user._doc.isSeller,
        isAdmin: user._doc.isAdmin,
        isBlocked: user._doc.isBlocked,
      }  });
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
    res.json({ token, user: {
        userId: user._doc.userId,
        username: user._doc.username,
        name: user._doc.name,
        email: user._doc.email,
        birthYear: user._doc.birthYear,
        address: user._doc.address,
        gender: user._doc.gender,
        isSeller: user._doc.isSeller,
        isAdmin: user._doc.isAdmin,
        isBlocked: user._doc.isBlocked,
      }
    });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
}

async function requestToSell(req, res) {
  const { userId } = req.body;

  try {

    const user = await User.findOne({userId});

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.isSeller = true;
    user.save();
  }
  catch (e) {
    return res.status(500).json({ msg: e})
  }
}

export {register,login, requestToSell}
