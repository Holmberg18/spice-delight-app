import { useState, ChangeEvent } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { CartState } from "@/context/Context"

const Searchbar = () => {

    const { mealState: { mealDispatch }} = CartState()
    const [isVisible, setIsVisible] = useState(false)
    return(
        <div className="relative">
            {
                isVisible ? (
                    <input
                        type="text"
                        placeholder="Search for recipes, restaurants..."
                        className="p-2 border rounded"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => mealDispatch({type: "FILTER_BY_SEARCH", payload: e.target.value})}
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