import {Request, Response, Router} from "express";
import {dbBlogs} from "../db/dbBlogs";

export const blogsRouter = Router ({})

blogsRouter.get('/', (req: Request, res: Response) => {
    res
        .status(200)
        .json(dbBlogs.blogs)
})