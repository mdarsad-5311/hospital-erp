import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function NotFound() {
    const location = useLocation();

    useEffect(() => {
        console.error(
            "404 Error: User attempted to access non-existent route:",
            location.pathname
        );
    }, [location.pathname]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="mb-4 text-5xl font-bold text-gray-800">404</h1>

                <p className="mb-6 text-lg text-gray-500">
                    Oops! Page not found
                </p>

                <a
                    href="/"
                    className="text-blue-600 underline hover:text-blue-700 font-medium"
                >
                    Return to Home
                </a>
            </div>
        </div>
    );
}
