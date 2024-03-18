import * as zod from "zod";
import { Router } from "express";
import { createData, deleteData, getAllData, getDataById } from "../database";

const scheme = zod.object({
    image: zod.string({ required_error: "image is required" }),
    name: zod.string({ required_error: "name is required" }),
    specification: zod.string({ required_error: "specification is required" }),
    description: zod.string({ required_error: "description is required" }),
});

export type TTestimonial = typeof scheme & { id: number };

export const testimonialsRouter: Router = Router();

testimonialsRouter
    .get("/", (_, res) => {
        getAllData<TTestimonial[]>("testimonials", (error, data) => {
            if (error || typeof data === "undefined") {
                return res.json({ message: "not found" }).status(404);
            }
            res.json(data).status(200);
        });
    })
    .post("/", (req, res) => {
        const testimonials = req.body;
        try {
            scheme.parse(testimonials);
            createData("testimonials", testimonials, (error) => {
                if (error) {
                    return res
                        .json({
                            message:
                                "error accured while creating testimonials",
                        })
                        .status(403);
                }
                res.json(testimonials).status(201);
            });
        } catch (error) {
            res.json(error).status(403);
        }
    });

testimonialsRouter
    .get("/:id", (req, res) => {
        const id = req.params.id;
        getDataById<TTestimonial>("testimonials", { id }, (error, data) => {
            if (error || typeof data === "undefined") {
                return res.json({ message: "not found" }).status(404);
            }
            res.json(data).status(200);
        });
    })
    .delete("/:id", (req, res) => {
        const id = req.params.id;
        deleteData("testimonials", { id }, (error) => {
            if (error) {
                return res
                    .json({
                        message: "error accured while deleting testimonials",
                    })
                    .status(403);
            }
            res.json({
                message: `${id} - testimonials delted successfully`,
            }).status(400);
        });
    });
