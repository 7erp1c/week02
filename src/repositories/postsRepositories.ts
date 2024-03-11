import { dbPosts } from "../db/dbPosts";
import { getPostsView } from "../model/postsType/getPostsView";
import {postsView} from "../model/postsType/postsView";

export const postsRepositories = {
    //get(/)
    findFullPosts() {
        return dbPosts.posts
    },
//post(/)
    createPosts(title: string, shortDescription: string, content: string, blogId:string,blogName:string) {

        let newPosts = {
            id: (+(new Date()) + Math.random()).toString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blogName

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

        if (foundPosts) {
            foundPosts.title = title;
            foundPosts.shortDescription = shortDescription;
            foundPosts.content = content;
            foundPosts.blogId = blogId;
            foundPosts.blogName = blogName;
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