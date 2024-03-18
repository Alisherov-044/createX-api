"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coursesRouter = void 0;
const zod = __importStar(require("zod"));
const express_1 = require("express");
const database_1 = require("../database");
const scheme = zod.object({
    category: zod.number({ required_error: "category is required" }),
    image: zod.string({ required_error: "image is required" }),
    title: zod.string({ required_error: "title is required" }),
    price: zod.number({ required_error: "price is required" }),
    tutor: zod.string({ required_error: "tutor is required" }),
});
exports.coursesRouter = (0, express_1.Router)();
exports.coursesRouter
    .get("/", (_, res) => {
    (0, database_1.getAllData)("courses", (error, data) => {
        if (error || typeof data === "undefined") {
            return res.json({ message: "not found" }).status(404);
        }
        res.json(data).status(200);
    });
})
    .post("/", (req, res) => {
    const courses = req.body;
    try {
        scheme.parse(courses);
        (0, database_1.createData)("courses", courses, (error) => {
            if (error) {
                return res
                    .json({
                    message: "error accured while creating course",
                })
                    .status(403);
            }
            res.json(courses).status(201);
        });
    }
    catch (error) {
        res.json(error).status(403);
    }
});
exports.coursesRouter
    .get("/:id", (req, res) => {
    const id = req.params.id;
    (0, database_1.getDataById)("courses", { id }, (error, data) => {
        if (error || typeof data === "undefined") {
            return res.json({ message: "not found" }).status(404);
        }
        res.json(data).status(200);
    });
})
    .delete("/:id", (req, res) => {
    const id = req.params.id;
    (0, database_1.deleteData)("courses", { id }, (error) => {
        if (error) {
            return res
                .json({ message: "error accured while deleting course" })
                .status(403);
        }
        res.json({ message: `${id} - course delted successfully` }).status(400);
    });
});
