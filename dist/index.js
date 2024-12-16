"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser")); // Optional (built-in in newer Express versions)
const cors_1 = __importDefault(require("cors"));
const conectiondb_1 = require("./config/conectiondb");
const user_routes_1 = __importDefault(require("./routes/user_routes"));
(0, dotenv_1.configDotenv)();
(0, conectiondb_1.initializeDatabase)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    console.log("get first route");
    res.send("First Route");
});
app.use("/api/user", user_routes_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} PORT`);
});
