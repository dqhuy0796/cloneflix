import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import EpisodeItem from "~/components/partial/EpisodeItem";
import IconOnlyButton from "~/components/shared/buttons/IconOnlyButton";

function SeasonDetails({ data }) {
    const [isAccordion, setAccordion] = useState(false);

    useEffect(() => {
        if (data.episodes.length > 6) {
            setAccordion(true);
            console.log(data);
        }
    }, [data]);

    const handleToggleAccordion = () => {
        setAccordion(!isAccordion);
    };
    return (
        <div>
            <div className="flex items-baseline justify-between py-4 font-bold text-light-900">
                <h3 className="text-xl">Episodes</h3>
                <h3 className="text-lg max-w-[70%] line-clamp-1">{`Ss${data.season_number}: "${data.name}"`}</h3>
            </div>

            <ul>
                {data.episodes.slice(0, 6).map((item, index) => (
                    <li key={index} className="season-item">
                        <EpisodeItem data={item} />
                    </li>
                ))}
                {isAccordion &&
                    data.episodes.slice(6, data.episodes.length - 1).map((item, index) => (
                        <li key={index} className="season-item">
                            <EpisodeItem data={item} />
                        </li>
                    ))}
            </ul>

            {data.episodes.length > 6 && (
                <div className="accordion">
                    <IconOnlyButton
                        theme={"dark"}
                        size={1}
                        border
                        className={`absolute-center transition-transform duration-300 ${isAccordion && "rotate-180"}`}
                        onClick={handleToggleAccordion}
                    >
                        <BsChevronDown />
                    </IconOnlyButton>
                </div>
            )}
        </div>
    );
}

export default SeasonDetails;
