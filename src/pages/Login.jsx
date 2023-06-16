import { useState } from "react"
import { Form, useLoaderData, redirect, useActionData } from "react-router-dom"
import { loginUser } from '../api'

export function loginLoader({request}){
    // since loaders always run before route transitions, we check if user already logged in to prevent access to login page and redirect to /host
    if(localStorage.getItem('loggedIn')) return redirect('/host')
    // pull message from url search parameter
    return new URL(request.url).searchParams.get('msg')
}

export async function action({ request }){
    // get data from Form component
    const formData = await request.formData()
    const email = formData.get('email')
    const password = formData.get("password")
    try {
        // send data and await response from server api
        const data = await loginUser({email, password})
        localStorage.setItem('loggedIn', true)
        return redirect("/host")
    } catch (error) {
        return error.message 
    }    
}

const Login = () => {
    const errorMessage = useActionData()
    const message = useLoaderData()

    return (
        <div className="login-container">
            <h1>Sign In</h1>
            {errorMessage && <h3 className="red">{errorMessage}</h3>}
            {message && <h3 className="red">{message}</h3>}
            <Form method="post"  className="login-form">
                <input type="email" name="email" placeholder="Email Address" />
                <input type="password" name="password"placeholder="Password" />
                <button className="login-btn" disabled={status === "submitting"}>{status === "submitting" ? "Logging In..." : "Log In"}</button>
            </Form>
        </div>
    )
}

export default Login