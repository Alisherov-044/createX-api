import * as zod from "zod";
import { Router } from "express";
import { createData, deleteData, getAllData, getDataById } from "../database";
import type { Express } from "express";

const scheme = zod.object({
    icon: zod.string({ required_error: "icon is required" }),
    title: zod.string({ required_error: "title is required" }),
});

export type TType = typeof scheme & { id: number };

export const typeRouter: Router = Router();

export function typeRoute(app: Express) {
    app.get("/type", (_, res) => {
        getAllData<TType[]>("type", (error, data) => {
            if (error || typeof data === "undefined") {
                return res.json({ message: "not found" }).status(404);
            }
            res.json(data).status(200);
        });
    }).post("/type", (req, res) => {
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

    app.get("/type/:id", (req, res) => {
        const id = req.params.id;
        getDataById<TType>("type", { id }, (error, data) => {
            if (error || typeof data === "undefined") {
                return res.json({ message: "not found" }).status(404);
            }
            res.json(data).status(200);
        });
    }).delete("/type/:id", (req, res) => {
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
}
