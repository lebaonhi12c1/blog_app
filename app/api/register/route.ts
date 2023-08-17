import { NextResponse } from "next/server";
import brcrypt from 'bcrypt'
import prisma from '../../lib/prismadb'

export async function POST( request: Request )
{
    const body = await request.json()
    const { email, name, password } = body
    const hashedPassword = await brcrypt.hash( password, 12 )
    const user = await prisma.user.create(
        {
            data:
            {
                email,
                name,
                hashedPassword,
                emailVerified: email,
            }
        }
    )
    return NextResponse.json( user )
}