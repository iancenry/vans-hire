import { useState } from "react"
import { useLoaderData } from "react-router-dom"
import { loginUser } from '../api'

export function loginLoader({request}){
    return new URL(request.url).searchParams.get('msg')
}

const Login = () => {
    const [loginFormData, setLoginFormData] = useState({email : "", password: ""})
    const [status, setStatus] = useState("idle")
    const [error, setError] = useState(null)
    const message = useLoaderData()

    function handleChange(e){
        const {name, value} = e.target;
        setLoginFormData(prevData => ({...prevData, [name] : value}))
    }

    function handleSubmit(e){
        e.preventDefault()
        setStatus("submitting")
        //the res/user object returned will be typically saved somewhere eg in a cookie/context/session storage so that you can display the user's name somewhere in the app
        loginUser(loginFormData)
            .then(res => console.log(res))
            .catch(err => setError(err.message))

        setStatus("idle")   
        setError(null)    
    }

    return (
        <div className="login-container">
            <h1>Sign In</h1>
            {error && <h2 className="red">{error}</h2>}
            {message && <h3 className="red">{message}</h3>}
            <form onSubmit={handleSubmit} className="login-form">
                <input type="email" name="email" onChange={handleChange} value={loginFormData.email} placeholder="Email Address" />
                <input type="password" name="password" onChange={handleChange} value={loginFormData.password} placeholder="Password" />
                <button className="login-btn" disabled={status === "submitting" ? true : false}>Log In</button>
            </form>
        </div>
    )
}

export default Login