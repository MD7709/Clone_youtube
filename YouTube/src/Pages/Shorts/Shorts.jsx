import React, { useRef, useState } from 'react';
import LeftSlifBar from '../../Componets/LeftSlidBar/LeftSlifBar';
import ShortVideo from '../../Componets/video/Short_Video.mp4';
import './Short.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { AiFillDislike, AiFillLike, AiFillMessage } from 'react-icons/ai';
import { RiShareForwardFill } from 'react-icons/ri';
import { BsThreeDotsVertical } from 'react-icons/bs';

const Shorts = () => {
  const Shorts = [
    {
      _id: 1,
      channel: "63646547636f73736",
      title: "Dikro Maro Ladakvayo | દિકરો મારો લાડકવાયો | #shorts | Kushal Mistry",
      uploader: "abc",
      Name: "Hombly Movies"
    },
    {
      _id: 2,
      channel: "63646547636f73736",
      title: "Dikro Maro Ladakvayo | દિકરો મારો લાડકવાયો | #shorts | Kushal Mistry",
      uploader: "abc",
      Name: "Hombly Movies"
    },
    {
      _id: 3,
      channel: "63646547636f73736",
      title: "Dikro Maro Ladakvayo | દિકრო મારો લાડકવાયો | #shorts | Kushal Mistry",
      uploader: "abc",
      Name: "Hombly Movies"
    },
  ];

  const videoRefs = useRef([]);
  const [isPlaying, setIsPlaying] = useState(Array(Shorts.length).fill(false));
  const [isMuted, setIsMuted] = useState(Array(Shorts.length).fill(false));

  const handlePlayPause = (index) => {
    const video = videoRefs.current[index];
    if (video.paused) {
      video.play();
      setIsPlaying((prevState) => {
        const newState = [...prevState];
        newState[index] = true;
        return newState;
      });
    } else {
      video.pause();
      setIsPlaying((prevState) => {
        const newState = [...prevState];
        newState[index] = false;
        return newState;
      });
    }
  };

  const handleMuteUnmute = (index) => {
    const video = videoRefs.current[index];
    video.muted = !video.muted;
    setIsMuted((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const handleVideoClick = (index) => {
    const video = videoRefs.current[index];
    if (video.paused) {
      video.play();
      setIsPlaying((prevState) => {
        const newState = [...prevState];
        newState[index] = true;
        return newState;
      });
    } else {
      video.pause();
      setIsPlaying((prevState) => {
        const newState = [...prevState];
        newState[index] = false;
        return newState;
      });
    }
  };

  return (
    <>
      <div className="conatienr_home_page">
        <LeftSlifBar />
        <div className="conatienr_home_page_2">
          <div className='Short_Video_section'>
            <div className='Short_video_main'>
              {Shorts.map((short, index) => (
                <div key={short._id} className='Short_video_wrapper'>
                  <div className='Short_video_content'>
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      src={ShortVideo}
                      className='Short_video'
                      onClick={() => handleVideoClick(index)}
                    ></video>
                    <div className='Short_channel_logo'>
                      <b className='Uploader_logo'>A</b>
                      <a className='Uploder_Name'>{short.Name}</a>
                      <button className='Subscribe_button'>Subscribe</button>
                    </div>
                    <div className='Short_video_title'>{short.title}</div>
                    <div className='video_controls'>
                      <button className='control_button' onClick={() => handlePlayPause(index)}>
                        <FontAwesomeIcon icon={isPlaying[index] ? faPause : faPlay} />
                      </button>
                      <button className='control_button' onClick={() => handleMuteUnmute(index)}>
                      <FontAwesomeIcon icon={isMuted[index] ? faVolumeMute : faVolumeUp} />
                      </button>
                    </div>
                  </div>
                  <div className='Second_Button_secion_Short'>
                    <div className='Button_section'>
                      <div className='Button_Inner_section'>
                        <button><AiFillLike/></button>
                        <p>10K</p>
                      </div>
                      <div className='Button_Inner_section'>
                        <button><AiFillDislike/></button>
                        <p>Dislike</p>
                      </div>
                      <div className='Button_Inner_section'>
                        <button><AiFillMessage/></button>
                        <p>10</p>
                      </div>
                      <div className='Button_Inner_section'>
                        <button><RiShareForwardFill/></button>
                        <p>Share</p>
                      </div>
                      <div className='Button_Inner_section'>
                        <button><BsThreeDotsVertical/></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shorts;

