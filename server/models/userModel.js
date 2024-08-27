import mongoose, {model} from "mongoose";

const newDB = mongoose.connection.useDb('UsersDB');

const userSchema = new mongoose.Schema({
    name: String,
    mail: String,
    pass: String
});

export const User = newDB.model('User', userSchema);