import { useState } from "react"
import { useLoaderData } from "react-router-dom"

export function loginLoader({request}){
    return new URL(request.url).searchParams.get('msg')
}

const Login = () => {
    const [loginFormData, setLoginFormData] = useState({email : "", password: ""})
    const message = useLoaderData()

    function handleChange(e){
        const {name, value} = e.target;
        setLoginFormData(prevData => ({...prevData, [name] : value}))
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log(loginFormData)
    }

    return (
        <div className="login-container">
            <h1>Sign In</h1>
            {message && <h3 className="red">{message}</h3>}
            <form onSubmit={handleSubmit} className="login-form">
                <input type="email" name="email" onChange={handleChange} value={loginFormData.email} placeholder="Email Address" />
                <input type="password" name="password" onChange={handleChange} value={loginFormData.password} placeholder="Password" />
                <button>Log In</button>
            </form>
        </div>
    )
}

export default Login