import {getConnection} from "typeorm";
import Blog from "../entities/Blog";

const BlogController = {
    fetch: async (_req: any, res: any) => {
        const result =
            await getConnection()
                .createQueryBuilder()
                .select()
                .from(Blog, 'blog')
                .where({isActive: true})
                .execute()
        return res.send(result)
    },

    index: async (_req: any, res: any) => {

        const result =
            await getConnection()
                .createQueryBuilder()
                .select()
                .from(Blog, 'blog')
                .where({user: _req.body.whoSentTheRequest, isActive: true})
                .execute()
        return res.send(result)
    },

    create: async (req: any, res: any) => {
        const {postTitle, postContent, postShortDescription} = req.body

        try {
            const result = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(Blog)
                .values({
                    title: postTitle,
                    content: postContent,
                    shortDescription: postShortDescription,
                    user: req.body.whoSentTheRequest
                })
                .returning('id')
                .execute()
            return res.send(result)
        } catch (err) {
            return res.send({message: 'something went wrong , could not create '})
        }
    },

    destroy: async (req: any, res: any) => {
        await getConnection()
            .createQueryBuilder()
            .update(Blog)
            .set({isActive: false})
            .where({id: req.params.id})
            .execute()
        return res.send(`successfully deleted post with id: ${req.params.id}`)
    },

    getIndividual: async (req: any, res: any) => {

        const blog = await getConnection()
            .createQueryBuilder()
            .select("blog")
            .from(Blog, "blog")
            .where({id: req.params.id, isActive: true})
            .getOne()

        res.send(blog)
    },

    update: async (req: any, res: any) => {

        const {postTitle, postContent, postShortDescription} = req.body
        const blog_id = req.params.id
        try {
            await getConnection()
                .createQueryBuilder()
                .update(Blog)
                .set({
                    title: postTitle,
                    content: postContent,
                    shortDescription: postShortDescription
                })
                .where({id: blog_id})
                .execute()
            res.send({result: 'successfully updated'})
        } catch (err) {
            res.send(err)
        }
    }
}

export default BlogController



