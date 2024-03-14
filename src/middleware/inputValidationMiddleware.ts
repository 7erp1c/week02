import {body} from "express-validator";
import {dbBlogs} from "../db/dbBlogs";




export const blogsValidation = [
body('name').isString().isLength({min:1,max:15}),
body('description').isString().isLength({min:1,max:500}),
body('websiteUrl').isString().isLength({min:1,max:100})
    .matches(new RegExp("^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$")).bail()
]




export const postsValidation = [
body('title').isString().isLength({min:1,max:30}).bail(),
body('shortDescription').isString().isLength({min:1,max:100}).bail(),
body('content').isString().isLength({min:1,max:1000}),
body('blogId').isString().custom(
    (value) => {
        const blog = dbBlogs.blogs.find(el => el.id === value);
        if (!blog) {
            throw new Error();
        }
        return value;
    }
)]

