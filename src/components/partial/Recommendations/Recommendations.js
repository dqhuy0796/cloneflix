import _ from "lodash";
import { FiPlus } from "react-icons/fi";
import { IoPlay } from "react-icons/io5";
import { SquareLogo } from "~/components/Icons";
import PreviewInfo from "~/components/partial/PreviewInfo";
import IconOnlyButton from "~/components/shared/buttons/IconOnlyButton";
import ElementSkeleton from "~/components/skeleton/ElementSkeleton";
import { SMALL_IMAGE_BASE_URL } from "~/constants";

function Recommendations({ data }) {
    return (
        <div>
            <h3 className="pb-4 font-bold text-2xl text-light-900">More like this</h3>

            <ul className="grid grid-cols-autofit-240 auto-rows-[1fr] gap-5 w-full">
                {data.map((item, index) => (
                    <li key={index}>
                        <RecommendationItems data={item} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

function RecommendationItems({ data }) {
    return (
        <div className="flex flex-col min-w-[240px] w-full h-full rounded overflow-hidden bg-dark-500 group">
            <div className="relative pt-[56.25%] w-full">
                {_.isEmpty(data) ? (
                    <ElementSkeleton type="backdrop" className="bg-dark-900" />
                ) : (
                    <img
                        src={`${SMALL_IMAGE_BASE_URL}${data.backdrop_path || data.poster_path}`}
                        alt={data.title || data.name || data.original_title || data.original_name}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}
                <div className="absolute top-2 left-2">
                    <SquareLogo className={"h-full max-h-6 w-auto"} />
                </div>

                <IconOnlyButton border color={"dark"} className="absolute-center opacity-0 group-hover:opacity-100">
                    <IoPlay />
                </IconOnlyButton>

                <div className="absolute left-0 right-0 bottom-0 px-2 translate-y-[1px] bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent">
                    <p
                        title={data.title || data.name || data.original_title || data.original_name}
                        className=" line-clamp-1 text-lg font-bold text-light-900 text-shadow-dark"
                    >
                        {data.title || data.name || data.original_title || data.original_name}
                    </p>
                </div>
            </div>
            <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <PreviewInfo data={data} className={"w-1/2"} />
                    <IconOnlyButton size={1} border color={"dark"}>
                        <FiPlus />
                    </IconOnlyButton>
                </div>
                {data.overview && (
                    <p className="line-clamp-5 font-semibold text-light-100 text-sm mb-4">
                        {data.overview || "not have overview"}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Recommendations;
