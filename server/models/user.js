import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {connections} from '../config/db.js'
import { v4 as uuid } from 'uuid';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    userId: { type: String, required: false, unique: true},
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: false},
    birthYear: { type: Number, required: true },
    address: { type: String, required: true },
    gender: { type: String, required: true, enum: ['male', 'female', 'unknown']},
    isSeller: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false}
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
        this.userId = uuid();

        next();
    } catch (error) {
        next(error);
    }
});

export const User = connections.usersDB.model('User', userSchema);
