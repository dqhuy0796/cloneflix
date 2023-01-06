import { useEffect, useState } from "react";
import EpisodeItem from "../../partial/EpisodeItem";

function EpisodesList({ data }) {
    return (
        <div>
            <div className="flex justify-between">
                <p className="text-xl">Episodes</p>
            </div>
            <ul className="w-full">
                {data.map((item, index) => (
                    <li key={index} className="w-full rounded overflow-hidden border-b border-b-light-100">
                        <EpisodeItem data={item} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EpisodesList;
