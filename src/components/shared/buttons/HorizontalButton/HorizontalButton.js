import { Link } from "react-router-dom";

function HorizontalButton({ ref, children, to, href, className, onClick, leftIcon, rightIcon, type, ...props }) {
    let Comp = "button";
    const classes =
        "flex items-center justify-center gap-x-2 px-4 min-w-[160px] h-12 text-xl rounded-3xl border-none outline-none hover:shadow-none";

    if (to) {
        Comp = Link;
    } else if (href) {
        Comp = "a";
    }

    let option = "text-white bg-transparent";
    if (type) {
        switch (type) {
            case "light":
                option = "text-black bg-light-900/80 hover:bg-light-900/50";
                break;
            case "dark":
                option = "text-white bg-dark-100/80 hover:bg-dark-100/50";
                break;
            default:
                break;
        }
    }

    return (
        <Comp ref={ref} className={`${classes} ${option} ${className}`} to={to} href={href} onClick={onClick}>
            <p className="text-2xl">{leftIcon}</p>
            <p>{children}</p>
            <p className="text-2xl">{rightIcon}</p>
        </Comp>
    );
}

export default HorizontalButton;
