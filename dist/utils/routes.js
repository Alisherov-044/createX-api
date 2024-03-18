"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
exports.routes = [
    {
        route: "/info",
        duty: "get all or add info",
        methods: ["GET", "POST"],
    },
    {
        route: "/info/{id}",
        duty: "get, edit or delete info by id",
        methods: ["GET", "POST", "DELETE"],
    },
    {
        route: "/categories",
        duty: "get all or add categories",
        methods: ["GET", "POST"],
    },
    {
        route: "/categories/{id}",
        duty: "get, edit or delete category by id",
        methods: ["GET", "POST", "DELETE"],
    },
    {
        route: "/courses",
        duty: "get all or add courses",
        methods: ["GET", "POST"],
    },
    {
        route: "/courses/{id}",
        duty: "get, edit or delete course by id",
        methods: ["GET", "POST", "DELETE"],
    },
    {
        route: "/events",
        duty: "get all or add events",
        methods: ["GET", "POST"],
    },
    {
        route: "/events/{id}",
        duty: "get, edit or delete event by id",
        methods: ["GET", "POST", "DELETE"],
    },
    {
        route: "/posts",
        duty: "get all or add posts",
        methods: ["GET", "POST"],
    },
    {
        route: "/posts/{id}",
        duty: "get, edit or delete post by id",
        methods: ["GET", "POST", "DELETE"],
    },
    {
        route: "/testimonials",
        duty: "get all or add testimonials",
        methods: ["GET", "POST"],
    },
    {
        route: "/testimonials/{id}",
        duty: "get, edit or delete testimonial by id",
        methods: ["GET", "POST", "DELETE"],
    },
    {
        route: "/team",
        duty: "get all or add team",
        methods: ["GET", "POST"],
    },
    {
        route: "/team/{id}",
        duty: "get, edit or delete team by id",
        methods: ["GET", "POST", "DELETE"],
    },
    {
        route: "/type",
        duty: "get all or add type",
        methods: ["GET", "POST"],
    },
    {
        route: "/type/{id}",
        duty: "get, edit or delete type by id",
        methods: ["GET", "POST", "DELETE"],
    },
];
