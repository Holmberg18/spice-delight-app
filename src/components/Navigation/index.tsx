import { BrowserRouter as Router, Link } from "react-router-dom"

const Navigation = () => {
    return(
        <nav className="bg-white shadow p-4">
            <div className="max-w-7xl mx-auto flex items-center">
                <div className="space-x-4">
                    <Router>
                        <ul className="flex flex-column space-x-4">
                            <li><Link to="/"><div className="text-gray-700 hover:text-indigo-600">Home</div></Link></li>
                            <li><Link to="/Products"><div className="text-gray-700 hover:text-indigo-600">Products</div></Link></li>
                        </ul>
                    </Router>
                </div>
            </div>
        </nav>
    )
}

export default Navigation