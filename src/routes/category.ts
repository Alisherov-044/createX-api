import * as zod from "zod";
import { Router } from "express";
import { createData, deleteData, getAllData, getDataById } from "../database";

const scheme = zod.object({
    title: zod.string({ required_error: "title is required" }),
    color: zod.string({ required_error: "color is required" }),
});

export type TCategory = typeof scheme & { id: number };

export const categoryRouter: Router = Router();

categoryRouter
    .get("/", (_, res) => {
        getAllData<TCategory[]>("category", (error, data) => {
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
            createData("category", type, (error) => {
                if (error) {
                    return res
                        .json({
                            message: "error accured while creating category",
                        })
                        .status(403);
                }
                res.json(type).status(201);
            });
        } catch (error) {
            res.json(error).status(403);
        }
    });

categoryRouter
    .get("/:id", (req, res) => {
        const id = req.params.id;
        getDataById<TCategory>("category", { id }, (error, data) => {
            if (error || typeof data === "undefined") {
                return res.json({ message: "not found" }).status(404);
            }
            res.json(data).status(200);
        });
    })
    .delete("/:id", (req, res) => {
        const id = req.params.id;
        deleteData("category", { id }, (error) => {
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
