import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function IconOnlyButton({ ref, children, to, href, revert, size, border, className, onClick }) {
    let option = "w-12 h-12 text-2xl";
    if (size) {
        switch (size) {
            case 1:
                option = "w-10 h-10 text-xl";
                break;
            case 2:
                option = "w-12 h-12 text-2xl";
                break;
            case 3:
                option = "w-16 h-16 text-3xl";
                break;
            default:
                break;
        }
    }

    const classes = `round-icon-button ${className} ${option}
    ${revert ? "light-option" : "dark-option"}
    ${border ? "border-light-100 hover:border-2 hover:border-light-900" : "border-transparent"}`;

    let Comp = "button";

    if (to) {
        Comp = Link;
    } else if (href) {
        Comp = "a";
    }

    return (
        <Comp ref={ref} className={classes} to={to} href={href} onClick={onClick}>
            {children}
        </Comp>
    );
}

IconOnlyButton.propTypes = {
    children: PropTypes.any.isRequired,
    to: PropTypes.string,
    href: PropTypes.string,
    revert: PropTypes.bool,
    size: PropTypes.number,
    border: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default IconOnlyButton;
