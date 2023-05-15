import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [loginFormData, setLoginFormData] = useState({email : "", password: ""})

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
            <form onSubmit={handleSubmit} className="login-form">
                <input type="email" name="email" onChange={handleChange} value={loginFormData.email} placeholder="Email Address" />
                <input type="password" name="password" onChange={handleChange} value={loginFormData.password} placeholder="Password" />
                <button>Log In</button>
            </form>
        </div>
    )
}

export default Login