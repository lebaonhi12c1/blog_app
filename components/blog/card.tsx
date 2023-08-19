import { SafeBlog, SafeUser } from "@/types";
import Image from "next/image";
import React, { memo } from "react";

interface blogProps {
    key: string;
    data: SafeBlog;
    currentUser: SafeUser | null;
}

function CradBlog({ key, data, currentUser }: blogProps) {
    return (
        <div className="grid grid-cols-3 gap-4 p-4" key={key}>
            <div
                className="flex flex-col gap-4"
            >
                <div className="h-[200px] w-full relative">
                    <Image
                        src={data?.imageSrc}
                        alt="blog-image"
                        fill
                        className="object-cover"
                    />
                </div>
                
                <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button type="button" className="px-4 py-2 text-sm font-medium text-red-600 bg-transparent border border-red-600 rounded-l-lg hover:bg-red-600 hover:text-white focus:z-10 focus:ring-2 focus:ring-red-500 focus:bg-red-600 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-red-700 dark:focus:bg-red-700">
                        Remove
                    </button>
                    <button type="button" className="px-4 py-2 text-sm font-medium text-blue-600 bg-transparent border border-blue-600 rounded-r-md hover:bg-blue-600 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-600 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-blue-700 dark:focus:bg-blue-700">
                        Edit
                    </button>
                </div>

            </div>
            <div className=" col-span-2">
                <h1
                    className="text-[2rem]"
                >
                    {
                        data?.name
                    }
                </h1>
                <div>
                    {
                        data?.description
                    }
                </div>
            </div>
        </div>
    );
}

export default memo(CradBlog);
