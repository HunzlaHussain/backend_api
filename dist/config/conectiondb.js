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
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = exports.AppDataSource = void 0;
const dotenv_1 = require("dotenv");
const User_1 = require("../entities/User"); // Adjust path as needed
const typeorm_1 = require("typeorm");
(0, dotenv_1.configDotenv)();
console.log(process.env.DATABASE_HOST);
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    password: process.env.DATABASE_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT || "5432"),
    database: process.env.DATABASE_Name,
    username: process.env.DATABASE_USER,
    synchronize: true,
    logging: true,
    entities: [User_1.User],
    migrations: [],
    subscribers: [],
});
const initializeDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.AppDataSource.initialize();
        console.log("Database Connection Done");
    }
    catch (error) {
        console.error("Database Connection Failed:", error);
        process.exit(1); // Exit on failure
    }
});
exports.initializeDatabase = initializeDatabase;
