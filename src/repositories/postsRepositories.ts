import { dbPosts } from "../db/dbPosts";
import {blogsRepositories} from "./blogsRepositories";
import {dbBlogs} from "../db/dbBlogs";




export const postsRepositories = {
    //get(/)
    findFullPosts() {
        return dbPosts.posts
    },
//post(/)
    createPosts(id:string, title: string, shortDescription: string, content: string, blogId:string,blogName:string) {
        let getNameByID = dbBlogs.blogs
            .filter(b=> b.id ===  blogId)
            .map(n => n.name).toString()

        let newPosts = {
            id: (+new Date()).toString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: getNameByID

        };
        dbPosts.posts.push(newPosts)

        return newPosts

    },
//get(/id)
    findPostsByID(id: string) {
        let foundPosts = dbPosts.posts.find(c => c.id === id);

        return (foundPosts)

    },
//put(/id)
    updatePosts(id: string, title: string, shortDescription: string, content: string, blogId:string,blogName:string) {
        let foundPosts = dbPosts.posts.find(v => v.id === id);
        let getNameByID = dbBlogs.blogs
            .filter(b=> b.id ===  blogId)
            .map(n => n.name).toString()
        if (foundPosts) {
            foundPosts.title = title;
            foundPosts.shortDescription = shortDescription;
            foundPosts.content = content;
            foundPosts.blogId = blogId;
            foundPosts.blogName = getNameByID;
            return true;
            } else {
            return false
        }

    },
//delete(/id)
    deletePosts(id: string) {
        const searchPosts = dbPosts.posts.find((b => b.id === id))
        if (searchPosts) {
            dbPosts.posts = dbPosts.posts
                .filter(c => c.id !== id)
            return true
        } else {
            return false
        }

    }
}