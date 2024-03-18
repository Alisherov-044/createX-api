import sqlite3 from "sqlite3";

const dbPath = "./db.sqlite";
export const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error opening db", err.message);
    } else {
        console.log("Connected to the db");
    }
});
