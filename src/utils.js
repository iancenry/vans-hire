import { redirect } from "react-router-dom";

export async function requireAuth(){
    const isLoggedIn = false;

    if(!isLoggedIn) {
        // return redirect("/login") - OG line below is due to mirage js not working well with latest react
        const response  = redirect("/login?msg=You must log in first") 
        response.body = true
        throw response
    }
    return null
}