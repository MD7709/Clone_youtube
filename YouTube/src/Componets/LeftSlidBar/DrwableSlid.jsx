import React from 'react'
import './LeftSlifBar.css'
import { AiFillLike, AiFillPlaySquare, AiOutlineHome} from 'react-icons/ai'
import { MdOutlineSubscriptions, MdOutlineVideoLibrary, MdOutlineWatchLater } from 'react-icons/md'
import Short from '/IMG/Short.svg'
import History from '/IMG/History.svg'
import YourChannel from '/IMG/YourChannel.svg'
import PlayList from '/IMG/PalyList.svg'
import { NavLink } from 'react-router-dom'


const DrwableSlid = ({toggleDraw,ToggleDrawSlid}) => {
  return (
   <>
   <div className='Container_Draw' style={ToggleDrawSlid}>
        <div className='Container_Draw_2'>
            <div className="DrawLeft_Slid">
                <NavLink to={'/'} className="Icon_Slid_div text-decoration-none text-black">
                    <p>
                        <AiOutlineHome size={22} className='Icon_slid' style={{margin: "auto 0.7rem"}}/>
                        <div className='Draw_text_icon'>
                            Home
                        </div>
                    </p>
                </NavLink>

                <NavLink to={'/Shorts'} className="Icon_Slid_div text-decoration-none text-black">
                    <p>
                        <img src={Short} size={22} className='Icon_slid' style={{margin: "auto 0.7rem"}}/>
                        <div className='Draw_text_icon'>
                            Short
                        </div>
                    </p>
                </NavLink>

                <NavLink to={'/Subscription'} className="Icon_Slid_div text-decoration-none text-black">
                    <p>
                        <MdOutlineSubscriptions size={22} className='Icon_slid' style={{margin: "auto 0.7rem"}}/>
                        <div className='Draw_text_icon'>
                        Subscription
                        </div>
                    </p>
                </NavLink>
            </div>

            <div className='Library_draw_Left'>
                <div className="Icon_Slid_div text-decoration-none text-black">
                    <p>
                        <img src={YourChannel} size={22} className='Icon_slid' style={{margin: "auto 0.7rem"}}/>
                        <div className='Draw_text_icon'>
                        Your Channel
                        </div>
                    </p>
                </div>

                <div className="Icon_Slid_div text-decoration-none text-black">
                    <p>
                        <img src={History} size={22} className='Icon_slid' style={{margin: "auto 0.7rem"}}/>
                        <div className='Draw_text_icon'>
                        History
                        </div>
                    </p>
                </div>

                <div className="Icon_Slid_div text-decoration-none text-black">
                    <p>
                        <img src={PlayList} size={22} className='Icon_slid' style={{margin: "auto 0.7rem"}}/>
                        <div className='Draw_text_icon'>
                        PlayList
                        </div>
                    </p>
                </div>

                <div className="Icon_Slid_div text-decoration-none text-black">
                    <p>
                        <AiFillPlaySquare size={22} className='Icon_slid' style={{margin: "auto 0.7rem"}}/>
                        <div className='Draw_text_icon'>
                        Your Video
                        </div>
                    </p>
                </div>

                <div className="Icon_Slid_div text-decoration-none text-black">
                    <p>
                        <MdOutlineWatchLater size={22} className='Icon_slid' style={{margin: "auto 0.7rem"}}/>
                        <div className='Draw_text_icon'>
                        Watch Later
                        </div>
                    </p>
                </div>

                <div className="Icon_Slid_div text-decoration-none text-black">
                    <p>
                        <AiFillLike size={22} className='Icon_slid' style={{margin: "auto 0.7rem"}}/>
                        <div className='Draw_text_icon'>
                        Liked Video
                        </div>
                    </p>
                </div>
            </div>

            <div className='Subscription_Draw text-decoration-none'>
                <h5 className='m-lg-3'>Subscription</h5>

                <div className="Icon_Slid_div1">
                    <p>
                        <div className='Channel_Draw' style={{margin: "auto 0.7rem"}}>C</div>
                        <div className='Draw_text_icon1'>
                        Liked Video
                        </div>
                    </p>
                </div>
                <div className="Icon_Slid_div1 text-decoration-none">
                    <p>
                        <div className='Channel_Draw' style={{margin: "auto 0.7rem"}}>C</div>
                        <div className='Draw_text_icon1'>
                        Liked Video
                        </div>
                    </p>
                </div>
                <div className="Icon_Slid_div1 text-decoration-none">
                    <p>
                        <div className='Channel_Draw' style={{margin: "auto 0.7rem"}}>C</div>
                        <div className='Draw_text_icon1'>
                        Liked Video
                        </div>
                    </p>
                </div>
                <div className="Icon_Slid_div1 text-decoration-none">
                    <p>
                        <div className='Channel_Draw' style={{margin: "auto 0.7rem"}}>C</div>
                        <div className='Draw_text_icon1'>
                        Liked Video
                        </div>
                    </p>
                </div>
            </div>
        </div>
        <div className="container_Dreaw_3" onClick={()=>toggleDraw()}></div>
   </div>
    
   </>
  )
}

export default DrwableSlid
