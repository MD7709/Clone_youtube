import React from 'react';
import './Commnet.css';

const DispalyCommnet = ({ UserBody, UserCommnet }) => {
  return (
    <div className='display_comment_section'>
      <div className='logo'>
        <span></span>
      </div>
      <div className='comment_content'>
        <div className='comment_body'>{UserBody}</div>
        <div className='comment_user'>{UserCommnet}</div>
      </div>
      
    </div>
  );
}

export default DispalyCommnet;
