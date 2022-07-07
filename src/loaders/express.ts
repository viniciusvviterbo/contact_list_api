import { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import config from "../config";
import routes from "../api";
import { HttpException } from "../types/error";

export default ({ app }: { app: Application }): void => {
    // Health Check
    app.get("/status", (_: Request, res: Response) => {
        res.status(200).end();
    });
    app.head("/status", (_: Request, res: Response) => {
        res.status(200).end();
    });

    app.use(cors());
    app.use(bodyParser.json());
    app.use(config.api.prefix, routes());

    // Error handling
    app.use(
        (err: HttpException, _: Request, res: Response, next: NextFunction) => {
            return next(err);
        }
    );

    app.use(
        (err: HttpException, _: Request, res: Response, next: NextFunction) => {
            res.status(err.status || 500);
            res.json({
                errors: {
                    message: err.message,
                },
            });
            next(err);
        }
    );
};
