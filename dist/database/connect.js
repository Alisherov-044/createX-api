"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const dbPath = "./db.sqlite";
exports.db = new sqlite3_1.default.Database(dbPath, (err) => {
    if (err) {
        console.error("Error opening db", err.message);
    }
    else {
        console.log("Connected to the db");
    }
});
