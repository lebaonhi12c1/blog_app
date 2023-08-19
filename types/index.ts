
import { Blog, User } from "@prisma/client";

export type SafeUser = Omit<   
    User,
    'createdAt' |
    'updatedAt' |
    'emailVerified'
> &
{
    createdAt: string,
    updatedAt: string,
    emailVerified: string,
}

export type SafeBlog = Omit<
    Blog,
    'createdAt'
> &
{
    createdAt: string
}