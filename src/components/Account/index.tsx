import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const Account = () => {
    return(
        <Link to="/login">
            <button>
                <FontAwesomeIcon icon={faUser} /> <span className="text-sm">My Account</span>
            </button>
        </Link>
    )
}

export default Account
