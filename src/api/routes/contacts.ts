import { Request, Response, Router } from "express";
import {
    getContact,
    setContact,
    editContact,
    deleteContact,
    getPersonsContact,
} from "../../services/database";

const route = Router();

export default (app: Router): void => {
    app.use("/contacts", route);

    route.get("/", async (req: Request, res: Response) => {
        // Use databases service
        const response = await getContact();
        // Return response
        return res.json(response).status(200);
    });

    route.get("/:id", async (req: Request, res: Response) => {
        // Get params
        const id = +req.params.id;
        // Use databases service
        const response = await getContact(id);
        // Return response
        return res.json(response).status(200);
    });

    route.get("/person/:id", async (req: Request, res: Response) => {
        // Get params
        const id = +req.params.id;
        // Use databases service
        const response = await getPersonsContact(id);
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
        if (['Phone', 'Whatsapp', 'Email'].indexOf(req.body.type) < 0)
            return res.status(400).json({
                errors: {
                    message: "A contact type must pertain to the set of valid ones",
                },
            });
        const newContact = req.body;
        // Use databases service
        const response = await setContact(newContact);
        // Return response
        res.setHeader("Content-Type", "application/json");
        return res.json(response).status(200);
    });

    route.put("/:id", async (req: Request, res: Response) => {
        // Get params
        if (!req.body)
            return res.status(400).json({
                errors: {
                    message: "A contact description object is required",
                },
            });
        if (+req.body?.id !== +req.params.id)
            return res.status(400).json({
                errors: {
                    message: "Contact object and ID not correlated",
                },
            });
        const editedContact = req.body;
        // Use databases service
        const response = await editContact(editedContact);
        // Return response
        res.setHeader("Content-Type", "application/json");
        return res.json(response).status(200);
    });

    route.delete("/:id", async (req: Request, res: Response) => {
        const id = +req.params.id;
        // Use databases service
        const response = await deleteContact(id);
        // Return response
        res.setHeader("Content-Type", "application/json");
        return res.json(response).status(200);
    });
};
