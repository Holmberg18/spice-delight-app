import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons"
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons"

interface Props {
    rating: number,
    onClick?: Function,
    className?: string
}

const Rating = ({ rating, onClick, className }: Props) => {

    return (
        <div className={"flex flex-row " + className}>
            {[...Array(5)].map((_, i: number) => (
                <span key={i} onClick={() => onClick ? onClick(i) : ""} >
                    {rating > i ? (
                        <FontAwesomeIcon icon={solidStar} className="text-base"/>
                    ) : (
                        <FontAwesomeIcon icon={regularStar} className="text-base"/>
                    )}
                </span>
            ))}
        </div>
    )
}

export default Rating