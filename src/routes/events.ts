import * as zod from "zod";
import { Router } from "express";
import { createData, deleteData, getAllData, getDataById } from "../database";
import type { Express } from "express";

const scheme = zod.object({
    day: zod.string({ required_error: "day is required" }),
    month: zod.string({ required_error: "month is required" }),
    time: zod.string({ required_error: "time is required" }),
    title: zod.string({ required_error: "title is required" }),
    description: zod.string({ required_error: "description is required" }),
});

export type TEvent = typeof scheme & { id: number };

export const eventRouter: Router = Router();

export function eventRoute(app: Express) {
    app.get("/", (_, res) => {
        getAllData<TEvent[]>("events", (error, data) => {
            if (error || typeof data === "undefined") {
                return res.json({ message: "not found" }).status(404);
            }
            res.json(data).status(200);
        });
    }).post("/", (req, res) => {
        const events = req.body;
        try {
            scheme.parse(events);
            createData("events", events, (error) => {
                if (error) {
                    return res
                        .json({
                            message: "error accured while creating event",
                        })
                        .status(403);
                }
                res.json(events).status(201);
            });
        } catch (error) {
            res.json(error).status(403);
        }
    });

    app.get("/:id", (req, res) => {
        const id = req.params.id;
        getDataById<TEvent>("events", { id }, (error, data) => {
            if (error || typeof data === "undefined") {
                return res.json({ message: "not found" }).status(404);
            }
            res.json(data).status(200);
        });
    }).delete("/:id", (req, res) => {
        const id = req.params.id;
        deleteData("events", { id }, (error) => {
            if (error) {
                return res
                    .json({ message: "error accured while deleting event" })
                    .status(403);
            }
            res.json({
                message: `${id} - event delted successfully`,
            }).status(400);
        });
    });
}
