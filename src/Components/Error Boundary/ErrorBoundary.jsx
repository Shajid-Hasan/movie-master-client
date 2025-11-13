import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("Error caught by boundary:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a1a1a] text-white">
                    <h1 className="text-3xl font-bold text-red-600 mb-4">
                        Something went wrong 😢
                    </h1>
                    <p>Please try refreshing the page or returning to the homepage.</p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
