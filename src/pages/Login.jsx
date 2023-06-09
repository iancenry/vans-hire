import { useState } from "react"
import { Form, useLoaderData, useNavigate } from "react-router-dom"
import { loginUser } from '../api'

export function loginLoader({request}){
    return new URL(request.url).searchParams.get('msg')
}

export async function action({ request }){
    const formData = await request.formData()
    const email = formData.get('email')
    const password = formData.get("password")
    //precess the info and passto loginUser function
    console.log(email, password)
    return null
}

const Login = () => {
    const [status, setStatus] = useState("idle")
    const [error, setError] = useState(null)
    const message = useLoaderData()
    //we can use the useNavigate hook which is a function version of the Navigate component to navigate to a new route 
    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault()
        setStatus("submitting")
        setError(null) 
        loginUser(loginFormData)
            .then(res => {
                navigate("/host", {replace : true})
            })
            .catch(err => setError(err))
            .finally(() => {
                setStatus("idle") 
            })                    
    }

    return (
        <div className="login-container">
            <h1>Sign In</h1>
            {error && <h3 className="red">{error.message}</h3>}
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