import Image from "next/image"
import { getBlogs } from "./actions/getBlogs"
import getCurrentUser from "./actions/getCurrentUser"
import Card from "@/components/blog/card"

export default async function Home() {
    
    const user = await getCurrentUser()
    const blogs = await getBlogs()

    return (
        <main className=" h-screen overflow-auto">
            <div
                className='w-[1250px] mx-auto bg-white mt-4'
            >
                <div
                    className="flex flex-col gap-4"
                >
                    {
                        blogs.map(
                            ( item ) =>
                            (
                                <Card
                                
                                    key={
                                        item?.id
                                    }
                                    data={
                                        item
                                    }
                                    currentUser={ 
                                        user
                                    }
                                />
                            )
                        )
                    }
                </div>
            </div>

        </main>
    )
}
