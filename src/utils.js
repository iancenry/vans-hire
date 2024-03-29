import { redirect } from "react-router-dom";

export async function requireAuth(request) {
  const pathname = new URL(request.url).pathname;
  // needs some authentication
  // check if already logged in
  const isLoggedIn = localStorage.getItem("loggedIn");

  if (!isLoggedIn) {
    // return redirect("/login") - OG line below is due to mirage js not working well with latest react
    const response = redirect(
      `/login?msg=You must log in first.&redirectTo=${pathname}`
    );
    response.body = true;
    throw response;
  }
  return null;
}
