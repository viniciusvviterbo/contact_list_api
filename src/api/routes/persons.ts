import { Request, Response, Router } from "express";
import {
    getPerson,
    setPerson,
    editPerson,
    deletePerson,
} from "../../services/database";

const route = Router();

export default (app: Router): void => {
    app.use("/persons", route);

    route.get("/", async (req: Request, res: Response) => {
        // Use databases service
        const response = await getPerson();
        // Return response
        return res.json(response).status(200);
    });

    route.get("/:id", async (req: Request, res: Response) => {
        // Get params
        const id = +req.params.id;
        // Use databases service
        const response = await getPerson(id);
        // Return response
        return res.json(response).status(200);
    });

    route.post("/", async (req: Request, res: Response) => {
        // Get params
        if (!req.body)
            return res.status(400).json({
                errors: {
                    message: "A person description object is required",
                },
            });
        const newPerson = req.body;
        // Use databases service
        const response = await setPerson(newPerson);
        // Return response
        res.setHeader("Content-Type", "application/json");
        return res.json(response).status(200);
    });

    route.put("/:id", async (req: Request, res: Response) => {
        // Get params
        if (!req.body)
            return res.status(400).json({
                errors: {
                    message: "A person description object is required",
                },
            });
        if (+req.body.id !== +req.params.id)
            return res.status(400).json({
                errors: {
                    message: "Person object and ID not correlated",
                },
            });
        const editedPerson = req.body;
        // Use databases service
        const response = await editPerson(editedPerson);
        // Return response
        res.setHeader("Content-Type", "application/json");
        return res.json(response).status(200);
    });

    route.delete("/:id", async (req: Request, res: Response) => {
        const id = +req.params.id;
        // Use databases service
        const response = await deletePerson(id);
        // Return response
        res.setHeader("Content-Type", "application/json");
        return res.json(response).status(200);
    });
};
