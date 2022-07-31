import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function RoundIconButton({ ref, children, to, href, revert = false, sizeS = false, sizeM = false, sizeL = false, border = false, className, onClick }) {
    let Comp = "button";

    const classes = `round-icon-button ${className} ${sizeS && "w-10 h-10 text-xl"} ${sizeM && "w-12 h-12 text-2xl"} ${sizeL && "w-16 h-16 text-3xl"} ${
        revert ? "light-option" : "dark-option"
    } ${border ? "border-light-100 hover:border-2 hover:border-light-900" : "border-transparent"}`;

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

RoundIconButton.propTypes = {
    children: PropTypes.any.isRequired,
    to: PropTypes.string,
    href: PropTypes.string,
    revert: PropTypes.bool,
    sizeS: PropTypes.bool,
    sizeM: PropTypes.bool,
    sizeL: PropTypes.bool,
    border: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default RoundIconButton;
