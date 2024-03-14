import {Request, Response, NextFunction} from "express";
import {header} from "express-validator";

export const authGuardMiddleware = (req: Request,res: Response,next: NextFunction ) =>{
    const authHeader: any = req.headers.authorization;
    const oneAuthHeader = authHeader.split(' ').splice(0,1).toString()
    console.log('_____________________' + oneAuthHeader)
    if (!authHeader) {
       res.status(401).json({ error: 'Unauthorized' });
    }
    const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    const username = credentials[0];
    const password = credentials[1];
    if ( oneAuthHeader !=='Basic'|| username !== 'admin' || password !== 'qwerty') {
         res.status(401).json({ error: 'Unauthorized' });
    }
    next();
}
