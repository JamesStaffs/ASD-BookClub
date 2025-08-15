import { useRouteLoaderData } from "react-router";

export default function Navigation() {
    const routerLoaderData = useRouteLoaderData("root");
    const isLoggedIn = routerLoaderData.isLoggedIn;

    return (
        <nav>
            <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-16">
                <a href="/" className="text-xl font-bold text-gray-900">BookClub</a>
                <div className="flex space-x-6">
                    <a href="/lists" className="text-gray-700 hover:text-blue-600 transition">Book Lists</a>
                    <a href="/lists/new" className="text-gray-700 hover:text-blue-600 transition">Create a List</a>
                    {isLoggedIn ? (
                        <a href="/auth/logout" className="text-gray-700 hover:text-blue-600 transition">Logout</a>
                    ) : (
                        <a href="/auth/login" className="text-gray-700 hover:text-blue-600 transition">Login</a>
                    )}
                </div>
            </div>
        </nav>
    );
};