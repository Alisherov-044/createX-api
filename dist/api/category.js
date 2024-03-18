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
exports.categoryRouter = void 0;
const zod = __importStar(require("zod"));
const express_1 = require("express");
const database_1 = require("../database");
const scheme = zod.object({
    title: zod.string({ required_error: "title is required" }),
    color: zod.string({ required_error: "color is required" }),
});
exports.categoryRouter = (0, express_1.Router)();
exports.categoryRouter
    .get("/", (_, res) => {
    (0, database_1.getAllData)("category", (error, data) => {
        if (error || typeof data === "undefined") {
            return res.json({ message: "not found" }).status(404);
        }
        res.json(data).status(200);
    });
})
    .post("/", (req, res) => {
    const type = req.body;
    try {
        scheme.parse(type);
        (0, database_1.createData)("category", type, (error) => {
            if (error) {
                return res
                    .json({
                    message: "error accured while creating category",
                })
                    .status(403);
            }
            res.json(type).status(201);
        });
    }
    catch (error) {
        res.json(error).status(403);
    }
});
exports.categoryRouter
    .get("/:id", (req, res) => {
    const id = req.params.id;
    (0, database_1.getDataById)("category", { id }, (error, data) => {
        if (error || typeof data === "undefined") {
            return res.json({ message: "not found" }).status(404);
        }
        res.json(data).status(200);
    });
})
    .delete("/:id", (req, res) => {
    const id = req.params.id;
    (0, database_1.deleteData)("category", { id }, (error) => {
        if (error) {
            return res
                .json({
                message: "error accured while deleting category",
            })
                .status(403);
        }
        res.json({
            message: `${id} - category delted successfully`,
        }).status(400);
    });
});
