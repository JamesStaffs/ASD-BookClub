/**
 * Adapted for JWTs from:
 * https://github.com/aaronksaunders/react-router-v7-auth-app-1
 * https://reactrouter.com/explanation/sessions-and-cookies
 */

import { Form, useNavigate, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import { useEffect } from "react";
import * as config from "~/config";
import { isAuthenticatedClient } from "~/utils/authentication";
import { dispatchAuthenticationEvent } from "~/events/AuthenticationEvent";

export async function clientAction({ params, request }: ActionFunctionArgs) {
    try {
        const formData = await request.formData();
        const email = formData.get("email")?.toString();
        const password = formData.get("password")?.toString();

        /**
         * NOTE:
         * This is a mock endpoint and the file is present in /public/api/v1/login
         * For this reason, the request URL begins with /api/.
         * The endpoint is hardcoded to return a string resembling a JWT for any email/password
         */
        const res = await fetch("/api/v1/login", {
            method: "POST",
            body: JSON.stringify({ email, password })
        });

        if (!res.ok) {
            throw new Error("Unable to authenticate with username or password");
        }

        const data = await res.json();
        if (!data.token) {
            throw new Error("No token returned from server");
        }

        return { token: data.token };
    } catch (error) {
        const message = (error instanceof Error) ? error.message : "An unknown error occurred";
        return { error: message };
    }
}

export default function AuthLogin({ actionData }: { actionData?: { error?: string; token?: string } }) {
    const navigate = useNavigate();
    useEffect(() => {
        // Redirect if already authenticated
        if (isAuthenticatedClient()) {
            navigate("/");
            return;
        }

        // Store token and redirect following successful login
        if (actionData?.token) {
            localStorage.setItem(config.JWT_LOCALSTORAGE_KEY, actionData.token);
            dispatchAuthenticationEvent();
            navigate("/");
            return;
        }
    }, [actionData]);

    return (
        <>
            <h1 className="text-3xl font-bold">Login</h1>
            
            <Form method="post" className="max-w-sm mx-auto mt-8 p-6 bg-white rounded shadow space-y-6">
                {actionData?.error && (
                    <div className="mb-4 text-red-600 text-sm font-medium">
                        {actionData.error}
                    </div>
                )}

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
                >
                    Login
                </button>
            </Form>
        </>
    );
}

