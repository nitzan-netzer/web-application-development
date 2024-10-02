import { User } from '../models/user.js';
import { deleteAllProductsByUser } from '../utils/userUtils.js';

async function blockUser(req,res){
    const { userId } = req.body;
    try {
      const user = await User.findOne({ userId });
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      user.isBlocked = true;
      deleteAllProductsByUser(userId)
      await user.save()
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
    const { userId } = req.body;
    try {
      const user = await User.findOne({ userId });
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      const {username} = user
      deleteAllProductsByUser(userId)
      user.delete()
      res.json({ msg: `Deleted user ${username}`, username, userId });
    } catch (error) {
      res.status(500).json({ msg: 'Server error' });
    }
  }

  export {blockUser, deleteUser}
