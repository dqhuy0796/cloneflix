import { BiLike } from "react-icons/bi";
import { BsChevronDown } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { IoPlaySharp } from "react-icons/io5";

import { SMALL_IMAGE_BASE_URL } from "~/constants";
import { useMiniModalContext } from "~/miniModalContext";
import RoundIconButton from "~/components/shared/RoundIconButton";

function MiniModal({ movie }) {
    return (
        <div
            // ref={modalRef}
            // onMouseLeave={handleMouseLeave}
            // onMouseOver={handleMouseOver}
            // style={modalPosition}
            className="fixed z-[999999] w-96 top-0 left-0 bg-red-700"
        >
            <div className="relative w-full pt-[150%] lg:pt-[56.25%] rounded-md overflow-hidden">
                <img
                    src={`${SMALL_IMAGE_BASE_URL}${movie.backdrop_path || movie.poster_path}`}
                    alt={movie.title || movie.name || movie.original_title || movie.original_name}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                />
            </div>

            <ul className="text-light-900 bg-dark-500">
                <li className="flex items-center gap-2 p-4">
                    <RoundIconButton textBlack>
                        <IoPlaySharp className="relative left-0.5" />
                    </RoundIconButton>
                    <RoundIconButton>
                        <FiPlus />
                    </RoundIconButton>
                    <RoundIconButton>
                        <BiLike />
                    </RoundIconButton>
                    <RoundIconButton className={"ml-auto"}>
                        <BsChevronDown className="relative top-0.5" />
                    </RoundIconButton>
                </li>
                <li className="flex items-center gap-2 p-2">
                    <p className="text-xs font-medium text-green-500">{`${Math.ceil(movie.vote_average * 10)}% Match`}</p>
                    <p className="px-1 text-[10px] font-light border border-solid border-light-100 rounded-none">{movie.adult ? "18+" : "16+"}</p>
                </li>
                <li className="flex items-center p-2 gap-x-5">
                    {movie.genre_ids.map((item) => (
                        <p key={item} className="genre-item">
                            {item}
                        </p>
                    ))}
                </li>
            </ul>
        </div>
    );
}

export default MiniModal;
