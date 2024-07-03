import React, { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import './LikeWatch.css';
import { MdPlaylistAddCheck } from 'react-icons/md';
import { RiHeartAddFill, RiPlayListAddFill, RiShareForwardFill } from 'react-icons/ri';
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';

const LikeWatch = () => {
  const [saveVideo, setSaveVideo] = useState(true);
  const [dislike, setDislike] = useState(false);
  const [like, setLike] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const toggleSaveVideo = () => {
    setSaveVideo(!saveVideo);
  };

  const toggleLike = () => {
    if (!like) {
      setLike(true);
      setDislike(false);
    } else {
      setLike(false);
    }
  };

  const toggleDislike = () => {
    if (!dislike) {
      setDislike(true);
      setLike(false);
    } else {
      setDislike(false);
    }
  };

  const toggleMoreOptions = () => {
    setShowMoreOptions(!showMoreOptions);
  };

  return (
    <div className="btn_Like_cont">
      <div className="btn_Like_group">
       <div className='like_dislike'>
       <div className="like_video" onClick={toggleLike} aria-label="Like Video">
          {like ? <AiFillLike size={22} className="btns_video_playlist" /> : <AiOutlineLike size={22} className="btns_video_playlist" /> }
          
        </div>|
        <div className="like_video" onClick={toggleDislike} aria-label="Dislike Video">
          {dislike ? <AiFillDislike size={22} className="btns_video_playlist" /> : <AiOutlineDislike size={22} className="btns_video_playlist" />}
        </div> 
       </div>
        <div className="Share_video" aria-label="Share Video">
          <RiShareForwardFill size={22} className="btns_video_playlist" />
          <b>Share</b>
        </div>
      </div>
      <div className="btn_VideoPage" onClick={toggleMoreOptions}>
        <BsThreeDots size={22} className='bsthree' />
      </div>
      {showMoreOptions && (
        <div className="more_options">
          <div className="like_video">
            <RiHeartAddFill size={22} className="btns_video_playlist" />
            <b>Thanks</b>
          </div>
          <div className="like_video">
            <RiPlayListAddFill size={22} className="btns_video_playlist" />
            <b>Save</b>
          </div>
        </div>
      )}
    </div>
  );
};

export default LikeWatch;
