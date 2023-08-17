'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'



export default function Home() {
    
    const [ blogs, set_blogs ] = useState<any>( null )
    const getBlogs = async () =>
    {
        try {
            const blog = await axios.get('/api/blog')
            set_blogs( blog.data )
        } catch (error: any) {
            throw new Error( error )
        }
    }

    useEffect(
        () =>
        {
            getBlogs()
        }
    )
    return (
        <main className=" h-screen overflow-auto">
            <div
                className='w-[1250px] mx-auto bg-white mt-4'
            >
                {
                    JSON.stringify( blogs )
                }
            </div>

        </main>
    )
}
