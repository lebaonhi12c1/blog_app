import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcrypt'
import NextAuth, { AuthOptions } from 'next-auth'
import  CredentialsProvider  from 'next-auth/providers/credentials'
import prisma from '../../../lib/prismadb'

export const authOptions: AuthOptions = {
    adapter:PrismaAdapter( prisma ),
    providers:
    [
        CredentialsProvider(
            {
                credentials: {
                    email:
                    {
                        label: 'email',
                        type: 'text',
                    },
                    password:
                    {
                        label: 'password',
                        type: 'password',
                    }
                },
                async authorize( credential: any )
                {
                    if( !credential?.email || !credential?.password )
                    {
                        throw new Error( 'Invalid credential' )
                    }
                    const user = await prisma.user.findUnique(
                        {
                            where:
                            {
                                email: credential?.email
                            }
                        }
                    )

                    if( !user || !user.hashedPassword )
                    {
                        throw new Error( 'Invalid credential' )
                    }

                    const isCorrect = await bcrypt.compare(
                        credential.password,
                        user.hashedPassword
                    )

                    if( !isCorrect )
                    {
                        throw new Error( 'Invalid credential' )
                    }
                    return user
                }
            }
        )
    ],
    pages:
    {
        signIn: '/'
    },
    debug:process.env.NODE_ENV === 'development',
    session: 
    {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth( authOptions )

export { handler as GET, handler as POST }