import * as zod from "zod";
import { Router } from "express";
import { createData, deleteData, getAllData, getDataById } from "../database";

const scheme = zod.object({
    category: zod.number({ required_error: "category is required" }),
    image: zod.string({ required_error: "image is required" }),
    title: zod.string({ required_error: "title is required" }),
    price: zod.number({ required_error: "price is required" }),
    tutor: zod.string({ required_error: "tutor is required" }),
});

export type TCourse = typeof scheme & { id: number };

export const coursesRouter: Router = Router();

coursesRouter
    .get("/", (_, res) => {
        getAllData<TCourse[]>("courses", (error, data) => {
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
            createData("courses", courses, (error) => {
                if (error) {
                    return res
                        .json({
                            message: "error accured while creating course",
                        })
                        .status(403);
                }
                res.json(courses).status(201);
            });
        } catch (error) {
            res.json(error).status(403);
        }
    });

coursesRouter
    .get("/:id", (req, res) => {
        const id = req.params.id;
        getDataById<TCourse>("courses", { id }, (error, data) => {
            if (error || typeof data === "undefined") {
                return res.json({ message: "not found" }).status(404);
            }
            res.json(data).status(200);
        });
    })
    .delete("/:id", (req, res) => {
        const id = req.params.id;
        deleteData("courses", { id }, (error) => {
            if (error) {
                return res
                    .json({ message: "error accured while deleting course" })
                    .status(403);
            }
            res.json({ message: `${id} - course delted successfully` }).status(
                400
            );
        });
    });
