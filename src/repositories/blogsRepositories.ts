import {getBlogsView} from "../model/blogsType/getBlogsView";
import {dbBlogs} from "../db/dbBlogs";
import {blogsCreateAndPutModel} from "../typeForReqRes/blogsCreateAndPutModel";
import {blogsView} from "../model/blogsType/blogsView";

export const blogsRepositories = {
//get(/)
    findFullBlogs() {
        return dbBlogs.blogs
    },
//post(/)
    createBlogs(name: string, description: string, websiteUrl: string) {

        let newBlogs = {
            id: (+(new Date())).toString(),
            name: name,
            description: description,
            websiteUrl: websiteUrl,

        };
        dbBlogs.blogs.push(getBlogsView(newBlogs))

        return newBlogs

    },
//get(/id)
    findBlogsByID(id: string) {
        let foundBlogs = dbBlogs.blogs.find(c => c.id === id);

        return (foundBlogs)

    },
//put(/id)
    updateBlogs(id: string, name: string, description: string, websiteUrl: string) {
        let foundBlogs = dbBlogs.blogs.find(v => v.id === id);


        if (foundBlogs) {

            foundBlogs.name = name;
            foundBlogs.description = description;
            foundBlogs.websiteUrl = websiteUrl;

            return true;
        } else {
            return false
        }
    },
//delete(/id)
    deleteBlogs(id: string) {
        const searchBlogs = dbBlogs.blogs.find((b => b.id === id))
        if (searchBlogs) {
            dbBlogs.blogs = dbBlogs.blogs
                .filter(c => c.id !== id)
            return true
        } else {
            return false
        }

    }


}


