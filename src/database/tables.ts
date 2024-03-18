import { createTable } from ".";

export function createTables() {
    createTable("info", {
        id: "INTEGER PRIMARY KEY",
        title: "TEXT NOT NULL",
        amount: "INTEGER NOT NULL",
    });
    createTable("courses", {
        id: "INTEGER PRIMARY KEY",
        category: "INTEGER NOT NULL",
        image: "TEXT NOT NULL",
        title: "TEXT NOT NULL",
        price: "INTEGER NOT NULL",
        tutor: "TEXT NOT NULL",
    });
    createTable("events", {
        id: "INTEGER PRIMARY KEY",
        day: "TEXT NOT NULL",
        month: "TEXT NOT NULL",
        time: "TEXT NOT NULL",
        title: "TEXT NOT NULL",
        description: "TEXT NOT NULL",
    });
    createTable("team", {
        id: "INTEGER PRIMARY KEY",
        image: "TEXT NOT NULL",
        name: "TEXT NOT NULL",
        specification: "TEXT NOT NULL",
        facebook: "TEXT NOT NULL",
        instagram: "TEXT NOT NULL",
        linkedin: "TEXT NOT NULL",
    });
    createTable("testimonials", {
        id: "INTEGER PRIMARY KEY",
        image: "TEXT NOT NULL",
        name: "TEXT NOT NULL",
        specification: "TEXT NOT NULL",
        description: "TEXT NOT NULL",
    });
    createTable("posts", {
        id: "INTEGER PRIMARY KEY",
        image: "TEXT NOT NULL",
        title: "TEXT NOT NULL",
        type: "INTEGER NOT NULL",
        category: "INTEGER NOT NULL",
        date: "TEXT NOT NULL",
        duration: "INTEGER",
        description: "TEXT NOT NULL",
    });
    createTable("type", {
        id: "INTEGER PRIMARY KEY",
        icon: "TEXT NOT NULL",
        title: "TEXT NOT NULL",
    });
    createTable("category", {
        id: "INTEGER PRIMARY KEY",
        title: "TEXT NOT NULL",
        color: "TEXT NOT NULL",
    });
}
