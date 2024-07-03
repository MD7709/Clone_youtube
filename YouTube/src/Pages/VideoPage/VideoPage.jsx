import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import "./VideoPage.css";
import { useLocation } from "react-router-dom";
import Sultan from "../../Componets/video/Sultan.mp4";
import LikeWatch from "./LikeWatch";
import Comments from "../../Componets/Commnets/Commnets";
import ShortBy from "/IMG/ShortBy.svg";
import VideoDetail from "../../Componets/VideoDetail/VideoDetail";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../actions/auth";
import { Link } from "react-router-dom";

const VideoPage = () => {
  const API_KEY = "AIzaSyDAJJgsXni6thQgIiTgWkQpCG6tu9MBKy4";
  const API_URL = `https://www.googleapis.com/youtube/v3/search`;
  const location = useLocation();
  const videoDetails = location.state?.vid;
  const iframeRef = useRef(null);
  const [tapCount, setTapCount] = useState(0);
  const [tapTimeout, setTapTimeout] = useState(null);
  const [popup, setPopup] = useState({ show: false, message: "" });
  const CurrentUser = useSelector((state) => state.currentUserReducer);
  const dispatch = useDispatch();
  const [movieBarData, setMovieBarData] = useState([]);
  const fetchMovieBarData = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          part: "snippet",
          maxResults: 10,
          q: "trending",
          key: API_KEY,
        },
      });
      console.log("Fetched videos data:", response.data.items);
      setMovieBarData(response.data.items);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchMovieBarData();
  }, []);

  useEffect(() => {
    if (!CurrentUser || !CurrentUser.result) {
      const storedUser = JSON.parse(localStorage.getItem("currentUser"));
      if (storedUser) {
        dispatch(login(storedUser));
      }
    }
  }, [CurrentUser, dispatch]);

  const handleGesture = (e) => {
    e.preventDefault();
    const video = iframeRef.current;
    const rect = video.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const videoWidth = rect.width;
    const videoHeight = rect.height;

    clearTimeout(tapTimeout);
    setTapCount((prev) => prev + 1);

    setTapTimeout(
      setTimeout(() => {
        if (tapCount === 1) {
          if (clickY < 50 && clickX > videoWidth - 50) {
            showLocationAndTemperature();
          } else if (
            clickX > videoWidth / 2 - 50 &&
            clickX < videoWidth / 2 + 50
          ) {
            video.paused ? video.play() : video.pause();
          }
        } else if (tapCount === 2) {
          if (clickX < videoWidth / 2) {
            video.currentTime -= 10;
          } else {
            video.currentTime += 10;
          }
        } else if (tapCount === 3) {
          if (clickX < videoWidth / 2) {
            showComments();
          } else if (clickX > videoWidth / 2 + 50) {
            window.close();
          } else {
            playNextVideo();
          }
        }
        setTapCount(0);
      }, 300)
    );
  };

  const handleLongPress = (side) => {
    const video = iframeRef.current;
    if (side === "left") {
      video.playbackRate = 0.5;
    } else if (side === "right") {
      video.playbackRate = 2.0;
    }
  };

  const handleLongPressEnd = () => {
    const video = iframeRef.current;
    video.playbackRate = 1.0;
  };

  const showLocationAndTemperature = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const temperature = "25°C"; // Dummy temperature
      setPopup({
        show: true,
        message: `Location: (${latitude.toFixed(2)}, ${longitude.toFixed(
          2
        )}), Temp: ${temperature}`,
      });
      setTimeout(() => setPopup({ show: false, message: "" }), 5000);
    });
  };

  const showComments = () => {
    alert("Showing comments section...");
  };

  const playNextVideo = () => {
    alert("Playing next video...");
  };

  useEffect(() => {
    const video = iframeRef.current;

    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      const rect = video.getBoundingClientRect();
      const touchX = touch.clientX - rect.left;
      const videoWidth = rect.width;

      if (touchX < videoWidth / 2) {
        handleLongPress("left");
      } else {
        handleLongPress("right");
      }
    };

    const handleTouchEnd = () => {
      handleLongPressEnd();
    };

    video.addEventListener("touchstart", handleTouchStart);
    video.addEventListener("touchend", handleTouchEnd);

    return () => {
      video.removeEventListener("touchstart", handleTouchStart);
      video.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const truncateTitle = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + "...";
    }
    return title;
  };
  return (
    <>
      <div className="container_VideoPage" onClick={handleGesture}>
        <div className="container_VideoPage_2">
          <div className="videoPage_screen">
            <iframe
              src={`https://www.youtube.com/embed/${videoDetails?.id?.videoId}?autoplay=1&mute=1`}
              title={videoDetails?.snippet?.title}
              frameborder="0"
              ref={iframeRef}
              className="Video_Show_VideoPage"
              controls
            ></iframe>

            {popup.show && <div className="popup">{popup.message}</div>}
            <div className="video_detail_VideoPage">
              <div className="video_btns_title_videoPage">
                <p className="VideoPage_title">
                  {truncateTitle(videoDetails.snippet.title, 76) ||
                    "Default Title"}
                </p>
                <div className="VideoPage_view_btns">
                  <div className="channel_videoPage_Detail">
                    <b className="channel_logo_videoPage">
                      <p>
                        {" "}
                        {videoDetails.snippet.channelTitle
                          .charAt(0)
                          .toUpperCase()}
                      </p>
                    </b>
                    <p className="channel_Name_videopage">
                      {truncateTitle(
                        videoDetails.snippet.channelTitle || "Channel",
                        5
                      )}
                    </p>
                    <div className="Subscribe_div">
                      <button className="sub_btn">Subscribe</button>
                    </div>
                  </div>
                  <LikeWatch />
                </div>
              </div>
              <VideoDetail />
              <div className="Channel_videoPage_commnets">
                <ul>Commnet</ul>
                <div className="comment_showvideo_icon">
                  <img src={ShortBy} alt="ShortBy" className="Commnet_img" />
                  <p>Short By</p>
                </div>
              </div>
              <Comments />
            </div>
          </div>
          <div className="MoreVideoBar">
            <div className="Moviebar_con_1">
              {movieBarData.map((item) => (
                <div key={item.id.videoId} className="MovieBar_contaienr">
                  <Link to={`/VideoPage/${item?._id}`}>
                    <video
                      src={item.snippet.thumbnails.medium.url}
                      className="Movie_Sub_video"
                      poster={item.snippet.thumbnails.medium.url}
                    />
                  </Link>
                  <div className="Movie_video_detail_Sub">
                    <h4> {truncateTitle(item.snippet.title, 76)}</h4>
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

export default VideoPage;
