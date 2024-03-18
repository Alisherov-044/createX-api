export type TRoute = {
    route: string;
    duty: string;
    methods: string[];
};

export const routes: TRoute[] = [
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
];
