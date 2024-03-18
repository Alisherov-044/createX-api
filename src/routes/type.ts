import * as zod from "zod";
import { Router } from "express";
import { createData, deleteData, getAllData, getDataById } from "../database";

const scheme = zod.object({
    icon: zod.string({ required_error: "icon is required" }),
    title: zod.string({ required_error: "title is required" }),
});

export type TType = typeof scheme & { id: number };

export const typeRouter: Router = Router();

typeRouter
    .get("/", (_, res) => {
        getAllData<TType[]>("type", (error, data) => {
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
            createData("type", type, (error) => {
                if (error) {
                    return res
                        .json({
                            message: "error accured while creating type",
                        })
                        .status(403);
                }
                res.json(type).status(201);
            });
        } catch (error) {
            res.json(error).status(403);
        }
    });

typeRouter
    .get("/:id", (req, res) => {
        const id = req.params.id;
        getDataById<TType>("type", { id }, (error, data) => {
            if (error || typeof data === "undefined") {
                return res.json({ message: "not found" }).status(404);
            }
            res.json(data).status(200);
        });
    })
    .delete("/:id", (req, res) => {
        const id = req.params.id;
        deleteData("type", { id }, (error) => {
            if (error) {
                return res
                    .json({
                        message: "error accured while deleting type",
                    })
                    .status(403);
            }
            res.json({
                message: `${id} - type delted successfully`,
            }).status(400);
        });
    });
