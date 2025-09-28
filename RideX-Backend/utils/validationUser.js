const validator = require("validator");

const validateSignUpData = (req) => {
    const { name, emailId, password, age, gender } = req.body;

    if (!name || name.trim().length < 3) {
        throw new Error("Name must be at least 3 characters long");
    }
    if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid");
    }
    if (!validator.isStrongPassword(password, { minLength: 8, minSymbols: 1, minNumbers: 1 })) {
        throw new Error("Password must be stronger (min 8 chars, include symbols & numbers)");
    }
    if (age !== undefined && age < 18) {
        throw new Error("Age must be 18 or above");
    }
    if (gender && !["male", "female", "other"].includes(gender.toLowerCase())) {
        throw new Error("Gender must be male, female, or other");
    }


    return true;
};

module.exports = validateSignUpData;
