  import React from 'react'
  import LeftSlifBar from '../../Componets/LeftSlidBar/LeftSlifBar'
  import Sultan from '../../Componets/video/Sultan.mp4';
  import { Link } from 'react-router-dom';
  import './Subscription.css'
  const Subscription = () => {
    const Subscription = [
      {
        _id: 1,
        video_src: Sultan,
        channel: "63646547636f73736",
        title: "Sulthan Video Song (Hindi) | KGF Chapter 2 | Rocking Star Yash | Prashanth Neel | Ravi Basrur | Hombale",
        uploader: "abc",
        Date: '1-1-2001',
        Name: "Hombly Movies"
      },
      {
        _id: 1,
        video_src: Sultan,
        channel: "63646547636f73736",
        title: "Sulthan Video Song (Hindi) | KGF Chapter 2 | Rocking Star Yash | Prashanth Neel | Ravi Basrur | Hombale",
        uploader: "abc",
        Date: '1-1-2001',
        Name: "Hombly Movies"
      },
      {
        _id: 1,
        video_src: Sultan,
        channel: "63646547636f73736",
        title: "Sulthan Video Song (Hindi) | KGF Chapter 2 | Rocking Star Yash | Prashanth Neel | Ravi Basrur | Hombale",
        uploader: "abc",
        Date: '1-1-2001',
        Name: "Hombly Movies"
      },
      {
        _id: 1,
        video_src: Sultan,
        channel: "63646547636f73736",
        title: "Sulthan Video Song (Hindi) | KGF Chapter 2 | Rocking Star Yash | Prashanth Neel | Ravi Basrur | Hombale",
        uploader: "abc",
        Date: '1-1-2001',
        Name: "Hombly Movies"
      },
      {
        _id: 1,
        video_src: Sultan,
        channel: "63646547636f73736",
        title: "Sulthan Video Song (Hindi) | KGF Chapter 2 | Rocking Star Yash | Prashanth Neel | Ravi Basrur | Hombale",
        uploader: "abc",
        Date: '1-1-2001',
        Name: "Hombly Movies"
      },
      {
        _id: 1,
        video_src: Sultan,
        channel: "63646547636f73736",
        title: "Sulthan Video Song (Hindi) | KGF Chapter 2 | Rocking Star Yash | Prashanth Neel | Ravi Basrur | Hombale",
        uploader: "abc",
        Date: '1-1-2001',
        Name: "Hombly Movies"
      },
    ];
    const truncateTitle = (title, maxLength) => {
      if (title.length > maxLength) {
        return title.substring(0, maxLength) + '...';
      }
      return title;
    };
    return (
    <>
    
    <div className="conatienr_home_page">
      <LeftSlifBar />
      <div className="conatienr_home_page_2">
        <div className="library_Subscription_container ">
          <div className="Subname">
            <div className="Sub_title">
              <div className="Sub_icon">
                <p>Latest</p>
              </div>
            </div>
            <div className="Sub_btn">
              <button className="Sub_btn_button">Manage</button>
            </div>
          </div>
          <div className="Sub_content">
            {Subscription.map(item => (
              <div key={item._id} className="Sub_video_container">
                <Link  to={`/VideoPage/${item?._id}`}>
                <video src={item.video_src} controls className="Sub_video"></video></Link>
                <div className="video_detail_Sub">
                  <h4>   {truncateTitle(item?.title || 'Title', 80)}</h4>
                  <p>{item.Name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
    )
  }

  export default Subscription

