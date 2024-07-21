import { useState, useRef, KeyboardEvent, MouseEventHandler } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from 'react-redux'
import { setKeyword } from '@/features/recipeSlice'
import { useNavigate } from 'react-router-dom'
import Button from "@/components/Button"


const Searchbar = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate() 
    const [isVisible, setIsVisible] = useState(false)
    const searchEl = useRef<any>()

    const dispatchSearch = (keyword: string): void => {
        dispatch(setKeyword(keyword))
        navigate("/products")
    }

    const handleKeyboardSearch = (e: KeyboardEvent): void => {
        if(e.key == "Enter"){
            const keyword: string | undefined = searchEl.current?.value
            if(keyword?.length)
                dispatchSearch(keyword)
        }
    }
    const handleButtonSearch = (): void => {
        const keyword: string | undefined = searchEl.current?.value
        if(keyword?.length)
            dispatchSearch(keyword)
    }

    return(
        <div className="relative">
            {
                isVisible ? (
                    <>
                        <input
                            ref={searchEl}
                            type="text"
                            placeholder="Search for recipes, restaurants..."
                            className="p-2 border rounded"
                            onKeyDown={handleKeyboardSearch}
                            autoFocus
                        />
                        <Button buttonType="button" name={"Search"} className={"mx-3"} rounded={true} action={handleButtonSearch}/>
                    </>
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