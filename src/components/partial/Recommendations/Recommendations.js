import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import IconOnlyButton from "~/components/shared/buttons/IconOnlyButton";
import RecommendationItem from "../RecommendationItem";

function Recommendations({ data }) {
    const [isAccordion, setAccordion] = useState(false);

    useEffect(() => {
        if (data.length > 6) {
            setAccordion(true);
        }
    }, [data]);

    const handleToggleAccordion = () => {
        setAccordion(!isAccordion);
    };

    return (
        <div>
            <h3 className="pb-4 font-bold text-2xl text-light-900">More like this</h3>

            <ul className="grid grid-cols-autofit-240 auto-rows-[1fr] gap-5 w-full transition-all duration-300">
                {isAccordion
                    ? data.slice(0, 6).map((item, index) => (
                          <li key={index}>
                              <RecommendationItem data={item} />
                          </li>
                      ))
                    : data.map((item, index) => (
                          <li key={index}>
                              <RecommendationItem data={item} />
                          </li>
                      ))}
            </ul>
            {data.length > 6 && (
                <div className="accordion">
                    <IconOnlyButton
                        theme={"dark"}
                        size={1}
                        border
                        className={`absolute-center transition-transform duration-300 ${!isAccordion && "rotate-180"}`}
                        onClick={handleToggleAccordion}
                    >
                        <BsChevronDown />
                    </IconOnlyButton>
                </div>
            )}
        </div>
    );
}

export default Recommendations;
