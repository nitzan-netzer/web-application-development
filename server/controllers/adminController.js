import { User } from '../models/user.js';
import { deleteAllProductsByUser } from '../utils/userUtils.js';

async function blockUser(req,res){
    const {userId} = req.body;
    try {
      const user = await User.findOne({ userId });
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      user.isSeller = false;
      deleteAllProductsByUser(userId)
      await user.save()
      res.json({ ...user });
    } catch (error) {
      res.status(500).json({ msg: 'Server error' });
    }
  }
  async function deleteUser(req,res){
    const {userId} = req.body;
    try {
      const user = await User.findOne({ userId });
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      const {username} = user
      deleteAllProductsByUser(userId)
      user.delete()
      res.json({ msg: `Delete user ${username}`, username, userId });
    } catch (error) {
      res.status(500).json({ msg: 'Server error' });
    }
  }

  export {blockUser, deleteUser}