import { SMALL_IMAGE_BASE_URL } from "~/constants";
function EpisodeItem(data) {
    console.log(data);
    return (
        <table className="w-full border-collapse">
            <tbody>
                <tr>
                    <td className="py-4 align-middle">
                        <span className="px-4 text-xl">{data?.episode_number}</span>
                    </td>
                    <td className="py-4 align-middle">
                        <div className="relative h-[90px] w-[160px] rounded overflow-hidden">
                            <img
                                src={`${SMALL_IMAGE_BASE_URL}${data?.still_path}`}
                                alt={data?.name}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                    </td>
                    <td className="py-4 align-middle">
                        <div className="px-4 h-full w-full min-w-[500px]">
                            <p className="mb-3 text-base text-light-900">
                                <span className="text-ellipsis whitespace-nowrap overflow-hidden">{data?.name}</span>
                                <span className="float-right">{`${data?.runtime}m`}</span>
                            </p>
                            <p className="line-clamp-2 text-sm text-light-100">{data?.overview}</p>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default EpisodeItem;
