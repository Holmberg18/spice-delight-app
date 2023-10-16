import { MouseEventHandler } from "react"

interface Props {
    name?: string;
    action?: MouseEventHandler<HTMLButtonElement>,
    rounded: boolean
    icon?: JSX.Element
    classes?: string
}

const Button = ({ name, action, rounded, icon, classes }: Props) => {

    return (
        <button className={"bg-black hover:bg-blue-700 text-white text-sm h-12 px-6 py-3 "+classes} onClick={action} style={{borderRadius: rounded ? 24: 0}}>
            {name}{icon}
        </button>
    )
}

export default Button