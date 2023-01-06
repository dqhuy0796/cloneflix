import { IoPlay } from "react-icons/io5";
import IconOnlyButton from "~/components/shared/buttons/IconOnlyButton";
import { YOUTUBE_BASE_URL } from "~/constants";

function TrailersAndMore({ data }) {
    return (
        <div>
            <h3 className="pb-4 font-bold text-2xl text-light-900">Trailers & More</h3>

            <ul className="grid grid-cols-autofit-240 auto-rows-[1fr] gap-4 w-full">
                {data.map((item, index) => (
                    <li key={index}>
                        <VideoItems data={item} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

function VideoItems({ data }) {
    return (
        <div className="flex flex-col min-w-[240px] w-full h-full rounded overflow-hidden group">
            <div className="relative pt-[56.25%] w-full">
                <img
                    src={`https://img.youtube.com/vi/${data.key}/sddefault.jpg`}
                    alt={data.name}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <IconOnlyButton
                    color={"youtube"}
                    href={`${YOUTUBE_BASE_URL}${data.key}`}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
                >
                    <IoPlay />
                </IconOnlyButton>
            </div>
            <div className="p-2">
                <a
                    href={`${YOUTUBE_BASE_URL}${data.key}`}
                    target="_blank"
                    rel="noreferrer"
                    title={data.name}
                    className="line-clamp-2 font-semibold text-light-500 group-hover:text-light-900 group-hover:underline"
                >
                    {data.name}
                </a>
            </div>
        </div>
    );
}

export default TrailersAndMore;
