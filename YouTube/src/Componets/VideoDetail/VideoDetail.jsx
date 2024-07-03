import React, { useState } from 'react';
import './VideoDetail.css';

const VideoDetail = ({ vids }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const truncateText = (text, maxLength) => {
    if (!text) return ''; // Handle case where text is undefined or null
    if (typeof text !== 'string') return ''; // Handle unexpected types, if any

    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div className={`video_detail_Container ${expanded ? 'expanded' : ''}`}>
      <div className='View_hour'>
        <span>100000 Views </span>
        <span className=''> 23 Hours ago</span>
        <span className='text-muted'> MovieVeser Podcast</span>
      </div>
     
      <article className={expanded ? 'expanded' : truncateText(vids, 100)}>
        Podcast with Bollywood Director - https://youtu.be/cX4Lf7lb8ow?si=oDOHU...
        <br />
        Official instagram - https://www.instagram.com/menofcultur...
        <br />
        Our Official discord - https://discord.gg/GAnTMVurm4
      </article>
      <button className="showMoreButton" onClick={toggleExpand}>
        {expanded ? 'Show Less' : 'Show More'}
      </button>
    </div>
  );
};

export default VideoDetail;
