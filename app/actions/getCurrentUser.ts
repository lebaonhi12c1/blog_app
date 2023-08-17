import { getServerSession } from 'next-auth'

import { authOptions } from '../api/auth/[...nextauth]/route'

import prisma from '../lib/prismadb'

export async function getSesstion () 
{
    return await getServerSession( authOptions )
}

export default async function getCurrentUser ()
{
    try {
        const sesstion = await getSesstion()

        if( !sesstion?.user?.email )
        {
            return null
        }

        const user = await prisma.user.findUnique(
            {
                where: 
                {
                    email: sesstion?.user?.email as string
                }
            }
        )

        if( !user )
        {
            return null
        }

        return {
            ...user,
            createdAt: user.createAt.toISOString(),
            updatedAt: user.updateAt.toISOString(),
        }

    } catch (error) {
        return null
    }
}