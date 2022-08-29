import PlayIcon from "../icons/PlayIcon";
import PauseIcon from "../icons/PauseIcon";
import style from './MusicControl.module.css';

const MusicControl = (props) => {
    const { isPlaying = false, togglePlay } = props;
    return (
        <div className={style['music-control']} onClick={togglePlay}>
            {isPlaying && <PauseIcon />}
            {!isPlaying && <PlayIcon />}
        </div>
    )
}

export default MusicControl;