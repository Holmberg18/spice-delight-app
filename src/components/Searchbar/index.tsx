import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Searchbar = () => {

    const [isVisible, setIsVisible] = useState(false)
    return(
        <div className="relative">
                    {
                isVisible ? (
                    <input
                        type="text"
                        placeholder="Search for recipes, restaurants..."
                        className="p-2 border rounded"
                        onBlur={() => setIsVisible(false)}
                        autoFocus
                        />
                ) : (
                    <FontAwesomeIcon
                        icon={faSearch}
                        onClick={() => setIsVisible(true)}
                        className="cursor-pointer"
                        />
                )
            }

        </div>
    )
}

export default Searchbar