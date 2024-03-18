import express from "express";
import { PORT, routes } from "./utils";
import { infoRouter } from "./api";
import { createTables } from "./database";
import { coursesRouter } from "./api/courses";

export const app = express();

app.use(express.json());
app.use(express.static("public"));

createTables();

app.get("/", (_, res) => {
    res.json(routes);
});

app.use("/info", infoRouter);
app.use("/courses", coursesRouter);

app.listen(PORT, () => {
    console.log(`server is running on port http://localhost:${PORT}/`);
});
