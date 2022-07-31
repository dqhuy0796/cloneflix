import PropTypes from "prop-types";
import ReactPlayer from "react-player/youtube";

function AutoPlayer({ props, className }) {
    const { url, muted, playing, onReady, onPlay, onEnded, onError } = props;

    return (
        <ReactPlayer
            url={url}
            muted={muted}
            loop={false}
            width="100%"
            height="100%"
            playing={playing}
            controls={false}
            light={false}
            volume={1}
            played={0}
            loaded={0}
            duration={0}
            playbackRate={1.0}
            onReady={onReady}
            onPlay={onPlay}
            onEnded={onEnded}
            onError={onError}
            className={`z-0 absolute inset-0 bg-dark-900 ${className}`}
        />
    );
}

AutoPlayer.propTypes = {
    props: PropTypes.object.isRequired,
};

export default AutoPlayer;
