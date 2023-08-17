"use client";

import Input from "@/components/input/input";
import axios from "axios";
import React, { FormEvent, useState } from "react";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
interface InitStateProps {
    email: string;
    password: string;
}
const init_state: InitStateProps = {
    email: "",
    password: "",
};
function Login() {
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
            const res = await signIn( 
                'credentials',
                {
                    ...state,
                    redirect: false,
                }
            )
            if( res?.error )
            {
                alert( 'Login fail!' )
                return
            }
            alert( 'Login success!' )
            router.push( '/' )
        } catch (error) {
            alert( 'Login fail!')
        }
    }
    return (
        <div className="bg-white flex items-center justify-center h-screen">
            <form className="text-center"
                onSubmit={ on_submit }
            >
                <div className="flex flex-col justify-center h-[450] w-[350px] mx-auto gap-2">
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
                    Do you dont have an account? Go to <Link href="/register" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Register</Link>
                </div>

            </form>
        </div>
    );
}

export default Login;
