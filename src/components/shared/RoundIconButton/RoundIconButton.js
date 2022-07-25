import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { forwardRef } from "react";

function RoundIconButton({ ref, children, to, href, textBlack, className, onClick }) {
    let Comp = "button";

    const classes = `round-icon-button ${className} ${
        !!textBlack
            ? "text-dark-900 bg-light-900/10 hover:bg-light-500/60 border-dark-500"
            : "text-light-900 bg-dark-100/10 hover:bg-dark-500/60 border-light-500"
    }`;
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
    textBlack: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default RoundIconButton;
