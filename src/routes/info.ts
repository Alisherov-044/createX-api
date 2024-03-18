import * as zod from "zod";
import { Router } from "express";
import { createData, deleteData, getAllData, getDataById } from "../database";

const scheme = zod.object({
    title: zod.string({ required_error: "title is required" }),
    amount: zod.number({ required_error: "amount is required" }),
});

export type TInfo = typeof scheme & { id: number };

export const infoRouter: Router = Router();

infoRouter
    .get("/", (_, res) => {
        getAllData<TInfo[]>("info", (error, data) => {
            if (error || typeof data === "undefined") {
                return res.json({ message: "not found" }).status(404);
            }
            res.json(data).status(200);
        });
    })
    .post("/", (req, res) => {
        const info = req.body;
        try {
            scheme.parse(info);
            createData("info", info, (error) => {
                if (error) {
                    return res
                        .json({ message: "error accured while creating info" })
                        .status(403);
                }
                res.json(info).status(201);
            });
        } catch (error) {
            res.json(error).status(403);
        }
    });

infoRouter
    .get("/:id", (req, res) => {
        const id = req.params.id;
        getDataById<TInfo>("info", { id }, (error, data) => {
            if (error || typeof data === "undefined") {
                return res.json({ message: "not found" }).status(404);
            }
            res.json(data).status(200);
        });
    })
    .delete("/:id", (req, res) => {
        const id = req.params.id;
        deleteData("info", { id }, (error) => {
            if (error) {
                return res
                    .json({ message: "error accured while deleting info" })
                    .status(403);
            }
            res.json({ message: `${id} - info delted successfully` }).status(
                400
            );
        });
    });
