import { Link } from "react-router-dom";

function VerticalButton({ ref, children, to, href, className, onClick, topIcon, bottomIcon, type, ...props }) {
    let Comp = "button";
    const classes =
        "flex flex-col p-1 items-center justify-center min-w-[48px] text-[14px] bg-transparent text-white rounded border-none outline-none hover:shadow-none";

    if (to) {
        Comp = Link;
    } else if (href) {
        Comp = "a";
    }

    return (
        <Comp ref={ref} className={`${classes} ${className}`} to={to} href={href} onClick={onClick}>
            <p className="text-3xl">{topIcon}</p>
            <p>{children}</p>
            <p className="text-3xl">{bottomIcon}</p>
        </Comp>
    );
}

export default VerticalButton;
