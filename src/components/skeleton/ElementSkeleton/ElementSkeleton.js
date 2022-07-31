import PropTypes from "prop-types";
function ElementSkeleton({ type, className }) {
    //
    let classes = "w-full h-full";

    if (type === "avatar") {
        classes = "w-8 h-8 rounded-full";
    } else if (type === "thumbnail") {
        classes = "w-full h-full rounded";
    } else if (type === "title") {
        classes = "mb-3 w-1/2 h-full min-h-[20px] rounded-sm";
    } else if (type === "text") {
        classes = "w-full h-full min-h-[12px] rounded-sm";
    } else if (type === "backdrop") {
        classes = "absolute inset-0 w-full h-full animation-delay-100";
    }

    return (
        <div className={`${classes} ${className || "bg-dark-500"}`}>
            <div className={`w-full h-full animation-skeleton-loading`}></div>
        </div>
    );
}
ElementSkeleton.propTypes = {
    type: PropTypes.string,
};
export default ElementSkeleton;
