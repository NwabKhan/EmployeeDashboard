import { AlertCircle } from "lucide-react";

const ErrorState = ({ message, onRetry }) => (
    <div className="flex flex-col items-center justify-center h-64 space-y-3">
        <AlertCircle className="h-10 w-10 text-red-500" />
        <p className="text-gray-700">{message}</p>
        <button
            onClick={onRetry}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
            Try Again
        </button>
    </div>
);

export default ErrorState;
