import {Request, Response, Router} from "express";
import {dbPosts} from "../db/dbPosts";
import {RequestWithDelete, RequestWithPostsPOST} from "../typeForReqRes/helperTypeForReq";
import {getPostsView} from "../model/postsType/getPostsView";
import {postsCreateAndPutModel} from "../typeForReqRes/postsCreateAndPutModel";
import {_delete_all_} from "../typeForReqRes/blogsCreateAndPutModel";


export const postsRouter = Router({})
postsRouter.get('/', (req: Request, res: Response) => {
    res
        .status(200)
        .json(dbPosts.posts)
})

postsRouter.post('/', (req: RequestWithPostsPOST<postsCreateAndPutModel>, res: Response) => {
    const {title, shortDescription, content, blogId,blogName} = req.body


    let newPosts = {
        id: (+(new Date()) + Math.random()).toString(),
        title: title,
        shortDescription: shortDescription,
        content: content,
        blogId: blogId,
        blogName: blogName

    };
    dbPosts.posts.push(newPosts)

    res.status(201).send(newPosts)
})


postsRouter.get('/:id', (req: Request, res: Response) => {


    const foundBlogs = dbPosts.posts.find(c => c.id === req.body.id);
    if (!foundBlogs) {
        res.sendStatus(404)
        return;
    }
    res.json(getPostsView(foundBlogs))
        .send(200)
})


postsRouter.put('/:id', (req: Request, res: Response) => {
    const {id, title, shortDescription, content, blogId, blogName} = req.body

    const foundPosts = dbPosts.posts.find(v => v.id === id);

    if (foundPosts) {
        foundPosts.title = title;
        foundPosts.shortDescription = shortDescription;
        foundPosts.content = content;
        foundPosts.blogId = blogId;
        foundPosts.blogName = blogName;
        res.status(204).send(foundPosts)
    } else {
        res.send(404)
    }
})


postsRouter.delete('/:id', (req: RequestWithDelete<_delete_all_>, res: Response) => {

    const searchPosts = dbPosts.posts.find((p => p.id === req.params.id))
    if (!searchPosts) {
        return res.sendStatus(404)//Not Found
    }

    dbPosts.posts = dbPosts.posts
        .filter(c => c.id !== req.params.id);//переприсваиваем значение с помощью филтрации

    return res.sendStatus(204)//no content
})