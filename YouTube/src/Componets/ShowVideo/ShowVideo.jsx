import React from 'react';
import './ShowVideo.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updatePoints } from '../../actions/auth';

const ShowVideo = ({ vid }) => {
  const dispatch = useDispatch();
  const CurrentUser = useSelector(state => state.currentUserReducer);

  const handleVideoWatch = () => {
    if (CurrentUser && CurrentUser.result) {
      dispatch(updatePoints(CurrentUser.result._id, 5));
    }
  };

  const truncateTitle = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + '...';
    }
    return title;
  };


  return (
    <>
      <Link to={{pathname: `/VideoPage/${vid?.id.videoId}`}} state={{vid}}  onClick={handleVideoWatch}>
        <video src={vid.snippet.channelthumbnail} className='Video_showVideo' poster={vid.snippet.thumbnails.medium
.url} >
          Your browser does not support the video tag.
        </video>  
      </Link>
      <div className='video_Dsc'>
        <div className='Cuurent_user_logo_Video'>
          <div className='Logo_app_video'>
          {vid.snippet.channelTitle.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className='Video_Detail'>
          <p className='Title_video_des'>
          {truncateTitle(vid.snippet.title, 50)}
          </p>
            <p className='Video_view_uploa_time'>{vid.snippet.channelTitle}</p>
          <p className='Video_view_uploa_time'>{vid.statistics ? vid.statistics.viewCount : '10k'}
            <span className="dot"></span>
            {new Date(vid.snippet.publishTime).toLocaleDateString()}</p>

        </div>
      </div>
    </>
  );
};

export default ShowVideo;
