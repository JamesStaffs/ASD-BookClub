/**
 * Source and adapted from:
 * https://github.com/aaronksaunders/react-router-v7-auth-app-1
 * https://reactrouter.com/explanation/sessions-and-cookies
 */

import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import { logout } from "~/services/session.server";

/**
 * Action function for the logout route.
 * Handles the logout process when a POST request is made to this route.
 * 
 * @param {Route.ActionArgs} params - The action arguments.
 * @returns {Promise<Response>} Redirect response after logging out.
 * @see https://reactrouter.com/en/dev/route/action
 */
export async function action({ request }: ActionFunctionArgs) {
    return logout(request);
}

/**
 * Loader function for the logout route.
 * Redirects to the login page if accessed directly.
 * 
 * @param {Route.LoaderArgs} params - The loader arguments.
 * @returns {Response} Redirect response to the login page.
 * @see https://reactrouter.com/en/dev/route/loader
 */
export async function loader({ request }: LoaderFunctionArgs) {
    return logout(request);
    // return redirect("/auth/login");
}