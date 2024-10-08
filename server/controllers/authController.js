import { User } from '../models/user.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import InputValidation from '../validations/user/inputValidation.js';
import {adminSecret, mySecret} from '../config/secrets.js';
import DbValidation from "../validations/user/dbValidation.js";

const inputValidation = new InputValidation();
const dbValidation = new DbValidation()

async function register (req, res) {
  try {
    const {
      username, name, email, password,
      birthYear, address, gender, isSeller,
        isAdmin,
    } = req.body;

    console.log("Request body: ", req.body);

    inputValidation.validate(req.body);
    await dbValidation.validate(req.body);

    let user = new User({
      username, name, email, password,
      birthYear, address, gender, isSeller, isAdmin
    });
    user = await user.save();

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
    const payload = { userId: user._doc.userId, isAdmin: user._doc.isAdmin };

    let token = jwt.sign(payload, mySecret, { expiresIn: '7d' });

    if (user._doc.isAdmin) {
        token = jwt.sign(payload, adminSecret, { expiresIn: '7d' });
    }

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
    return res.status(200).json({isSeller: true});
  }
  catch (e) {
    return res.status(500).json({ msg: e})
  }
}

async function updatePersonalDetails(req, res) {
    const {
        userId, username, name, email,
        birthYear, address, gender, isSeller,
    } = req.body;

    const user = await User.findOne({userId});

    if (!user) {
        return res.status(404).json({ msg: 'User not found' });
    }
    
    user.username = username ||  user.username;
    user.name =  name || user.name;
    user.email = email ||  user.email;
    user.birthYear = birthYear ||  user.birthYear;
    user.address = address ||  user.address;
    user.gender = gender ||  user.gender;
    user.isSeller = isSeller || user.isSeller;
    user.save();
    return res.status(200).json({user})
}

export {register,login, requestToSell, updatePersonalDetails}
