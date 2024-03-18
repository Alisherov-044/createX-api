"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const utils_1 = require("./utils");
const api_1 = require("./api");
const database_1 = require("./database");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
(0, database_1.createTables)();
exports.app.get("/", (_, res) => {
    res.json(utils_1.routes);
});
exports.app.use("/info", api_1.infoRouter);
exports.app.use("/courses", api_1.coursesRouter);
exports.app.use("/events", api_1.eventRouter);
exports.app.use("/categories", api_1.categoryRouter);
exports.app.use("/posts", api_1.postsRouter);
exports.app.use("/testimonials", api_1.testimonialsRouter);
exports.app.use("/team", api_1.teamRouter);
exports.app.use("/type", api_1.typeRouter);
exports.app.listen(utils_1.PORT, () => {
    console.log(`server is running on port http://localhost:${utils_1.PORT}/`);
});
