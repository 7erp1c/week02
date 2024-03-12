import {Request, Response, Router} from "express";
import {RequestWithDelete, RequestWithPostsPOST} from "../typeForReqRes/helperTypeForReq";
import {postsCreateAndPutModel} from "../typeForReqRes/postsCreateAndPutModel";
import {_delete_all_} from "../typeForReqRes/blogsCreateAndPutModel";
import {postsRepositories} from "../repositories/postsRepositories";


export const postsRouter = Router({})
postsRouter.get('/', (req: Request, res: Response) => {
    const foundFullPosts = postsRepositories.findFullPosts()
    res.send(foundFullPosts)
})

postsRouter.post('/', (req: RequestWithPostsPOST<postsCreateAndPutModel>, res: Response) => {
    const rB = req.body
    const newPostsFromRep = postsRepositories
        .createPosts("string",rB.title,rB.shortDescription,rB.content,rB.blogId,rB.blogName)
    res.status(201).send(newPostsFromRep)
})


postsRouter.get('/:id', (req: Request, res: Response) => {
    const foundPostsFromRep = postsRepositories.findPostsByID(req.params.id)
    if (!foundPostsFromRep) {
        res.sendStatus(404)
        return;
    }
    res.json(foundPostsFromRep)
        .send(200)
})


postsRouter.put('/:id', (req: Request, res: Response) => {
    const rB = req.body
    const isUpdatePosts = postsRepositories.updatePosts(req.params.id,rB.title,rB.shortDescription,rB.content,rB.blogId,rB.blogName)

    if (isUpdatePosts) {
        const foundPosts = postsRepositories.findPostsByID(req.params.id)

        res.send(foundPosts)
        return
    } else {
        res.send(404)
    }
})


postsRouter.delete('/:id', (req: RequestWithDelete<_delete_all_>, res: Response) => {

    const isDelete = postsRepositories.deletePosts(req.params.id)
    if (isDelete) {
        res.sendStatus(204)//Not Found
    } else{
        res.sendStatus(404)
    }
})