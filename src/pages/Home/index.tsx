const Home = () => {
    return (
        <div className="bg-gray-100 text-gray-800">

            {/* Navbar */}
            <nav className="bg-white shadow p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="text-2xl font-bold text-indigo-600">Brand</div>
                <div className="space-x-4">
                <a href="#" className="text-gray-700 hover:text-indigo-600">Home</a>
                <a href="#" className="text-gray-700 hover:text-indigo-600">About</a>
                <a href="#" className="text-gray-700 hover:text-indigo-600">Services</a>
                <a href="#" className="text-gray-700 hover:text-indigo-600">Contact</a>
                </div>
            </div>
            </nav>
    
            {/* Main content */}
            <main className="mt-10">
            <div className="max-w-7xl mx-auto px-4">
                
                {/* Hero section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                    <h1 className="text-4xl font-semibold mb-4">Welcome to our website</h1>
                    <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum nisi in neque ultrices viverra.</p>
                </div>
                <div>
                    <img src="https://via.placeholder.com/400" alt="Placeholder Image" className="w-full rounded-md shadow-lg" />
                </div>
                </div>
    
                {/* Features section */}
                <section className="mt-16">
                <h2 className="text-3xl font-semibold mb-8">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl mb-4">Feature One</h3>
                    <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl mb-4">Feature Two</h3>
                    <p className="text-gray-600">Sed interdum nisi in neque ultrices viverra.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl mb-4">Feature Three</h3>
                    <p className="text-gray-600">Cras facilisis quam vitae urna pulvinar fermentum.</p>
                    </div>
                </div>
                </section>
            </div>
            </main>
    
            {/* Footer */}
            <footer className="bg-indigo-600 text-white p-4 mt-16">
            <div className="max-w-7xl mx-auto text-center">
                <p>&copy; 2023 My Company. All rights reserved.</p>
            </div>
            </footer>
    
      </div>
    )
}

export default Home