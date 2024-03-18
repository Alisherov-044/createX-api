import * as zod from "zod";
import { Router } from "express";
import { createData, deleteData, getAllData, getDataById } from "../database";
import type { Express } from "express";

const scheme = zod.object({
    image: zod.string({ required_error: "image is required" }),
    name: zod.string({ required_error: "name is required" }),
    specification: zod.string({ required_error: "specification is required" }),
    facebook: zod.string({ required_error: "facebook is required" }),
    instagram: zod.string({ required_error: "instagram is required" }),
    linkedin: zod.string({ required_error: "linkedin is required" }),
});

export type TTeam = typeof scheme & { id: number };

export const teamRouter: Router = Router();

export function teamRoute(app: Express) {
    app.get("/team", (_, res) => {
        getAllData<TTeam[]>("team", (error, data) => {
            if (error || typeof data === "undefined") {
                return res.json({ message: "not found" }).status(404);
            }
            res.json(data).status(200);
        });
    }).post("/team", (req, res) => {
        const team = req.body;
        try {
            scheme.parse(team);
            createData("team", team, (error) => {
                if (error) {
                    return res
                        .json({
                            message: "error accured while creating team",
                        })
                        .status(403);
                }
                res.json(team).status(201);
            });
        } catch (error) {
            res.json(error).status(403);
        }
    });

    app.get("/team/:id", (req, res) => {
        const id = req.params.id;
        getDataById<TTeam>("team", { id }, (error, data) => {
            if (error || typeof data === "undefined") {
                return res.json({ message: "not found" }).status(404);
            }
            res.json(data).status(200);
        });
    }).delete("/team/:id", (req, res) => {
        const id = req.params.id;
        deleteData("team", { id }, (error) => {
            if (error) {
                return res
                    .json({ message: "error accured while deleting team" })
                    .status(403);
            }
            res.json({
                message: `${id} - team delted successfully`,
            }).status(400);
        });
    });
}
