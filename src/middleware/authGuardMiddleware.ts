import {Request, Response, NextFunction} from "express";

export const authGuardMiddleware = (req: Request,res: Response,next: NextFunction ) =>{
    if(req.query.login === "admin" && req.query.password === "qwerty" ){
        next()
    } else {
        res.status(401).send('Unauthorized');
    }
}