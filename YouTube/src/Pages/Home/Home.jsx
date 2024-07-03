import React, { useEffect, useState } from 'react'
import './Home.css' 
import LeftSlifBar from '../../Componets/LeftSlidBar/LeftSlifBar'
import ShowVideoGrid from '../../Componets/ShowVideoGrid/ShowVideoGrid'
import { fetchVideos } from '../../services/apiService';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const data = await fetchVideos();
        setVideos(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    getVideos();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  const NavList =[
    "All",
    "Phyton",
    "Java",
    "ReactJs",
    "Movies",
    "Songs",
    "Gameing",   
    "Prabhas",   
    "Allu Arjun",   
    "NTR",   
    "Amita Bachan",   
    "Pubg",   
    "Free Fire",   
    "Minecraft",   
    "Gameing",   
    "Gameing",   
    "Gameing",   
    "Gameing",   
  ]
  return (
  <>
  <div className="conatienr_home_page">
    <LeftSlifBar/>
    <div className="conatienr_home_page_2">
      <div className="navlist_home">
      {NavList.map((item, index) => (
            <p className="Btn_home" key={index}>
              {item}
            </p>
          ))}
      </div>
      <ShowVideoGrid vids={videos}/>
    </div>
  </div>
  </>
  )
}

export default Home
