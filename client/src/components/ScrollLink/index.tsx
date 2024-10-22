import { Link } from "react-router-dom";

interface Props {
    to: string,
    className?: string,
    dataTestId?: string
    children: JSX.Element | string
}
const ScrollLink = ({ to, className, children, dataTestId }: Props) => (
    <Link to={to} className={className} data-testid={dataTestId} onClick={() => window.scrollTo(0, 0)} >{ children }</Link>
)

export default ScrollLink