import { NextResponse } from "next/server";

import prisma from '../../lib/prismadb'

import getCurrentUser from "@/app/actions/getCurrentUser";

export const POST = async ( request: Request) =>
{
    const user = await getCurrentUser()
    if( !user )
    {
        return null
    }

    const body = await request.json()
    const { name, description, image } = body
    const blog = await prisma.blog.create(
        {
            data:
            {
                name,
                description,
                imageSrc: image,
                userId: user.id
            }
        }
    )
    return NextResponse.json( blog )
}

export const GET = async () =>
{
    const blogs = await prisma.blog.findMany()
    return NextResponse.json( blogs )
}