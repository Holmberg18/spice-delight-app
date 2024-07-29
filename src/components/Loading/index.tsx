const Loading= () => {
    return (
        <div className="max-w-md rounded overflow-hidden shadow-lg m-8 flex flex-col justify-evenly items-center">
            <div className="w-full h-64 bg-gray-200 animate-pulse"></div>
            <div className="px-6 py-4 h-64 flex flex-col items-center justify-center">
                <div className="font-bold text-lg mb-2 bg-gray-300 h-6 w-3/4 animate-pulse"></div>
                <div className="bg-gray-300 h-4 w-1/2 animate-pulse mb-2"></div>
                <div className="bg-gray-300 h-4 w-1/4 animate-pulse mb-2"></div>
                <div className="bg-gray-300 h-6 w-3/4 animate-pulse mb-4"></div>
                <div className="flex flex-col items-center">
                    <div className="bg-gray-300 h-8 w-32 animate-pulse mb-2"></div>
                    <div className="bg-gray-300 h-8 w-32 animate-pulse"></div>
                </div>
            </div>
        </div>
    );
}

export default Loading;