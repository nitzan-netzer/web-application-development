import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {connections} from '../config/db.js'

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true,}, // This will automatically reference _id
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true},
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
        this.salt = salt;
        this.password = await bcrypt.hash(this.password, salt);
        if (!this.userId) {
            this.userId = this._id;
        }
        next();
    } catch (error) {
        next(error);
    }
});

export const User = connections.usersDB.model('User', userSchema);
