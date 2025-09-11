import * as config from "~/config";
import { isAuthenticatedClient } from "~/utils/authentication";
import { useEffect, useState } from "react";

/**
 * TODO: Fix flash of unauthenticated state on initial load
 * - Possible solutions:
 *   - Use a loading state until authentication is confirmed
 *   - Implement server-side rendering checks if applicable
 *   - Use a context provider to manage auth state globally
 */

export default function Navigation() {
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        const isLoggedIn = isAuthenticatedClient();
        setLoggedIn(isLoggedIn);
    }, []);

    return (
        <nav>
            <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-16">
                <a href="/" className="text-xl font-bold text-gray-900">BookClub</a>
                <div className="flex space-x-6">
                    <a href={config.ROUTES.LISTS.INDEX} className="text-gray-700 hover:text-blue-600 transition">Book Lists</a>
                    <a href={config.ROUTES.LISTS.NEW} className="text-gray-700 hover:text-blue-600 transition">Create a List</a>
                    {loggedIn ? (
                        <a href={config.ROUTES.LOGOUT} className="text-gray-700 hover:text-blue-600 transition">Logout</a>
                    ) : (
                        <a href={config.ROUTES.LOGIN} className="text-gray-700 hover:text-blue-600 transition">Login</a>
                    )}
                </div>
            </div>
        </nav>
    );
};