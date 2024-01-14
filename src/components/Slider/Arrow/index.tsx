interface Props {
    disabled: boolean,
    left?: boolean,
    onClick: (e: any) => void,
    fill: string
}

const Arrow = ({ disabled, left, onClick, fill}: Props) => {
    
    return(
        <svg
            onClick={onClick}
            className={`arrow ${left ? "arrow--left left-[5px]" : "arrow--right left-[auto] right-[5px]"} w-[40px] h-[40px] absolute translate-y-1/2 cursor-pointer ${disabled}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={fill}
        >
            {left && (
                <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
            )}
            {!left && (
                <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
            )}
        </svg>
    )
}

export default Arrow