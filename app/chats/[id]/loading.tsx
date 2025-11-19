export default function Loading() {
    return (
        <div className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
            {/* Spinner circular */}
            <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-4"></div>
            <p className="text-lg font-medium">Cargando chat...</p>
        </div>
    );
}
