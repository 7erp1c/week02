import express, {Request, Response} from 'express'
import {blogsRouter} from "./router/blogs-router";
export const app = express()

app.use(express.json())
app.use('/blogs', blogsRouter)

app.get('/', (req: Request, res: Response) => {
    res
        .status(200)
        .json({x: "x1"})

})
// app.delete('/testing/all-data', (req, res) => {
//     dbBlogs.videos = [];
//     res.sendStatus(204);
// })