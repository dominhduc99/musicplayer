import './MusicPlayer.css';
import HeartIcon from '../icons/HeartIcon';
import SkipBackIcon from '../icons/SkipBackIcon';
import SkipNextIcon from '../icons/SkipNextIcon';
import RepeatIcon from '../icons/RepeatIcon';
import MusicControl from '../MusicControl/MusicControl';
import { useEffect, useRef, useState } from 'react';
import { LIST_SONG } from '../../const';

const MusicPlayer = () => {
  const [isPlay, setIsPlay] = useState(false);
  const [duration, setDuration] = useState('');
  const audioRef = useRef();
  const progressRef = useRef();
  const [currentTime, setCurrentTime] = useState('00:00');
  const [barWidth, setBarWidth] = useState('0%');
  const [isFavourite, setIsFavourite] = useState(false);
  const [replay, setReplay] = useState(false);
  const [songIndex, setSongIndex] = useState(0);
  const songs = LIST_SONG;

  const handlePlay = () => {
    audioRef.current.play();
  };

  const handlePause = () => {
    audioRef.current.pause();
  };

  const togglePlay = () => {
    setIsPlay(!isPlay);
    if (isPlay) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const resetPlayer = () => {
    setIsPlay(false);
    setBarWidth('0%');
    setCurrentTime('00:00');
  };

  const onDurationChangeHandler = (e) => {
    const musicAudio = audioRef.current;
    const seconds = Math.floor(e.target.duration);
    let durmin = Math.floor(seconds / 60);
    let dursec = Math.floor(seconds - durmin * 60);
    if (durmin < 10) {
      durmin = '0' + durmin;
    }
    if (dursec < 10) {
      dursec = '0' + dursec;
    }
    const dur = durmin + ':' + dursec;
    setDuration(dur);
    musicAudio.ontimeupdate = () => {
      let curmin = Math.floor(musicAudio.currentTime / 60);
      let cursec = Math.floor(musicAudio.currentTime - curmin * 60);
      if (curmin < 10) {
        curmin = '0' + curmin;
      }
      if (cursec < 10) {
        cursec = '0' + cursec;
      }
      setCurrentTime(curmin + ':' + cursec);
      let width = (100 / musicAudio.duration) * musicAudio.currentTime;
      setBarWidth(width + '%');
    };
    musicAudio.onended = () => {
      if (replay) {
        setIsPlay(false);
        setTimeout(() => {
          resetPlayer();
          handlePlay();
          setIsPlay(true);
        }, 200);
      } else {
        resetPlayer();
        handleNext();
      }
    };
  };

  const handleFavourite = () => {
    setIsFavourite(!isFavourite);
  };

  const handleReplay = () => {
    const isreplay = !replay;
    const musicAudio = audioRef.current;
    musicAudio.onended = null;
    musicAudio.onended = () => {
      if (isreplay) {
        setIsPlay(false);
        setTimeout(() => {
          resetPlayer();
          handlePlay();
          setIsPlay(true);
        }, 200);
      } else {
        resetPlayer();
        handleNext();
      }
    };
    setReplay(!replay);
  };

  const handleNext = () => {
    const index = songIndex + 1;
    index === songs.length ? setSongIndex(0) : setSongIndex(index);
    resetPlayer();
    setIsPlay(true);
    setTimeout(() => {
      handlePlay();
    }, 200);
  };

  const handlePrev = () => {
    const index = songIndex - 1;
    index < 0 ? setSongIndex(songs.length - 1) : setSongIndex(index);
    resetPlayer();
    setIsPlay(true);
    setTimeout(() => {
      handlePlay();
    }, 200);
  };

  const handleClickProgress = (e) => {
    const x = e.pageX;
    const musicAudio = audioRef.current;
    let maxduration = musicAudio.duration;
    let position = x - progressRef.current.offsetLeft;
    let percentage = (100 * position) / progressRef.current.offsetWidth;
    if (percentage > 100) {
      percentage = 100;
    }
    if (percentage < 0) {
      percentage = 0;
    }
    setBarWidth(percentage + '%');

    const currentTimeClick = (maxduration * percentage) / 100;
    let curmin = Math.floor(currentTimeClick / 60);
    let cursec = Math.floor(currentTimeClick - curmin * 60);
    if (curmin < 10) {
      curmin = '0' + curmin;
    }
    if (cursec < 10) {
      cursec = '0' + cursec;
    }
    setCurrentTime(curmin + ':' + cursec);
    audioRef.current.currentTime = currentTimeClick;
  };

  useEffect(() => {
    //
  }, []);

  useEffect(() => {
    //
  }, [replay]);

  return (
    <div className='music-card'>
      <div className='music-image'>
        <img src={songs[songIndex].thumb} alt='' />
      </div>
      <div className='music-content'>
        <div className='music-controls'>
          <div className='music-actions'>
            <div className='music-actions__item'>
              <HeartIcon
                className={isFavourite ? 'heart-icon favourite' : 'heart-icon'}
                onClick={handleFavourite}
              />
            </div>
            <div className='music-actions__item'>
              <RepeatIcon
                className={replay ? 'repeat-icon active' : 'repeat-icon'}
                onClick={handleReplay}
              />
            </div>
            <div className='music-actions__item'>
              <SkipBackIcon onClick={handlePrev} />
            </div>
            <div className='music-actions__item'>
              <SkipNextIcon onClick={handleNext} />
            </div>
          </div>
          <div className='music-pause'>
            <MusicControl isPlaying={isPlay} togglePlay={togglePlay} />
          </div>
        </div>
        <div className='music-info'>
          <p className='music-singer'>{songs[songIndex].singer}</p>
          <p className='music-song'>{songs[songIndex].name}</p>
        </div>
        <div className='music-progress' ref={progressRef}>
          <span className='progress-duration'>{duration ? duration : ''}</span>
          <div className='progress-bar' onClick={handleClickProgress}>
            <div className='progress-current' style={{ width: barWidth }}></div>
            <div className='progress-time'>{currentTime}</div>
          </div>
        </div>
      </div>
      <audio
        style={{ display: 'none' }}
        ref={audioRef}
        src={songs[songIndex].src}
        alt='oops, something went wrong...'
        onDurationChange={onDurationChangeHandler}
      ></audio>
    </div>
  );
};

export default MusicPlayer;
