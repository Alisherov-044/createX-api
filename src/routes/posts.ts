import * as zod from "zod";
import { Router } from "express";
import { createData, deleteData, getAllData, getDataById } from "../database";
import type { Express } from "express";

const scheme = zod.object({
    image: zod.string({ required_error: "image is required" }),
    title: zod.string({ required_error: "title is required" }),
    type: zod.number({ required_error: "type is required" }),
    category: zod.number({ required_error: "category is required" }),
    date: zod.string({ required_error: "date is required" }),
    duration: zod.number({ required_error: "duration is required" }),
    description: zod.string({ required_error: "description is required" }),
});

export type TPost = typeof scheme & { id: number };

export const postsRouter: Router = Router();

export function postsRoute(app: Express) {
    app.get("/posts", (_, res) => {
        getAllData<TPost[]>("posts", (error, data) => {
            if (error || typeof data === "undefined") {
                return res.json({ message: "not found" }).status(404);
            }
            res.json(data).status(200);
        });
    }).post("/posts", (req, res) => {
        const posts = req.body;
        try {
            scheme.parse(posts);
            createData("posts", posts, (error) => {
                if (error) {
                    return res
                        .json({
                            message: "error accured while creating posts",
                        })
                        .status(403);
                }
                res.json(posts).status(201);
            });
        } catch (error) {
            res.json(error).status(403);
        }
    });

    app.get("/posts/:id", (req, res) => {
        const id = req.params.id;
        getDataById<TPost>("posts", { id }, (error, data) => {
            if (error || typeof data === "undefined") {
                return res.json({ message: "not found" }).status(404);
            }
            res.json(data).status(200);
        });
    }).delete("/posts/:id", (req, res) => {
        const id = req.params.id;
        deleteData("posts", { id }, (error) => {
            if (error) {
                return res
                    .json({
                        message: "error accured while deleting posts",
                    })
                    .status(403);
            }
            res.json({
                message: `${id} - posts delted successfully`,
            }).status(400);
        });
    });
}
