import { forwardRef } from "react";
import { Link } from "react-router-dom";

function Button({ ref, children, to, href, className, onClick, leftIcon, rightIcon, topIcon, bottomIcon, ...props }) {
    let Comp = "button";
    let Elem = "span";
    let classes = "flex items-center justify-center min-w-[60px] rounded border border-transparent hover:shadow-none";
    let leftRight = "flex-row text-[18px] font-black py-2 px-4 gap-2 shadow shadow-[#696969]";
    let topBottom = "flex-col text-[14px] p-1";
    let iconStyle = "text-3xl";
    if (to) {
        Comp = Link;
    } else if (href) {
        Comp = "a";
    }

    if (topIcon || bottomIcon) {
        Elem = "p";
        classes = `${classes} ${topBottom}`;
    } else {
        Elem = "span";
        classes = `${classes} ${leftRight}`;
    }

    return (
        <Comp ref={ref} className={`${classes} ${className}`} to={to} href={href} onClick={onClick}>
            <Elem className={iconStyle}>{topIcon}</Elem>
            <Elem className={iconStyle}>{leftIcon}</Elem>
            <Elem>{children}</Elem>
            <Elem className={iconStyle}>{rightIcon}</Elem>
            <Elem className={iconStyle}>{bottomIcon}</Elem>
        </Comp>
    );
}

export default Button;
