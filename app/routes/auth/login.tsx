/**
 * Source and adapted from:
 * https://github.com/aaronksaunders/react-router-v7-auth-app-1
 * https://reactrouter.com/explanation/sessions-and-cookies
 */

import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import { createUserSession, getUserId } from "~/services/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
    // Check if the user is already logged in
    const userId = await getUserId(request);
    if (userId) {
        return redirect("/");
    }
}

export async function action({ request }: ActionFunctionArgs) {
    let response: Response;

    try {
        const formData = await request.formData();
        const email = formData.get("email")?.toString();
        const password = formData.get("password")?.toString();

        // Check the user's credentials
        if (email !== "james.stanley@staffs.ac.uk" || password !== "password") {
            throw new Error("Invalid email or password");
        }

        // Create a session
        response = await createUserSession({
            request,
            userId: "james.stanley@staffs.ac.uk",
            remember: true,
        });

        if (!response) {
            throw new Error("An error occurred while creating the session");
        }
    } catch (error) {
        if (error instanceof Error) {
            return { error: error.message };
        }

        return { error: "An unknown error occurred" };
    }

    throw response;
}

export default function AuthLogin({ actionData }: { actionData?: { error?: string } }) {
    return (
        <>
            <h1 className="text-3xl font-bold">Login</h1>
            <form method="post" className="max-w-sm mx-auto mt-8 p-6 bg-white rounded shadow space-y-6">
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
            </form>
        </>
    );
}

