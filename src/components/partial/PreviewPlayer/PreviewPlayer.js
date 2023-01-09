import { useState } from "react";
import ReactPlayer from "react-player/youtube";

function PreviewPlayer({ url, ...props }) {
    const [player, setPlayer] = useState({
        width: "100%",
        height: "100%",
        muted: true,
        playing: false,
        loop: false,
        played: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
        controls: false,
        light: false,
        volume: 1,
    });
    return (
        <div>
            <ReactPlayer url={url} {...player} {...props} className={`banner-player`} />
        </div>
    );
}

export default PreviewPlayer;
