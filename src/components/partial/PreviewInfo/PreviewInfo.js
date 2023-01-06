import _ from "lodash";

function PreviewInfo({ data, className }) {
    return (
        <div className={`flex flex-wrap items-center gap-x-3 ${className}`}>
            {data.vote_average && (
                <span className="inline font-bold text-base text-green-600">
                    {`${Math.ceil(data.vote_average * 10)}% Match`}
                </span>
            )}
            {!_.isUndefined(data.adult) && (
                <span className="inline px-1 text-xs text-light-500 border border-solid border-light-100">
                    {data.adult ? "18+" : "13+"}
                </span>
            )}
            {data.first_air_date && (
                <span className="inline text-base font-semibold text-light-500">
                    {`${data.first_air_date.slice(0, 4)}`}
                </span>
            )}
            {data.release_date && (
                <span className="inline text-base font-semibold text-light-500">
                    {`${data.release_date.slice(0, 4)}`}
                </span>
            )}
            {data.number_of_seasons && (
                <span className="inline text-base font-semibold text-light-500">
                    {data.number_of_seasons <= 1
                        ? `${data.number_of_episodes} episodes`
                        : `${data.number_of_seasons} seasons`}
                </span>
            )}
        </div>
    );
}

export default PreviewInfo;
