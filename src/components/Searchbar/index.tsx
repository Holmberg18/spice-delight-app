import { useState, KeyboardEvent } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from 'react-redux'
import { sortKeyword } from '@/features/recipeSlice'
import { useNavigate } from 'react-router-dom'


const Searchbar = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSearch = (e: KeyboardEvent): void => {
        if(e.key == "Enter"){
            const keyword = e.target as HTMLInputElement
            dispatch(sortKeyword(keyword?.value))
            navigate("/products")
        }
    }

    const [isVisible, setIsVisible] = useState(false)
    return(
        <div className="relative">
            {
                isVisible ? (
                    <input
                        type="text"
                        placeholder="Search for recipes, restaurants..."
                        className="p-2 border rounded"
                        onKeyDown={handleSearch}
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