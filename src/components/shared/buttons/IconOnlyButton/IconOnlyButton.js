import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function IconOnlyButton({ ref, children, to, href, color, size, border, className, onClick, ...props }) {
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

    const classes = `icon-only-button ${className} ${option} ${color}
    ${border ? "border-light-100 hover:border-light-500" : "border-transparent"}`;

    let Comp = "button";

    if (to) {
        Comp = Link;
    } else if (href) {
        Comp = "a";
    }

    return (
        <Comp ref={ref} className={classes} to={to} href={href} target="_blank" rel="noreferrer" onClick={onClick}>
            {children}
        </Comp>
    );
}

IconOnlyButton.propTypes = {
    children: PropTypes.any.isRequired,
    to: PropTypes.string,
    href: PropTypes.string,
    size: PropTypes.number,
    border: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default IconOnlyButton;
