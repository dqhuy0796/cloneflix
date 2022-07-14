import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function RoundIconButton({ children, to, href, textBlack, className, onClick }) {
    let Comp = "button";

    const classes = `round-icon-button ${className} ${
        !!textBlack ? "text-dark-900 bg-light-900 hover:bg-light-100" : "text-light-900 bg-dark-500 hover:bg-dark-100"
    }`;
    if (to) {
        Comp = Link;
    } else if (href) {
        Comp = "a";
    }

    return (
        <Comp className={classes} to={to} href={href} onClick={onClick}>
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
