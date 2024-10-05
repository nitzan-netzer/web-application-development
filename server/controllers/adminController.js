import { User } from '../models/user.js';
import { deleteAllProductsByUser } from '../utils/userUtils.js';
import {Product} from "../models/product.js";

async function blockUser(req,res){
    const { userToBlock } = req.body;
    try {
      const user = await User.findOne({ userId: userToBlock });
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      user.isBlocked = true;
      await deleteAllProductsByUser(userToBlock)
      await user.save();
      res.status(200).json({ user: {
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
        } });
    } catch (error) {
      res.status(500).json({ msg: 'Server error' });
    }
}

async function removeBlock(req, res) {
    const { userToRemoveBlock } = req.body;
    try {
        const user = await User.findOne({ userId: userToRemoveBlock });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        user.isBlocked = false;
        await user.save();
        res.status(200).json({ user: {
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
            } });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
}

async function deleteUser(req,res){
    const { userToDelete } = req.body;
    try {
      const user = await User.findOne({ userId: userToDelete });
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      const { username } = user;

      await deleteAllProductsByUser(userToDelete);
      await User.deleteOne({ userId: userToDelete });
      res.json({ msg: `Deleted user ${username}`, username, userToDelete });
    } catch (error) {
      res.status(500).json({ msg: 'Server error' });
    }
  }

async function getAllUsers(req, res) {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
}

export {blockUser, deleteUser, getAllUsers, removeBlock}
