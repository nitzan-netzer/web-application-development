export default class InputValidation {

    validate(userData) {
        const { username, name, password, email, birthYear,
            address, gender,} = userData;

        this.userNameValidation(username);
        this.nameValidation(name);
        this.passwordValidation(password);
        this.emailValidation(email);
        this.birthYearValidation(birthYear);
        this.addressValidation(address);
        this.genderValidation(gender);
    }

    userNameValidation(name) {
        if (!name) {
            throw "Input validation error - name is not provided";
        }
    }

    nameValidation(name) {
        if (!name) {
            throw "Input validation error - name is not provided";
        }
    }

    passwordValidation(password) {
        if (password.length < 8) {
            throw "Input validation error - password is too short";
        }
    }

    emailValidation(email) {
        const re = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
        if(!re.test(String(email).toLowerCase())) {
            throw "Input validation error - email is not valid";
        }
    }

    birthYearValidation(birthYear) {
        if (!birthYear) {
            throw "Input validation error - birthYear was not provided";
        }

        const currentYear = new Date().getFullYear();
        if (birthYear > currentYear) {
            throw `Input validation error - birthYear is higher then ${currentYear}`;
        }
    }

    addressValidation(address) {
        if (!address) {
            throw "Input validation error - address";
        }
    }

    genderValidation(gender) {
        if (!gender) {
            throw "Input validation error - you must choose one";
        }
    }
}
