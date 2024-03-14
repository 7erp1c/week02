import {Request, Response, NextFunction} from "express";
import {header} from "express-validator";

export const authGuardMiddleware = (req: Request,res: Response,next: NextFunction ) =>{
    const authHeader: any = req.headers.authorization;
    console.log("authHeader: " + authHeader)
    if (!authHeader) {
       res.status(401).json({ error: 'Unauthorized' });
    }
    const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    console.log("credentials: " + credentials)
    const username = credentials[0];
    console.log("username: " + username)
    const password = credentials[1];
    console.log("password: " + password)
    if (username !== 'admin' || password !== 'qwerty') {
         res.status(401).json({ error: 'Unauthorized' });
    }
    next();
}
