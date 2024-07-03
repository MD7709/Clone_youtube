import React, { useEffect } from "react";
import LeftSlifBar from "../../Componets/LeftSlidBar/LeftSlifBar";
import "./Library.css";
import { FcGoogle } from "react-icons/fc";
import { FaHistory, FaPlayCircle, FaUser } from "react-icons/fa";
import { GoogleLogin } from 'react-google-login';
import SultanVideo from '../../Componets/video/Sultan.mp4';
import { login } from '../../actions/auth';
import { useDispatch, useSelector } from "react-redux";
import { gapi } from 'gapi-script';

export const Library = () => {
  
  
  const CurrentUser = useSelector(state => state.currentUserReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: "777304984252-52gg0c3deutvo106o348aa5qn2sqv6ma.apps.googleusercontent.com",
        scope: "email"
      });
    }
    gapi.load("client:auth2", start);

    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      dispatch(login(storedUser));
    }
  }, [dispatch]);

  const handleLoginSuccess = (response) => {
    const Email = response?.profileObj?.email;
    const user = { email: Email };
    dispatch(login(user));
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleLoginFailure = (error) => {
    console.log('Login Failed:', error);
  };
  const History = [
    {
      _id: 1,
      video_src: SultanVideo,
      channel: "63646547636f73736",
      title: "Sulthan Video Song (Hindi) | KGF Chapter 2 | Rocking Star Yash | Prashanth Neel | Ravi Basrur | Hombale",
      uploader: "abc",
      Date: '1-1-2001',
      Name: "Hombly Movies"
    }
  ];

  return (
    <div className="conatienr_home_page">
      <LeftSlifBar />
      <div className="conatienr_home_page_2">
        <div className="container">
          <div className="Channel_detail">
            <div className="Library_account">
              <div className="Current_logo">
                <span> 
                  {CurrentUser?.result?.name
                    ? CurrentUser.result.name.charAt(0).toUpperCase()
                    : CurrentUser?.result?.email.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <div className="channel_Name">
              <div className="Channel_title">
                <h6>{CurrentUser?.result?.channelName || 'Channel Name'}</h6>
              </div>
              <div className="Channel_Id">
                <span>@{CurrentUser?.result?.channelId || 'UserID'}</span>
                <div className="Channel_id_dot"></div>
                <b className="Channel_id_b">View Channel</b>
              </div>
              <div className="channel_btn">
                <button className="Channel_btn_button">
                  <span>
                    <FaUser size={15} />
                  </span>
                  Switch account
                </button>
                 <GoogleLogin
                clientId={"777304984252-52gg0c3deutvo106o348aa5qn2sqv6ma.apps.googleusercontent.com"}
                onSuccess={handleLoginSuccess}
                onError={handleLoginFailure}
                render={(renderProps) => (
                  <button onClick={renderProps.onClick} className="Channel_btn_button">
                  <span>
                    <FcGoogle size={15} />
                  </span>
                  Google Account
                </button>
                )}
              />
              <button className="Channel_btn_button">
                Points: {CurrentUser?.result?.points || 0}
              </button>
              </div>
            </div>
            
          </div> 
                
          {CurrentUser &&<>
          <div className="Library_history_contaienr">
            <div className="historyname">
              <div className="history_title">
                <div className="History_Icon">
                  <FaHistory size={22} className="text-white"/>
                  <p>History</p>
                </div>
              </div>
              <div className="histoty_btn">
                <button className="histoty_btn_button">View all</button>
              </div>
            </div>
            <div className="Histroy_content">
              {History.map(item => (
                <div key={item._id} className="history_video_1">
                  <video src={item.video_src} controls className="history_video"></video>
                  <div className="Video_detail_libray">
                    <h4>{item.title}</h4>
                    <p>{item.Name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div> 

          {/* Playlist Section */}
          <div className="Library_history_contaienr">
            <div className="historyname">
              <div className="history_title">
                <div className="History_Icon">
                  <FaPlayCircle size={22} className="text-white"/>
                  <p>PlayList</p>
                  <div className="History_Icon">
                    <div className="div_button">Recently added</div>
                  </div>
                </div>
              </div>
              <div className="histoty_btn">
                <button className="histoty_btn_button">View all</button>
              </div>
            </div>
            <div className="Histroy_content">
              {History.map(item => (
                <div key={item._id} className="history_video_1">
                  <video src={item.video_src} controls className="history_video"></video>
                  <div className="Video_detail_libray">
                    <h4>{item.title}</h4>
                    <p>{item.Name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div> 

          {/* ClipSection */}
          <div className="Library_history_contaienr">
            <div className="historyname">
              <div className="history_title">
                <div className="History_Icon">
                  <p className="Histroy_icon_p">Your Clip</p>
                </div>
                <div className="ClipSection">
                  <p>Clip and share your favorite moments. Your list shows up right here.</p>
                </div>
              </div>
            </div>
          </div> 
       
          </>} </div>
      </div>
    </div>
  );
};

export default Library;
