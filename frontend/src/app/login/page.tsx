"use client";

import {Button, Input} from "@nextui-org/react";
import { useMemo, useState } from "react";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function Home() {
    const [email, setEmail] = useState<string>("");
    const isInvalidEmail = useMemo<boolean>(() => {
        if (email === "") return false;

        return email.match(/^.+@([A-Z0-9.-]+\.[A-Z]{2,4})|(\[[0-9.]+\])|(\[IPv6[A-Z0-9:]+)$/i) ? false : true;
    }, [email])

    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const router = useRouter();
    
    const handleSubmit = async () => {
        if (isInvalidEmail || email == "" || password.length < 8) {
            setErrorMessage("Invalid Email/Password")
            setPassword("");
            return;
        }

        // mock for backend
        const res = await fetch("https://jsonplaceholder.typicode.com/users", {
            method: "Post",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })

        if (res.status == 401) {
            setErrorMessage("Invalid Email/Password");
            setPassword("");
            return;
        } else if (!res.ok) {
            setErrorMessage("We are currently encountering some issues, please try again later");
            setPassword("");
            return;
        } else {
            router.push("/dashboard")
        }
    }

    const Eye = () => {
        return <button className="focus:outline-none" type="button" onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? (
            <EyeSlashFilledIcon />
          ) : (
            <EyeFilledIcon />
          )}
        </button>
    }
    
    return <div className="w-screen h-screen flex items-center justify-center">
        <div className="flex flex-wrap md:max-w-md max-w-xs justify-center gap-4">  
            <Input isRequired type="email" label="Email" 
                placeholder="Enter your email" 
                value={email} onValueChange={setEmail} 
                color={isInvalidEmail ? "danger" : "default"}
                isInvalid={isInvalidEmail}
                errorMessage={isInvalidEmail && "Please enter a valid email"}
                />
            <Input isRequired type={isVisible ? "text" : "password"} 
                label="Password" endContent={<Eye />} 
                value={password} onValueChange={setPassword} />
            {errorMessage ? <p className="text-red-400 text-sm" role="alertdialog" >
                {errorMessage}
            </p> : <></>}
            <Button type="submit" color="primary" className="w-full" onClick={handleSubmit}> Login </Button>
            
            <div className="flex gap-3">
                <div> <Link href="/login/recovery"> Forgot Password </Link> </div>
                <div> | </div>
                <div> <Link href="/sign-up"> Sign up</Link> </div>
            </div>
        </div>
        
    </div>
}