import { Link } from "react-router-dom";

function HorizontalButton({
    ref,
    children,
    to,
    href,
    className,
    onClick,
    leftIcon,
    rightIcon,
    theme,
    border,
    ...props
}) {
    const classes = `horizontal-button ${className} ${theme || "default"}
    ${border ? "border-light-100 hover:border-light-500" : "border-transparent"}`;

    let Comp = "button";

    if (to) {
        Comp = Link;
    } else if (href) {
        Comp = "a";
    }

    return (
        <Comp ref={ref} className={classes} to={to} href={href} {...props} onClick={onClick}>
            <p className="text-2xl">{leftIcon}</p>
            <p>{children}</p>
            <p className="text-2xl">{rightIcon}</p>
        </Comp>
    );
}

export default HorizontalButton;
