import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usersDB = mongoose.connection.useDb('usersDB');
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    birthYear: { type: Number, required: true },
    address: { type: String, required: true },
    gender: { type: String, required: true, enum: ['male', 'female', 'unknown']},
    isSeller: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false }
});

// Password hash middleware
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

const User = usersDB.model('User', userSchema);
export default User;
