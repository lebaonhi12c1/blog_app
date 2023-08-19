import React, { useCallback } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

declare global {
    var cloudinary: any
}

interface ImageUpLoadProps
{
    onChange: ( value: string ) => void
    value: string
}

function ImageUpLoad( { onChange, value }: ImageUpLoadProps ) {

    const handle_upload = useCallback( 
        ( result: any) =>
        {   onChange(
                result.info.secure_url
            )
        },
        []
    )
    return (
        <CldUploadWidget
            onUpload={ handle_upload }
            uploadPreset='eyk0mcfz'
            options={
                {
                    maxFiles: 1
                }
            }
        >
            {
                ( { open } ) =>
                {
                    return (
                        <div className="relative"
                            onClick={
                                () => open?.()
                            }
                        >
                            <div>
                                Click to upload
                            </div>
                            {
                                value &&
                                (
                                    <div
                                        className='relative h-[25rem] border border-dashed'
                                    >
                                        <Image
                                            alt='image'
                                            fill
                                            src={ value }
                                            className=' object-contain'
                                        />
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            }
        </CldUploadWidget>
    );
}

export default ImageUpLoad;