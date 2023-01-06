import EpisodeItem from "../../partial/EpisodeItem";

function SeasonDetails({ data }) {
    return (
        <div>
            <div className="flex items-baseline justify-between py-4 font-bold text-light-900">
                <h3 className="text-xl">Episodes</h3>
                <h3 className="text-lg max-w-[70%] line-clamp-1">{`Ss${data.season_number}: "${data.name}"`}</h3>
            </div>

            <ul className="flex flex-col w-full">
                {data.episodes.map((item, index) => (
                    <li key={index} className="season-item">
                        <EpisodeItem data={item} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SeasonDetails;
