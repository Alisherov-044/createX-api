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
import { createTables } from "./database";
import { categoryRoute } from "./routes/category";
import { coursesRoute } from "./routes/courses";
import { infoRoute } from "./routes/info";
import { eventRoute } from "./routes/events";
import { postsRoute } from "./routes/posts";
import { testimonialsRoute } from "./routes/testimonials";
import { teamRoute } from "./routes/team";
import { typeRoute } from "./routes/type";

export const app = express();

app.use(express.json());

createTables();

app.get("/", (_, res) => {
    res.json(routes);
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
