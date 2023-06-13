import { redirect } from "react-router-dom";

export async function requireAuth(){
    // needs some authentication
    // check if already logged in    
    const isLoggedIn = localStorage.getItem('loggedIn');

    if(!isLoggedIn) {
        throw redirect("/login?msg=You must log in first") 
    }
    return null
}