import React, { useEffect, useState } from 'react';
import Youtube from '../../assets/Youtube.png';
import Hambler from '../../assets/Hamler.svg';
import Auth from '../../Pages/Auth/auth';
import './Navbar.css';
import Serach from '../Search/Serach';
import { GoogleLogin } from 'react-google-login';
import { RiVideoAddLine } from 'react-icons/ri';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { login } from '../../actions/auth';
import { useDispatch, useSelector } from 'react-redux'; 
import { gapi } from 'gapi-script';

const Navbar = ({ toggleDraw, setEditChannelBtn }) => {
  const [Authbtn, setAuthbtn] = useState(false);
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

    // Check for user in local storage and update state if found
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

  return (
    <>
      <div className='container_Navbar'>
        <div className='logo_navbar' onClick={() => toggleDraw()}>
          <img src={Hambler} alt="" height={24} />
        </div>
        <Link to={'/'} className='logo_img'>
          <img src={Youtube} alt="Youtube" className='logo_img' />
        </Link>
        <Serach />
        <div className='Navbar_last'>
          <RiVideoAddLine size={30} className='Create_Video' />
          <IoMdNotificationsOutline size={30} className='Notification' />
         
          {CurrentUser && CurrentUser.result ? (
            <>
              <div className="Current_user_logo" onClick={() => setAuthbtn(true)}>
                <p className='Logo_app'>
                  {CurrentUser.result.name
                    ? CurrentUser.result.name.charAt(0).toUpperCase()
                    : CurrentUser.result.email.charAt(0).toUpperCase()}
                </p>
              </div>
              <div>
                <p className='points'>
                  Points: {CurrentUser.result.points}
                </p>
              </div>  
            </>
          ) : (
            <>
              <GoogleLogin
                clientId={"777304984252-52gg0c3deutvo106o348aa5qn2sqv6ma.apps.googleusercontent.com"}
                onSuccess={handleLoginSuccess}
                onError={handleLoginFailure}
                render={(renderProps) => (
                  <button className='btn btn-light' onClick={renderProps.onClick}>Sign In</button>
                )}
              />
            </>
          )}
        </div>
      </div>
      {Authbtn && 
        <Auth User={CurrentUser} setAuthbtn={setAuthbtn} setEditChannelBtn={setEditChannelBtn} />
      }
    </>
  );
}

export default Navbar;
