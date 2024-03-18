"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTables = void 0;
const _1 = require(".");
function createTables() {
    (0, _1.createTable)("info", {
        id: "INTEGER PRIMARY KEY",
        title: "TEXT NOT NULL",
        amount: "INTEGER NOT NULL",
    });
    (0, _1.createTable)("courses", {
        id: "INTEGER PRIMARY KEY",
        category: "INTEGER NOT NULL",
        image: "TEXT NOT NULL",
        title: "TEXT NOT NULL",
        price: "INTEGER NOT NULL",
        tutor: "TEXT NOT NULL",
    });
    (0, _1.createTable)("events", {
        id: "INTEGER PRIMARY KEY",
        day: "TEXT NOT NULL",
        month: "TEXT NOT NULL",
        time: "TEXT NOT NULL",
        title: "TEXT NOT NULL",
        description: "TEXT NOT NULL",
    });
    (0, _1.createTable)("team", {
        id: "INTEGER PRIMARY KEY",
        image: "TEXT NOT NULL",
        name: "TEXT NOT NULL",
        specification: "TEXT NOT NULL",
        facebook: "TEXT NOT NULL",
        instagram: "TEXT NOT NULL",
        linkedin: "TEXT NOT NULL",
    });
    (0, _1.createTable)("testimonials", {
        id: "INTEGER PRIMARY KEY",
        image: "TEXT NOT NULL",
        name: "TEXT NOT NULL",
        specification: "TEXT NOT NULL",
        description: "TEXT NOT NULL",
    });
    (0, _1.createTable)("posts", {
        id: "INTEGER PRIMARY KEY",
        image: "TEXT NOT NULL",
        title: "TEXT NOT NULL",
        type: "INTEGER NOT NULL",
        category: "INTEGER NOT NULL",
        date: "TEXT NOT NULL",
        duration: "INTEGER",
        description: "TEXT NOT NULL",
    });
    (0, _1.createTable)("type", {
        id: "INTEGER PRIMARY KEY",
        icon: "TEXT NOT NULL",
        title: "TEXT NOT NULL",
    });
    (0, _1.createTable)("category", {
        id: "INTEGER PRIMARY KEY",
        title: "TEXT NOT NULL",
        color: "TEXT NOT NULL",
    });
}
exports.createTables = createTables;
