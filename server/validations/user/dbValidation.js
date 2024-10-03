import { User } from '../../models/user.js'

export default class DbValidation {
    async validate(userData) {
        const { username, email} = userData;

        await this.isUserAlreadyExistValidation(username);
        await this.isEmailAlreadyExistValidation(email);
    }

    async isUserAlreadyExistValidation(username) {
        const user = await User.findOne({ username });
        if (user) {
            throw "DB validation error - username already exists";
        }
    }

    async isEmailAlreadyExistValidation(email) {
        const user = await User.findOne({ email });
        if (user) {
            throw "DB validation error - email already exists";
        }
    }
}
