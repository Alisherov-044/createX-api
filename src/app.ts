import express from "express";
import { PORT, routes } from "./utils";
import {
    infoRouter,
    coursesRouter,
    eventRouter,
    categoryRouter,
    postsRouter,
    typeRouter,
    testimonialsRouter,
    teamRouter,
} from "./api";
import { createTables } from "./database";

export const app = express();

app.use(express.json());

createTables();

app.get("/", (_, res) => {
    res.json(routes);
});

app.get("/wtf", (_, res) => {
    res.json("F you");
});

app.use("/info", infoRouter);
app.use("/courses", coursesRouter);
app.use("/events", eventRouter);
app.use("/categories", categoryRouter);
app.use("/posts", postsRouter);
app.use("/testimonials", testimonialsRouter);
app.use("/team", teamRouter);
app.use("/type", typeRouter);

app.listen(PORT, () => {
    console.log(`server is running on port http://localhost:${PORT}/`);
});
