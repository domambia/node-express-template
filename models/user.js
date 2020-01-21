const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please give your first Name"]
    },
    lastName: {
        type: String,
        required: [true, "Please provide your last Name"]
    },
    email: {
        type: String,
        required: [true, "Provide your email address"],
        validate: [validator.isEmail, "Provide a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password can't be blank"],
        minlength: 6
    },
    passwordConfirm: {
        type: String,
        required: [true, "Password can't be blank"],
        minlength: 6,
        validate: {
            message: "password and password confirm must be the same",
            validator: function(val) {
                return val === this.password;
            }
        }
    }
});

// ENCRPTION / HASH PASSWORD
userSchema.pre("save", async next => {
    if (this.isModified("password")) return next();
    // encrypt password before saving it
    this.password = await bcrypt.hash(this.password, 12);
    // delete the value of passwordConfirm
    this.passwordConfirm = undefined;
});

// creating Model
const User = mongoose.model("User", userSchema);

module.exports = User;