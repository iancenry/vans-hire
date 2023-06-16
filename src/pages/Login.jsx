import { Form, useLoaderData, redirect, useActionData, useNavigation } from "react-router-dom"
import { loginUser } from '../api'

export function loginLoader({request}){
    if(localStorage.getItem('loggedIn')) return redirect('/host')
    return new URL(request.url).searchParams.get('msg')
}

export async function action({ request }){
    const formData = await request.formData()
    const email = formData.get('email')
    const password = formData.get("password")
    // get url that directed user to login page; default to host route
    const previousPathname = new URL(request.url).searchParams.get("redirectTo") || "/host"

    try {
        const data = await loginUser({email, password})
        localStorage.setItem('loggedIn', true)
        return redirect(previousPathname)
    } catch (error) {
        return error.message 
    }    
}

const Login = () => {
    const errorMessage = useActionData()
    const message = useLoaderData()
    const navigation = useNavigation()

    return (
        <div className="login-container">
            <h1>Sign In</h1>
            {errorMessage && <h3 className="red">{errorMessage}</h3>}
            {message && <h3 className="red">{message}</h3>}
            <Form method="post"  className="login-form">
                <input type="email" name="email" placeholder="Email Address" />
                <input type="password" name="password"placeholder="Password" />
                <button className="login-btn" disabled={navigation.state === "submitting"}>{navigation.state === "submitting" ? "Logging In..." : "Log In"}</button>
            </Form>
        </div>
    )
}

export default Login