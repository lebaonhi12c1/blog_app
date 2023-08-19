
import prisma from '../lib/prismadb'

export const getBlogs = async () =>
{
    try {
        const res = await prisma.blog.findMany(
            {
                orderBy:
                {
                    createAt: 'desc'
                }
            }
        )
        const blogs = res.map(
            item =>
            (
                {
                    ...item,
                    createdAt: item.createAt.toISOString()
                }
            )
        )
        return blogs
    } catch (error: any) {
        throw new Error( error )
    }
}