import IconOnlyButton from "~/components/shared/buttons/IconOnlyButton";
import { IoPlay } from "react-icons/io5";
import { SMALL_IMAGE_BASE_URL } from "~/constants";

function EpisodeItem({ data }) {
    return (
        <div className="flex w-full text-light-500 p-4 cursor-pointer group">
            <p className="flex-none flex items-center justify-center w-[10%] font-bold text-xl text-light-500">
                {data.episode_number}
            </p>
            <div className="flex-none flex items-center justify-center w-1/5 align-middle">
                <div className="relative pt-[56.25%] w-full rounded overflow-hidden">
                    {data.still_path ? (
                        <img
                            src={`${SMALL_IMAGE_BASE_URL}${data.still_path}`}
                            alt={data.name || data.episode_number}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    ) : (
                        <div className="flex items-center justify-center absolute inset-0 w-full h-full bg-dark-100">
                            <span>No thumbnail</span>
                        </div>
                    )}
                    <IconOnlyButton border color={"dark"} className="absolute-center opacity-0 group-hover:opacity-100">
                        <IoPlay />
                    </IconOnlyButton>
                </div>
            </div>
            <div className="flex-1 p-4">
                <div className="flex items-center justify-between mb-3">
                    <p className="line-clamp-1 font-bold text-lg max-w-[80%] text-light-900">{data.name}</p>
                    <p className="text-sm text-light-500">{`${data.runtime}m`}</p>
                </div>
                <p className="line-clamp-2 mt-4 text-sm text-light-100">{data.overview || "No overview"}</p>
            </div>
        </div>
    );
}

export default EpisodeItem;
