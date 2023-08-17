"use client";

import Input from "@/components/input/input";
import axios from "axios";
import React, { FormEvent, useState } from "react";
import { useRouter } from 'next/navigation'
import Link from "next/link";
interface InitStateProps {
    name: string;
    email: string;
    password: string;
}
const init_state: InitStateProps = {
    name: "",
    email: "",
    password: "",
};
function Register() {
    const [state, set_state] = useState(init_state);
    const router = useRouter()
    const handle_change = (e: any) => {
        set_state({
            ...state,
            [e.target.name]: e.target.value,
        });
    };
    
    const on_submit = async ( e: FormEvent ) =>
    {
        e.preventDefault()
        try {
            const res = await axios.post(
                '/api/register',
                state,
            )
    
            if( res.status != 200 ) 
            {
                alert( 'Register fail!')
                return
            }
            alert( 'Register success!')
            router.push( '/login' )
            
        } catch (error: any) {
            alert( 'Register fail!')
        }
        
    }
    return (
        <div className="bg-white flex items-center justify-center h-screen">
            <form className="text-center"
                onSubmit={ on_submit }
            >
                <div className="flex flex-col justify-center h-[450] w-[350px] mx-auto gap-2">
                    <Input
                        type="text"
                        name="name"
                        id="name"
                        value={state.name}
                        onChange={handle_change}
                        placeholder="Name..."
                    />
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        value={state.email}
                        onChange={handle_change}
                        placeholder="Email..."
                    />
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        value={state.password}
                        onChange={handle_change}
                        placeholder="Password..."
                    />
                    <button
                        type="submit"
                        className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Submit
                    </button>
                </div>
                
                <div className="italic text-[14px] mt-4">
                    Do you have an account? Go to <Link href="/login" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Login</Link>
                </div>

            </form>
        </div>
    );
}

export default Register;
