interface Props {
    src: string
    classes: string
}

const Banner = ({src, classes}: Props) => {

    return(
        <div className={`w-full h-[50vh] ${classes} ${!src ? "bg-black": ""}`}>
            {
                src ? <img src={src} alt="Recipe Banner" className="w-full h-full object-cover" /> : ""
            }
        </div>
    )
}

export default Banner