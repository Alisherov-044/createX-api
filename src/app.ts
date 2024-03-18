import express from "express";
import { PORT, routes } from "./utils";
// import {
//     infoRouter,
//     coursesRouter,
//     eventRouter,
//     postsRouter,
//     typeRouter,
//     testimonialsRouter,
//     teamRouter,
// } from "./routes";
import {
    createData,
    createTables,
    deleteData,
    getAllData,
    getDataById,
} from "./database";
import { TCategory, categoryRoute } from "./routes/category";
import { coursesRoute } from "./routes/courses";
import { infoRoute } from "./routes/info";
import { eventRoute } from "./routes/events";
import { postsRoute } from "./routes/posts";
import { testimonialsRoute } from "./routes/testimonials";
import { teamRoute } from "./routes/team";
import { typeRoute } from "./routes/type";
import { scheme as categoryScheme } from "./routes/category";

export const app = express();

app.use(express.json());

createTables();

app.get("/", (_, res) => {
    res.json(routes);
});

app.get("/categories", (_, res) => {
    getAllData<TCategory[]>("category", (error, data) => {
        if (error || typeof data === "undefined") {
            return res.json({ message: "not found" }).status(404);
        }
        res.json(data).status(200);
    });
}).post("/categories", (req, res) => {
    const type = req.body;
    try {
        categoryScheme.parse(type);
        createData("category", type, (error) => {
            if (error) {
                return res
                    .json({
                        message: "error accured while creating category",
                    })
                    .status(403);
            }
            res.json(type).status(201);
        });
    } catch (error) {
        res.json(error).status(403);
    }
});

app.get("/categories/:id", (req, res) => {
    const id = req.params.id;
    getDataById<TCategory>("category", { id }, (error, data) => {
        if (error || typeof data === "undefined") {
            return res.json({ message: "not found" }).status(404);
        }
        res.json(data).status(200);
    });
}).delete("/categories/:id", (req, res) => {
    const id = req.params.id;
    deleteData("category", { id }, (error) => {
        if (error) {
            return res
                .json({
                    message: "error accured while deleting category",
                })
                .status(403);
        }
        res.json({
            message: `${id} - category delted successfully`,
        }).status(400);
    });
});

// app.use("/api/info", infoRouter);
// app.use("/api/courses", coursesRouter);
// app.use("/api/events", eventRouter);
// app.use("/api/categories", categoryRouter);
// app.use("/api/posts", postsRouter);
// app.use("/api/testimonials", testimonialsRouter);
// app.use("/api/team", teamRouter);
// app.use("/api/type", typeRouter);
infoRoute(app);
coursesRoute(app);
eventRoute(app);
categoryRoute(app);
postsRoute(app);
testimonialsRoute(app);
teamRoute(app);
typeRoute(app);

app.listen(PORT, () => {
    console.log(`server is running on port http://localhost:${PORT}/`);
});
