import * as config from "~/config";
import { isAuthenticatedClient } from "~/utils/authentication";
import { useEffect, useState, type JSX } from "react";
import { AuthenticationEvent } from "~/events/AuthenticationEvent";
import { Link } from "react-router";

export default function Navigation(): JSX.Element {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const checkAuth = () => setLoggedIn(isAuthenticatedClient());
        checkAuth();

        // Listen for custom 'authenticated' event
        window.addEventListener("authentication", (e) => {
            if (e instanceof AuthenticationEvent) {
                checkAuth();
            }
        });

        return () => {
            window.removeEventListener("authenticated", checkAuth);
        };
    }, []);

    return (
        <nav>
            <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-16">
                <Link to={config.ROUTES.HOME} className="text-xl font-bold text-gray-900">BookClub</Link>
                <div className="flex space-x-6">
                    <Link to={config.ROUTES.LISTS.INDEX} className="text-gray-700 hover:text-blue-600 transition">Book Lists</Link>
                    <Link to={config.ROUTES.LISTS.NEW} className="text-gray-700 hover:text-blue-600 transition">Create a List</Link>
                    {loggedIn ? (
                        <Link to={config.ROUTES.LOGOUT} className="text-gray-700 hover:text-blue-600 transition">Logout</Link>
                    ) : (
                        <Link to={config.ROUTES.LOGIN} className="text-gray-700 hover:text-blue-600 transition">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};