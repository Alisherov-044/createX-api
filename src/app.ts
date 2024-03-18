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
} from "./routes";
import { createTables } from "./database";

export const app = express();

app.use(express.json());

createTables();

app.get("/", (_, res) => {
    res.json(routes);
});

app.use("/api/info", infoRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/events", eventRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/posts", postsRouter);
app.use("/api/testimonials", testimonialsRouter);
app.use("/api/team", teamRouter);
app.use("/api/type", typeRouter);

app.listen(PORT, () => {
    console.log(`server is running on port http://localhost:${PORT}/`);
});
