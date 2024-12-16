"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.getAllSignup = exports.SignUP = void 0;
const conectiondb_1 = require("../config/conectiondb");
const User_1 = require("../entities/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
const JWTWEBToken = process.env.JWT_SECEKT_KEY || "hunzla123";
//signup
const SignUP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, confirm_password } = req.body;
    // Validate input fields
    if (!username || !email || !password || !confirm_password) {
        return res.status(400).json({ message: "One of the fields is missing" });
    }
    // Check if password and confirm password match
    if (password !== confirm_password) {
        return res.status(400).json({ message: "Passwords do not match" });
    }
    // Check if the user already exists
    const userRepository = conectiondb_1.AppDataSource.getRepository(User_1.User);
    const existingUser = yield userRepository.findOne({ where: { email } });
    if (existingUser) {
        return res
            .status(400)
            .json({ message: "User with this email already exists" });
    }
    // Create new user
    const newUser = userRepository.create({
        username,
        email,
        password,
        confirm_password,
    });
    // Save the new user to the database
    try {
        yield userRepository.save(newUser);
        return res
            .status(201)
            .json({ message: "User created successfully", user: newUser });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error creating user" });
    }
});
exports.SignUP = SignUP;
//get all user
const getAllSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Access the User repository
        const userRepository = conectiondb_1.AppDataSource.getRepository(User_1.User);
        // Fetch all users
        const users = yield userRepository.find({
            select: ["id", "email", "username"],
        });
        // Log users for debugging (optional)
        console.log("Fetched users:", users);
        // Send the user data as a JSON response
        res.status(200).json(users);
    }
    catch (error) {
        // Log error for debugging
        console.error("Error fetching users:", error);
        // Send a proper error response
        res.status(500).json({
            message: "Error fetching users",
            error: error instanceof Error ? error.message : String(error),
        });
    }
});
exports.getAllSignup = getAllSignup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email) {
            res.status(400).json({ message: "Please Provide Email From Login" });
        }
        if (!password) {
            res.status(400).json({ message: "Please Provide Password From Login" });
        }
        const user = conectiondb_1.AppDataSource.getRepository(User_1.User);
        const loginuser = yield user.findOne({ where: email });
        // Check if user exists
        if (!loginuser) {
            return res.status(404).json({ message: "Invalid email or password" });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, loginuser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = jsonwebtoken_1.default.sign({
            id: loginuser.id,
            email: loginuser.email,
        }, JWTWEBToken, { expiresIn: "1h" } // Token expiry
        );
        // Send response
        res.status(200).json({
            message: "Login successful",
            token,
        });
    }
    catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.login = login;
