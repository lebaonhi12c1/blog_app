'use client'

import ImageUpLoad from '@/components/input/image_upload';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react';

interface InitialProps 
{
    name: string,
    image: string,
    description: string,
}

const initialState:InitialProps = 
{   
    name: '',
    image: '',
    description: '',
}

function Create( ) {
    const [ state, set_state ] = useState( initialState )
    const router = useRouter()

    const custom_value = ( id: any, value: any ) =>
    {
        set_state(
            {
                ...state,
                [ id ]: value
            } 
        )
    }

    const handle_change = ( event: ChangeEvent<HTMLInputElement> ) =>
    {
        set_state(
            {
                ...state,
                [event.target.name]: event.target.value
            }
        )
    }

    const on_submit = async ( event: FormEvent ) =>
    {
        event.preventDefault()
        try {
            const res = await axios.post( '/api/blog', state)
            if( !res.status )
            {
                alert( 'Create fail!' )
                return
            }
    
            alert( 'Create success!' )
            router.push('/')
        } catch (error) {
            alert( 'Create fail!' )
        }
    }
    return (
        <div>
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new blog</h2>
                    <form
                        onSubmit={ on_submit }
                    >
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className='col-span-2'>
                                <ImageUpLoad
                                    value={ state.image }
                                    onChange={
                                        value => custom_value( 'image', value )
                                    }
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Blog Name</label>
                                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type blog name" required
                                    onChange={ handle_change }
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <input type="text" name="description" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Description" required
                                    onChange={ handle_change }
                                />
                            </div>
                        </div>
                        <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                            Add blog
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default Create;