"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signup = exports.Signin = void 0;
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const helpers_1 = require("../../common/helpers");
const schemas_1 = require("../../schemas");
const Signup = async (payload) => {
    try {
        const { email, name, password, image } = payload;
        let response;
        if (!email || !name || !password) {
            response = {
                error: true,
                message: "Incomplete fields!",
            };
            return response;
        }
        if (!validator_1.default.isEmail(email)) {
            response = {
                error: true,
                message: "Invalid email!",
            };
            return response;
        }
        if (!validator_1.default.isStrongPassword(password)) {
            response = {
                error: true,
                message: "Invalid password!",
            };
            return response;
        }
        const isEmailInUse = await schemas_1.User.findOne({ email: email });
        if (isEmailInUse) {
            response = {
                error: true,
                message: "Email is in use!",
                data: null,
            };
            return response;
        }
        const url = image ? await (0, helpers_1.uploader)(image.path, "user") : "";
        const saltRounds = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
        const user = await schemas_1.User.create({
            email,
            name,
            password: hashedPassword,
            avatar: url,
        });
        if (!user) {
            response = {
                error: true,
                message: "Unable to create account!",
            };
            return response;
        }
        response = {
            error: false,
            message: "Account created!",
            data: user,
        };
        return response;
    }
    catch (error) {
        console.log(error);
        const response = {
            error: true,
            message: error.message || "Unable to create account!",
        };
        return response;
    }
};
exports.Signup = Signup;
const Signin = async (payload) => {
    try {
        const { email, password } = payload;
        let response;
        if (!email || !password) {
            response = {
                error: true,
                message: "Incomplete credentials.",
            };
            return response;
        }
        const user = await schemas_1.User.findOne({ email });
        if (!user) {
            response = {
                error: true,
                message: "User not found!",
            };
            return response;
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            response = {
                error: true,
                message: "Password does not match!",
            };
            return response;
        }
        const token = await helpers_1.JwtHelper.sign(user._id);
        response = {
            error: false,
            message: "User signed in!",
            data: { user, token },
        };
        return response;
    }
    catch (error) {
        console.log(error);
        const response = {
            error: true,
            message: error.message || "Unable to sign user in!",
        };
        return response;
    }
};
exports.Signin = Signin;
