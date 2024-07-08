import { MouseEventHandler } from "react"

interface Props {
    name?: string
    disabled?: boolean
    action?: MouseEventHandler<HTMLButtonElement>,
    rounded: boolean
    icon?: JSX.Element
    className?: string
    buttonType: "button" | "submit" | "reset" | undefined
}

const Button = ({ name, disabled, action, rounded, icon, className, buttonType }: Props) => {

    return (
        <button type={buttonType} disabled={disabled} className={`bg-black hover:bg-blue-700 text-white text-sm max-w-content sm:h-12 md:h-14 lg:h-16 px-6 sm:py-3 md:py-4 lg:py-5 ${className}`} onClick={action} style={{borderRadius: rounded ? 24: 0}}>
                {name}{icon}
        </button>
    )

}

export default Button