import { User } from '../../models/user.js'
import bcrypt from "bcrypt";

export default class DbValidation {
    async validate(userData) {
        const { username, password,} = userData;

        const user = await User.findOne({ username: username });
        await this.isSignatureMatch(user, username, password);
    }

    async isSignatureMatch(user, username, password) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw "password is incorrect";
        }
    }
}
