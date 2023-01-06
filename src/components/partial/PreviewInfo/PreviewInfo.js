function PreviewInfo({ data }) {
    return (
        <div className="flex items-center gap-x-3">
            {data.vote_average && (
                <span className="block font-bold text-base text-green-600">
                    {`${Math.ceil(data.vote_average * 10)}% Match`}
                </span>
            )}
            {data.adult && (
                <span className="block text-xs px-1 border border-solid border-light-100">
                    {data.adult ? "18+" : "13+"}
                </span>
            )}
            {data.first_air_date && (
                <span className="block text-base font-semibold text-light-500">
                    {`${data.first_air_date.slice(0, 4)}`}
                </span>
            )}
            {data.release_date && (
                <span className="block text-base font-semibold text-light-500">
                    {`${data.release_date.slice(0, 4)}`}
                </span>
            )}
            {data.number_of_seasons && (
                <span className="font-semibold">
                    {data.number_of_seasons <= 1
                        ? `${data.number_of_episodes} episodes`
                        : `${data.number_of_seasons} seasons`}
                </span>
            )}
        </div>
    );
}

export default PreviewInfo;
